import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import PostReactions from "@/components/blog/PostReactions";
import { getAllPosts, getPostBySlug, getExcerptFromHtml } from "@/lib/blog";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

function fmtDate(date: string) {
  const d = new Date(date);
  return Number.isNaN(d.getTime())
    ? "Unknown date"
    : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function totalReactions(reactions: Record<string, number>) {
  return Object.values(reactions || {}).reduce((a, b) => a + (Number(b) || 0), 0);
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found | OmmSulaim Magazine" };
  return {
    title: `${post.title} | OmmSulaim Magazine`,
    description: getExcerptFromHtml(post.content, 160),
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = (await getAllPosts())
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-5xl bg-white px-6 py-10 text-black">
        <Link
          href="/blog"
          className="text-sm font-medium text-sky-700 hover:text-amber-700"
        >
          ← Back to Blog
        </Link>

        <header className="mt-5 rounded-2xl border border-slate-200 bg-white p-6">
          <p className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-black">
            {post.category}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-700">
            <span>{fmtDate(post.date)}</span>
            <span>•</span>
            <span>{totalReactions(post.reactions)} reactions</span>
            <span>•</span>
            <span>{post.comments.length} comments</span>
          </div>
        </header>

        {post.image && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src={post.image}
              alt={post.title}
              width={1500}
              height={900}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        )}

        <article
          className="
            mt-8 bg-white text-[1.04rem] leading-8 text-black
            [&_h1]:text-black
            [&_h2]:text-black
            [&_h3]:text-black
            [&_h4]:text-black
            [&_p]:text-black
            [&_li]:text-black
            [&_a]:text-sky-700 [&_a]:underline
            [&_img]:my-8 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-xl [&_img]:border [&_img]:border-slate-200
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <PostReactions
          slug={post.slug}
          initialReactions={post.reactions}
          initialCommentsCount={post.comments.length}
          initialComments={post.comments}
        />

        {related.length > 0 && (
          <section className="mt-12 border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-bold">More in {post.category}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <article key={r.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-sky-700">{fmtDate(r.date)}</p>
                  <h3 className="mt-1 text-base font-semibold">
                    <Link
                      href={`/blog/${r.slug}`}
                      className="text-sky-700 hover:text-amber-700"
                    >
                      {r.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {getExcerptFromHtml(r.content, 90)}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}