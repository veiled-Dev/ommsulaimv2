import { promises as fs } from "fs";
import path from "path";

export type ShopCategory = "digital-products" | "clothing" | "accessories";

export interface ShopProduct {
  id: string;
  category: ShopCategory;
  title: string;
  description: string;
  price: string;
  buyLink: string;
}

const SHOP_FILE = path.join(process.cwd(), "shop.json");
const SHOP_CATEGORIES: ShopCategory[] = ["digital-products", "clothing", "accessories"];

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asCategory(value: unknown): ShopCategory {
  const input = asString(value);
  return SHOP_CATEGORIES.includes(input as ShopCategory) ? (input as ShopCategory) : "digital-products";
}

async function readRawProducts(): Promise<unknown[]> {
  try {
    const raw = await fs.readFile(SHOP_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeProduct(value: unknown): ShopProduct | null {
  if (!value || typeof value !== "object") return null;

  const row = value as Record<string, unknown>;
  const title = asString(row.title).trim();
  if (!title) return null;

  return {
    id: asString(row.id, crypto.randomUUID()),
    category: asCategory(row.category),
    title,
    description: asString(row.description),
    price: asString(row.price),
    buyLink: asString(row.buyLink, "/contact") || "/contact",
  };
}

async function writeProducts(products: ShopProduct[]) {
  await fs.writeFile(SHOP_FILE, `${JSON.stringify(products, null, 2)}\n`, "utf8");
}

export async function getAllShopProducts(): Promise<ShopProduct[]> {
  const raw = await readRawProducts();
  return raw.map(normalizeProduct).filter((x): x is ShopProduct => !!x);
}

export async function getShopProductsByCategory(category: ShopCategory): Promise<ShopProduct[]> {
  const products = await getAllShopProducts();
  return products.filter((product) => product.category === category);
}

export async function createShopProduct(
  input: Omit<ShopProduct, "id">,
): Promise<ShopProduct> {
  const products = await getAllShopProducts();
  const created: ShopProduct = {
    id: crypto.randomUUID(),
    category: input.category,
    title: input.title.trim(),
    description: input.description.trim(),
    price: input.price.trim(),
    buyLink: input.buyLink.trim() || "/contact",
  };

  products.unshift(created);
  await writeProducts(products);
  return created;
}

export async function updateShopProduct(
  id: string,
  updates: Partial<Omit<ShopProduct, "id">>,
): Promise<ShopProduct | null> {
  const products = await getAllShopProducts();
  const index = products.findIndex((product) => product.id === id);
  if (index < 0) return null;

  const current = products[index];
  const next: ShopProduct = {
    ...current,
    category: updates.category ?? current.category,
    title: updates.title?.trim() ?? current.title,
    description: updates.description?.trim() ?? current.description,
    price: updates.price?.trim() ?? current.price,
    buyLink: updates.buyLink?.trim() || current.buyLink || "/contact",
  };

  products[index] = next;
  await writeProducts(products);
  return next;
}

export async function deleteShopProduct(id: string): Promise<boolean> {
  const products = await getAllShopProducts();
  const next = products.filter((product) => product.id !== id);
  if (next.length === products.length) return false;

  await writeProducts(next);
  return true;
}
