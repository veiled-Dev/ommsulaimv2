import crypto from "crypto";
import { getShopProductById, type ShopCurrency, type ShopProduct } from "@/lib/shop";

const FLUTTERWAVE_API = "https://api.flutterwave.com/v3";

function secretKey() {
  const key = process.env.FLW_SECRET_KEY;
  if (!key) throw new Error("FLW_SECRET_KEY is not configured.");
  return key;
}

export function parseProductPrice(product: ShopProduct): number {
  const amount = Number(product.price.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(amount) || amount <= 0) throw new Error("This product has an invalid price.");
  return amount;
}

export function formatShopPrice(product: ShopProduct) {
  return product.currency === "USD" ? `$${product.price}` : `₦${product.price}`;
}

export function createShopTxRef(productId: string) {
  return `ommsulaim-${productId}-${crypto.randomUUID()}`;
}

export function productIdFromTxRef(txRef: string) {
  const match = txRef.match(/^ommsulaim-(.+)-[0-9a-f-]{36}$/i);
  return match?.[1] ?? null;
}

export function createDownloadToken(productId: string, expiresAt: number) {
  const secret = process.env.SHOP_DOWNLOAD_SECRET || process.env.FLW_SECRET_KEY;
  if (!secret) throw new Error("SHOP_DOWNLOAD_SECRET is not configured.");
  const payload = `${productId}.${expiresAt}`;
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

export function verifyDownloadToken(token: string) {
  const secret = process.env.SHOP_DOWNLOAD_SECRET || process.env.FLW_SECRET_KEY;
  if (!secret) return null;
  const [productId, expiresText, signature] = token.split(".");
  const expiresAt = Number(expiresText);
  if (!productId || !signature || !Number.isFinite(expiresAt) || expiresAt < Date.now()) return null;
  const payload = `${productId}.${expiresAt}`;
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  return { productId, expiresAt };
}

export async function createFlutterwaveCheckout(product: ShopProduct, origin: string, email: string) {
  const txRef = createShopTxRef(product.id);
  const response = await fetch(`${FLUTTERWAVE_API}/payments`, {
    method: "POST",
    headers: { Authorization: `Bearer ${secretKey()}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      tx_ref: txRef,
      amount: parseProductPrice(product),
      currency: product.currency,
      redirect_url: `${origin}/api/shop/flutterwave/callback`,
      customer: { email },
      customizations: { title: "OmmSulaim Digital Shop", description: product.title },
      meta: { product_id: product.id },
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.status !== "success" || !data.data?.link) throw new Error(data.message || "Unable to start payment.");
  return { txRef, paymentLink: String(data.data.link) };
}

export async function verifyFlutterwaveTransaction(transactionId: string) {
  const response = await fetch(`${FLUTTERWAVE_API}/transactions/${encodeURIComponent(transactionId)}/verify`, {
    headers: { Authorization: `Bearer ${secretKey()}` },
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.status !== "success" || !data.data) throw new Error(data.message || "Unable to verify payment.");

  const transaction = data.data;
  const productId = productIdFromTxRef(String(transaction.tx_ref || ""));
  if (!productId) throw new Error("Invalid transaction reference.");

  const product = await getShopProductById(productId);
  if (!product || product.access !== "paid") throw new Error("Product not found.");

  const expectedAmount = parseProductPrice(product);
  const expectedCurrency: ShopCurrency = product.currency;
  if (transaction.status !== "successful") throw new Error("Payment was not successful.");
  if (String(transaction.currency).toUpperCase() !== expectedCurrency) throw new Error("Payment currency mismatch.");
  if (Number(transaction.amount) < expectedAmount) throw new Error("Payment amount mismatch.");

  return { transaction, product };
}
