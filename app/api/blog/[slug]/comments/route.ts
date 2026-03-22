import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function POST(req: Request, { params }: Params) {
  const { slug } = await params;
  const body = await req.json().catch(() => ({}));

  const name = String(body.name ?? "").trim();
  const text = String(body.text ?? "").trim();

  if (!text) {
    return NextResponse.json({ error: "Comment text is required." }, { status: 400 });
  }

  const blogLib = await import("@/lib/blog");
  if (typeof blogLib.addCommentToPost !== "function") {
    return NextResponse.json({ error: "Comment service unavailable. Restart dev server." }, { status: 500 });
  }

  const result = await blogLib.addCommentToPost(slug, { name, text });
  if (!result) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  const latestComment = result.comments[result.comments.length - 1] ?? null;

  return NextResponse.json({
    commentsCount: result.comments.length,
    reactions: result.reactions,
    comment: latestComment,
  });
}
