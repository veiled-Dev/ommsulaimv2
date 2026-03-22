import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createBlogPost, getAllPosts } from "@/lib/blog";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";

async function ensureAdmin() {
  const cookieStore = await cookies();
  return isAdminAuthenticated(cookieStore);
}

export async function GET() {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await getAllPosts();
  return NextResponse.json({ posts });
}

export async function POST(req: Request) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const title = String(body.title ?? "").trim();
  const content = String(body.content ?? "").trim();
  const category = String(body.category ?? "").trim() || "General";
  const image = String(body.image ?? "").trim();

  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
  }

  const post = await createBlogPost({
    title,
    content,
    category,
    image: image || null,
  });

  return NextResponse.json({ post }, { status: 201 });
}
