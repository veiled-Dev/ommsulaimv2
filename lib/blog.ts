import { promises as fs } from "fs";
import path from "path";

export interface BlogComment {
  name: string;
  text: string;
  date: string;
  replies: BlogComment[];
  reactions: Record<string, number>;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string;
  date: string;
  image: string | null;
  comments: BlogComment[];
  reactions: Record<string, number>;
}

const BLOG_FILE_CANDIDATES = ["blog.json", path.join("data", "blog.json")];

export interface BlogPostInput {
  title: string;
  content: string;
  category: string;
  image?: string | null;
}

export type BlogReactionType = "heart" | "share";

export interface BlogCommentInput {
  name?: string;
  text: string;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueSlug(baseSlug: string, existing: Set<string>): string {
  if (!existing.has(baseSlug)) return baseSlug;
  let index = 2;
  while (existing.has(`${baseSlug}-${index}`)) {
    index += 1;
  }
  return `${baseSlug}-${index}`;
}

async function getWritableBlogFilePath(): Promise<string> {
  for (const relPath of BLOG_FILE_CANDIDATES) {
    const abs = path.join(process.cwd(), relPath);
    if (await fileExists(abs)) return abs;
  }

  return path.join(process.cwd(), BLOG_FILE_CANDIDATES[0]);
}

async function writeRawPosts(posts: BlogPost[]) {
  const filePath = await getWritableBlogFilePath();
  try {
    const jsonContent = JSON.stringify(posts, null, 2);
    await fs.writeFile(filePath, `${jsonContent}\n`, "utf8");
  } catch (error) {
    console.error(`Failed to write blog posts to ${filePath}:`, error);
    throw new Error(`Failed to save blog data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolvePostImage(image: string | null): Promise<string | null> {
  if (!image) return null;

  const trimmed = image.trim();
  if (!trimmed) return null;

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (!trimmed.startsWith("/")) {
    return null;
  }

  const localPath = path.join(process.cwd(), "public", trimmed.replace(/^\/+/, ""));
  const exists = await fileExists(localPath);
  return exists ? trimmed : null;
}

async function resolveImageSource(src: string): Promise<string | null> {
  const trimmed = src.trim();
  if (!trimmed) return null;

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (!trimmed.startsWith("/")) {
    return null;
  }

  const localPath = path.join(process.cwd(), "public", trimmed.replace(/^\/+/, ""));
  const exists = await fileExists(localPath);
  return exists ? trimmed : null;
}

async function normalizeInlineImages(html: string): Promise<string> {
  const withMarkdownImages = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (_, alt: string, src: string) => `<img src="${src}" alt="${alt || "Blog image"}" />`,
  );

  const imageTags = Array.from(withMarkdownImages.matchAll(/<img\b[^>]*>/gi));
  if (imageTags.length === 0) return withMarkdownImages;

  let output = withMarkdownImages;

  for (const match of imageTags) {
    const originalTag = match[0];
    const srcMatch = originalTag.match(/\ssrc\s*=\s*["']([^"']+)["']/i);
    const src = srcMatch?.[1] ?? "";
    const resolved = await resolveImageSource(src);

    if (!resolved) {
      output = output.replace(originalTag, "");
      continue;
    }

    const altMatch = originalTag.match(/\salt\s*=\s*["']([^"']*)["']/i);
    const alt = altMatch?.[1] ?? "Blog image";

    const normalizedTag = `<img src="${resolved}" alt="${alt}" loading="lazy" decoding="async" class="my-8 w-full rounded-xl border border-slate-200 object-cover" />`;
    output = output.replace(originalTag, normalizedTag);
  }

  return output;
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asReactions(value: unknown): Record<string, number> {
  if (!value || typeof value !== "object") return {};
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    const n = Number(v);
    out[k] = Number.isFinite(n) ? n : 0;
  }
  return out;
}

function normalizeComment(value: unknown): BlogComment | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const repliesRaw = Array.isArray(row.replies) ? row.replies : [];

  return {
    name: asString(row.name, "Anonymous"),
    text: asString(row.text),
    date: asString(row.date, new Date(0).toISOString()),
    replies: repliesRaw.map(normalizeComment).filter((x): x is BlogComment => !!x),
    reactions: asReactions(row.reactions),
  };
}

async function readRawPosts(): Promise<unknown[]> {
  for (const relPath of BLOG_FILE_CANDIDATES) {
    const abs = path.join(process.cwd(), relPath);
    try {
      const raw = await fs.readFile(abs, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // try next file
    }
  }
  return [];
}

function normalizePost(value: unknown): BlogPost | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const commentsRaw = Array.isArray(row.comments) ? row.comments : [];

  const slug = asString(row.slug).trim();
  if (!slug) return null;
  const id = asString(row.id, "").trim() || slug;

  return {
    id,
    slug,
    title: asString(row.title, "Untitled Post"),
    content: asString(row.content, ""),
    category: asString(row.category, "General"),
    date: asString(row.date, new Date().toISOString()),
    image: typeof row.image === "string" && row.image.length ? row.image : null,
    comments: commentsRaw.map(normalizeComment).filter((x): x is BlogComment => !!x),
    reactions: asReactions(row.reactions),
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const raw = await readRawPosts();
  const normalized = raw
    .map(normalizePost)
    .filter((x): x is BlogPost => !!x)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const withResolvedImages = await Promise.all(
    normalized.map(async (post) => {
      const [image, content] = await Promise.all([
        resolvePostImage(post.image),
        normalizeInlineImages(post.content),
      ]);

      return {
        ...post,
        image,
        content,
      };
    }),
  );

  return withResolvedImages;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function createBlogPost(input: BlogPostInput): Promise<BlogPost> {
  const posts = await getAllPosts();
  const existingSlugs = new Set(posts.map((post) => post.slug));
  const base = slugify(input.title) || `post-${Date.now()}`;

  const created: BlogPost = {
    id: crypto.randomUUID(),
    slug: uniqueSlug(base, existingSlugs),
    title: input.title.trim(),
    content: input.content,
    category: input.category.trim() || "General",
    date: new Date().toISOString(),
    image: input.image?.trim() || null,
    comments: [],
    reactions: {
      comment: 0,
      heart: 0,
      share: 0,
    },
  };

  posts.unshift(created);
  await writeRawPosts(posts);
  return created;
}

export async function updateBlogPost(
  id: string,
  updates: Partial<BlogPostInput>,
): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const index = posts.findIndex((post) => post.id === id);
  if (index < 0) return null;

  const current = posts[index];
  const title = updates.title?.trim() || current.title;

  let slug = current.slug;
  if (updates.title && updates.title.trim() && updates.title.trim() !== current.title) {
    const existingSlugs = new Set(posts.filter((post) => post.id !== id).map((post) => post.slug));
    slug = uniqueSlug(slugify(title) || `post-${Date.now()}`, existingSlugs);
  }

  const next: BlogPost = {
    ...current,
    slug,
    title,
    content: updates.content ?? current.content,
    category: updates.category?.trim() || current.category,
    image: updates.image === undefined ? current.image : updates.image?.trim() || null,
  };

  posts[index] = next;
  await writeRawPosts(posts);
  return next;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const posts = await getAllPosts();
  const next = posts.filter((post) => post.id !== id);
  if (next.length === posts.length) return false;

  await writeRawPosts(next);
  return true;
}

export async function incrementPostReaction(
  slug: string,
  reaction: BlogReactionType,
): Promise<Record<string, number> | null> {
  const posts = await getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index < 0) return null;

  const current = posts[index];
  const nextReactions = {
    ...current.reactions,
    [reaction]: (Number(current.reactions?.[reaction]) || 0) + 1,
  };

  posts[index] = {
    ...current,
    reactions: nextReactions,
  };

  await writeRawPosts(posts);
  return nextReactions;
}

export async function addCommentToPost(
  slug: string,
  input: BlogCommentInput,
): Promise<{ comments: BlogComment[]; reactions: Record<string, number> } | null> {
  const posts = await getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index < 0) return null;

  const current = posts[index];
  const commentText = input.text.trim();
  if (!commentText) return null;

  const nextComment: BlogComment = {
    name: input.name?.trim() || "Anonymous",
    text: commentText,
    date: new Date().toISOString(),
    replies: [],
    reactions: {},
  };

  const nextComments = [...current.comments, nextComment];
  const nextReactions = {
    ...current.reactions,
    comment: nextComments.length,
  };

  posts[index] = {
    ...current,
    comments: nextComments,
    reactions: nextReactions,
  };

  await writeRawPosts(posts);

  return {
    comments: nextComments,
    reactions: nextReactions,
  };
}

export function getExcerptFromHtml(html: string, max = 180): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max).trim()}...` : text;
}