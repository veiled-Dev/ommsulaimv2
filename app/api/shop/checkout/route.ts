import { NextResponse } from "next/server";
import { getShopProductById } from "@/lib/shop";
import { createFlutterwaveCheckout } from "@/lib/shop-payments";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const product = await getShopProductById(String(body.productId || ""));
    const email = String(body.email || "").trim();

    if (!product || product.access !== "paid") return NextResponse.json({ error: "Product not found." }, { status: 404 });
    if (!email || !email.includes("@")) return NextResponse.json({ error: "A valid email is required." }, { status: 400 });

    const result = await createFlutterwaveCheckout(product, new URL(req.url).origin, email);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to start checkout." }, { status: 500 });
  }
}
