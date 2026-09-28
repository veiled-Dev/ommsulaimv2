import crypto from "crypto";
import { NextResponse } from "next/server";
import { createDownloadToken, verifyFlutterwaveTransaction } from "@/lib/shop-payments";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("verif-hash");
  const secret = process.env.FLW_WEBHOOK_SECRET || process.env.FLW_SECRET_KEY;

  if (!secret || !signature || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(secret))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = JSON.parse(rawBody);
    const transactionId = String(payload?.data?.id || payload?.data?.transaction_id || "");
    if (transactionId) {
      const { product } = await verifyFlutterwaveTransaction(transactionId);
      createDownloadToken(product.id, Date.now() + 24 * 60 * 60 * 1000);
    }
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ received: true });
  }
}
