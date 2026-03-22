import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { deleteBlogPost, updateBlogPost } from "@/lib/blog";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

async function ensureAdmin() {
  const cookieStore = await cookies();
  return isAdminAuthenticated(cookieStore);
}

export async function PATCH(req: Request, { params }: Params) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const post = await updateBlogPost(id, {
    title: typeof body.title === "string" ? body.title : undefined,
    content: typeof body.content === "string" ? body.content : undefined,
    category: typeof body.category === "string" ? body.category : undefined,
    image: typeof body.image === "string" ? body.image : undefined,
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const ok = await deleteBlogPost(id);

  if (!ok) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
