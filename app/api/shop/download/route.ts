import { NextResponse } from "next/server";
import { getShopProductById } from "@/lib/shop";
import { verifyDownloadToken } from "@/lib/shop-payments";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  const verified = token ? verifyDownloadToken(token) : null;
  if (!verified) return NextResponse.json({ error: "Download link expired or invalid." }, { status: 401 });

  const product = await getShopProductById(verified.productId);
  if (!product?.downloadLink) return NextResponse.json({ error: "Download is not configured for this product." }, { status: 404 });

  return NextResponse.redirect(new URL(product.downloadLink, new URL(req.url).origin));
}
