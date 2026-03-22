import { NextResponse } from "next/server";
import { incrementPostReaction, type BlogReactionType } from "@/lib/blog";

export const runtime = "nodejs";

type Params = {
  params: Promise<{ slug: string }>;
};

const VALID_REACTIONS: BlogReactionType[] = ["heart", "share"];

export async function POST(req: Request, { params }: Params) {
  const { slug } = await params;
  const body = await req.json().catch(() => ({}));
  const reaction = String(body.reaction ?? "") as BlogReactionType;

  if (!VALID_REACTIONS.includes(reaction)) {
    return NextResponse.json({ error: "Invalid reaction type." }, { status: 400 });
  }

  const reactions = await incrementPostReaction(slug, reaction);
  if (!reactions) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  return NextResponse.json({ reactions });
}
