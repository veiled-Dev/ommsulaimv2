import { NextResponse } from "next/server";
import { getShopProductById } from "@/lib/shop";

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id") || "";
  const product = await getShopProductById(id);
  if (!product || product.access !== "paid") return NextResponse.json({ error: "Product not found." }, { status: 404 });

  return NextResponse.json({
    product: {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      currency: product.currency,
    },
  });
}
