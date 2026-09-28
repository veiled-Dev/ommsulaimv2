import { NextResponse } from "next/server";
import { createDownloadToken, verifyFlutterwaveTransaction } from "@/lib/shop-payments";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const transactionId = url.searchParams.get("transaction_id");
  const status = url.searchParams.get("status");

  if (status !== "successful" || !transactionId) {
    return NextResponse.redirect(new URL("/shop/payment-result?status=failed", url.origin));
  }

  try {
    const { product } = await verifyFlutterwaveTransaction(transactionId);
    const token = createDownloadToken(product.id, Date.now() + 24 * 60 * 60 * 1000);
    return NextResponse.redirect(new URL(`/shop/payment-result?status=success&download=${encodeURIComponent(token)}&product=${encodeURIComponent(product.id)}`, url.origin));
  } catch {
    return NextResponse.redirect(new URL("/shop/payment-result?status=failed", url.origin));
  }
}
