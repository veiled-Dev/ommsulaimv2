import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createShopProduct, getAllShopProducts, type ShopCategory } from "@/lib/shop";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";

const validCategories: ShopCategory[] = ["digital-products", "clothing", "accessories"];

async function ensureAdmin() {
  const cookieStore = await cookies();
  return isAdminAuthenticated(cookieStore);
}

function parseCategory(value: unknown): ShopCategory | null {
  const category = String(value ?? "");
  return validCategories.includes(category as ShopCategory) ? (category as ShopCategory) : null;
}

export async function GET() {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await getAllShopProducts();
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const category = parseCategory(body.category);
  const title = String(body.title ?? "").trim();
  const description = String(body.description ?? "").trim();
  const price = String(body.price ?? "").trim();
  const buyLink = String(body.buyLink ?? "").trim() || "/contact";

  if (!category || !title || !description || !price) {
    return NextResponse.json({ error: "Category, title, description, and price are required." }, { status: 400 });
  }

  const product = await createShopProduct({
    category,
    title,
    description,
    price,
    buyLink,
  });

  return NextResponse.json({ product }, { status: 201 });
}
