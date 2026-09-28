import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createShopProduct, getAllShopProducts, type ShopCategory, type ShopCurrency } from "@/lib/shop";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";
const validCategories: ShopCategory[] = ["digital-products"];

async function ensureAdmin() {
  const cookieStore = await cookies();
  return isAdminAuthenticated(cookieStore);
}

function parseCategory(value: unknown): ShopCategory | null {
  const category = String(value ?? "");
  return validCategories.includes(category as ShopCategory) ? (category as ShopCategory) : null;
}

function parseCurrency(value: unknown): ShopCurrency {
  return value === "USD" ? "USD" : "NGN";
}

export async function GET() {
  if (!(await ensureAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ products: await getAllShopProducts() });
}

export async function POST(req: Request) {
  if (!(await ensureAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const category = parseCategory(body.category);
  const title = String(body.title ?? "").trim();
  const description = String(body.description ?? "").trim();
  const access = body.access === "free" ? "free" : "paid";
  const price = String(body.price ?? "").trim();
  const currency = parseCurrency(body.currency);
  const buyLink = String(body.buyLink ?? "").trim() || "/contact";
  const downloadLink = String(body.downloadLink ?? "").trim();

  if (!category || !title || !description || (access === "paid" && (!price || !downloadLink))) {
    return NextResponse.json({ error: access === "paid" ? "Category, title, description, price, and download link are required for paid products." : "Category, title, and description are required for free resources." }, { status: 400 });
  }

  const product = await createShopProduct({ category, access, title, description, price, currency, buyLink, downloadLink });
  return NextResponse.json({ product }, { status: 201 });
}
