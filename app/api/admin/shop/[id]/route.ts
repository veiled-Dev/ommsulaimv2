import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { deleteShopProduct, updateShopProduct, type ShopCategory } from "@/lib/shop";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

const validCategories: ShopCategory[] = ["digital-products", "clothing", "accessories"];

async function ensureAdmin() {
  const cookieStore = await cookies();
  return isAdminAuthenticated(cookieStore);
}

function parseCategory(value: unknown): ShopCategory | undefined {
  const category = String(value ?? "");
  return validCategories.includes(category as ShopCategory) ? (category as ShopCategory) : undefined;
}

export async function PATCH(req: Request, { params }: Params) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const product = await updateShopProduct(id, {
    category: parseCategory(body.category),
    title: typeof body.title === "string" ? body.title : undefined,
    description: typeof body.description === "string" ? body.description : undefined,
    price: typeof body.price === "string" ? body.price : undefined,
    buyLink: typeof body.buyLink === "string" ? body.buyLink : undefined,
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const ok = await deleteShopProduct(id);

  if (!ok) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
