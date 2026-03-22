import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getAllPosts, getExcerptFromHtml, type BlogPost } from "@/lib/blog";

type PageProps = {
  searchParams: Promise<{
    category?: string | string[];
    q?: string | string[];
    subscribed?: string | string[];
    error?: string | string[];
  }>;
};

function pick(v?: string | string[]) {
  return Array.isArray(v) ? (v[0] ?? "") : (v ?? "");
}

function fmtDate(date: string) {
  const d = new Date(date);
  return Number.isNaN(d.getTime())
    ? "Unknown date"
    : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function readTime(html: string) {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = pick(params.category);
  const q = pick(params.q).trim();
  const subscribed = pick(params.subscribed);
  const error = pick(params.error);

  const posts = await getAllPosts();
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category))).sort()];
  const selectedCategory = category || "All";

  const filtered = posts.filter((p) => {
    const byCategory = selectedCategory === "All" || p.category === selectedCategory;
    const haystack = `${p.title} ${p.category} ${getExcerptFromHtml(p.content, 260)}`.toLowerCase();
    const byQuery = !q || haystack.includes(q.toLowerCase());
    return byCategory && byQuery;
  });

  const featured = filtered[0];
  const latestPosts = filtered.filter((p) => p.slug !== featured?.slug);
  const sidebarPosts = filtered.slice(0, 5);

  const redirectParams = new URLSearchParams();
  if (selectedCategory !== "All") redirectParams.set("category", selectedCategory);
  if (q) redirectParams.set("q", q);
  const redirectTo = `/blog${redirectParams.toString() ? `?${redirectParams}` : ""}`;

  const categoryHref = (c: string) => {
    const sp = new URLSearchParams();
    if (c !== "All") sp.set("category", c);
    if (q) sp.set("q", q);
    return `/blog${sp.toString() ? `?${sp}` : ""}`;
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12 text-slate-900">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">Blog</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            OmmSulaim Journal
          </h1>
          <p className="mt-4 max-w-2xl text-slate-700">
            Practical reads for Muslim family life, learning, and daily growth.
          </p>

          <form action="/blog" method="get" className="mt-6 flex flex-col gap-3 sm:flex-row">
            {selectedCategory !== "All" && <input type="hidden" name="category" value={selectedCategory} />}
            <input
              name="q"
              defaultValue={q}
              placeholder="Search posts..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 outline-none ring-sky-500 focus:ring"
            />
            <button
              type="submit"
              className="rounded-xl bg-sky-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-800"
            >
              Search
            </button>
          </form>
        </section>

        <section className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = c === selectedCategory;
            return (
              <Link
                key={c}
                href={categoryHref(c)}
                className={`rounded-full border px-4 py-2 text-sm ${
                  active
                    ? "border-sky-700 bg-sky-700 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-amber-300 hover:text-sky-700"
                }`}
              >
                {c}
              </Link>
            );
          })}
        </section>

        {subscribed === "1" && (
          <p className="mt-4 rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm text-green-700">
            Newsletter subscription successful.
          </p>
        )}
        {error === "invalid_email" && (
          <p className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
            Enter a valid email address.
          </p>
        )}

        {!featured ? (
          <p className="mt-10 text-center text-slate-600">No posts found.</p>
        ) : (
          <section className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-8">
              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <Link href={`/blog/${featured.slug}`} className="block">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      width={1600}
                      height={900}
                      className="h-80 w-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex h-80 items-center justify-center bg-slate-100 text-slate-500">
                      No image
                    </div>
                  )}
                </Link>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                    {featured.category}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                    <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    {fmtDate(featured.date)} · {readTime(featured.content)} min read
                  </p>
                  <p className="mt-4 text-slate-700">{getExcerptFromHtml(featured.content, 220)}</p>
                </div>
              </article>

              {latestPosts.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900">Latest Posts</h2>
                  <div className="space-y-4">
                    {latestPosts.map((post) => (
                      <article key={post.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="grid gap-0 md:grid-cols-[220px,1fr]">
                          {post.image ? (
                            <Link href={`/blog/${post.slug}`} className="block h-full">
                              <Image
                                src={post.image}
                                alt={post.title}
                                width={900}
                                height={600}
                                className="h-full min-h-44 w-full object-cover"
                              />
                            </Link>
                          ) : (
                            <div className="h-44 w-full bg-slate-100 md:h-full" />
                          )}

                          <div className="p-5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                              {post.category}
                            </p>
                            <h3 className="mt-1 text-xl font-semibold text-slate-900">
                              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                            </h3>
                            <p className="mt-2 text-xs text-slate-500">
                              {fmtDate(post.date)} · {readTime(post.content)} min read
                            </p>
                            <p className="mt-3 text-sm text-slate-700">
                              {getExcerptFromHtml(post.content, 140)}
                            </p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="space-y-4 lg:sticky lg:top-24">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold">Categories</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {categories.map((c) => {
                      const active = c === selectedCategory;
                      return (
                        <Link
                          key={`side-${c}`}
                          href={categoryHref(c)}
                          className={`rounded-full border px-3 py-1 text-xs ${
                            active
                              ? "border-sky-700 bg-sky-700 text-white"
                              : "border-slate-300 bg-white text-slate-700 hover:border-amber-300 hover:text-sky-700"
                          }`}
                        >
                          {c}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold">Recent Posts</h3>
                  <div className="mt-4 space-y-4">
                    {sidebarPosts.map((post) => (
                      <article key={`sidebar-${post.id}`}>
                        <h4 className="text-sm font-semibold leading-snug text-slate-900">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h4>
                        <p className="mt-1 text-xs text-slate-500">{fmtDate(post.date)}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold">Newsletter</h3>
                  <p className="mt-2 text-sm text-slate-600">Weekly faith-centered insights.</p>
                  <form action="/api/newsletter" method="post" className="mt-4 space-y-3">
                    <input type="hidden" name="redirectTo" value={redirectTo} />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </aside>
          </section>
        )}
      </main>
    </>
  );
}