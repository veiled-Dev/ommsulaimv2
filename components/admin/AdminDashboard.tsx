"use client";

import { useMemo, useRef, useState } from "react";
import type { BlogPost } from "@/lib/blog";
import type { ShopCategory, ShopProduct } from "@/lib/shop";

type Props = {
  initialPosts: BlogPost[];
  initialProducts: ShopProduct[];
};

type BlogFormState = {
  id: string | null;
  title: string;
  category: string;
  image: string;
  content: string;
};

type ProductFormState = {
  id: string | null;
  category: ShopCategory;
  title: string;
  description: string;
  price: string;
  buyLink: string;
};

const emptyBlogForm: BlogFormState = {
  id: null,
  title: "",
  category: "General",
  image: "",
  content: "",
};

const emptyProductForm: ProductFormState = {
  id: null,
  category: "digital-products",
  title: "",
  description: "",
  price: "",
  buyLink: "/contact",
};

export default function AdminDashboard({ initialPosts, initialProducts }: Props) {
  const [posts, setPosts] = useState(initialPosts);
  const [products, setProducts] = useState(initialProducts);
  const [blogForm, setBlogForm] = useState<BlogFormState>(emptyBlogForm);
  const [productForm, setProductForm] = useState<ProductFormState>(emptyProductForm);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((post) => post.category))).sort()],
    [posts],
  );

  const productGroups = useMemo(() => {
    return {
      "digital-products": products.filter((product) => product.category === "digital-products"),
      clothing: products.filter((product) => product.category === "clothing"),
      accessories: products.filter((product) => product.category === "accessories"),
    };
  }, [products]);

  async function refreshData() {
    const [blogRes, shopRes] = await Promise.all([
      fetch("/api/admin/blog", { cache: "no-store" }),
      fetch("/api/admin/shop", { cache: "no-store" }),
    ]);

    if (!blogRes.ok || !shopRes.ok) {
      throw new Error("Failed to refresh admin data");
    }

    const [blogData, shopData] = await Promise.all([blogRes.json(), shopRes.json()]);
    setPosts(blogData.posts || []);
    setProducts(shopData.products || []);
  }

  async function handleSaveBlog(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      const payload = {
        title: blogForm.title,
        category: blogForm.category,
        image: blogForm.image,
        content: blogForm.content,
      };

      const response = await fetch(blogForm.id ? `/api/admin/blog/${blogForm.id}` : "/api/admin/blog", {
        method: blogForm.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const json = await response.json().catch(() => ({}));
        throw new Error(json.error || "Unable to save blog post");
      }

      await refreshData();
      setBlogForm(emptyBlogForm);
      setMessage(blogForm.id ? "Blog post updated." : "Blog post created.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Error saving blog post.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDeleteBlog(id: string) {
    if (!confirm("Delete this blog post?")) return;

    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Unable to delete post");
      await refreshData();
      if (blogForm.id === id) setBlogForm(emptyBlogForm);
      setMessage("Blog post deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Error deleting post.");
    } finally {
      setBusy(false);
    }
  }

  async function handleSaveProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      const payload = {
        category: productForm.category,
        title: productForm.title,
        description: productForm.description,
        price: productForm.price,
        buyLink: productForm.buyLink,
      };

      const response = await fetch(productForm.id ? `/api/admin/shop/${productForm.id}` : "/api/admin/shop", {
        method: productForm.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const json = await response.json().catch(() => ({}));
        throw new Error(json.error || "Unable to save product");
      }

      await refreshData();
      setProductForm(emptyProductForm);
      setMessage(productForm.id ? "Product updated." : "Product created.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Error saving product.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDeleteProduct(id: string) {
    if (!confirm("Delete this product?")) return;

    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/shop/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Unable to delete product");
      await refreshData();
      if (productForm.id === id) setProductForm(emptyProductForm);
      setMessage("Product deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Error deleting product.");
    } finally {
      setBusy(false);
    }
  }

  async function uploadImage(file: File): Promise<string> {
    const form = new FormData();
    form.set("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: form,
    });

    const json = await response.json().catch(() => ({}));
    if (!response.ok || !json.url) {
      throw new Error(json.error || "Image upload failed.");
    }

    return String(json.url);
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("");
    try {
      const imageUrl = await uploadImage(file);
      setBlogForm((prev) => ({ ...prev, image: imageUrl }));
      setMessage("Cover image uploaded.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Cover upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleInlineUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("");
    try {
      const imageUrl = await uploadImage(file);
      const snippet = `\n\n![Uploaded image](${imageUrl})\n\n`;
      setBlogForm((prev) => ({ ...prev, content: `${prev.content}${snippet}` }));
      setMessage("Inline image uploaded and inserted into content.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Inline image upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function insertAtSelection(before: string, after = "") {
    const el = contentRef.current;
    if (!el) {
      setBlogForm((prev) => ({ ...prev, content: `${prev.content}${before}${after}` }));
      return;
    }

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = blogForm.content.slice(start, end);
    const replacement = `${before}${selected}${after}`;
    const next = `${blogForm.content.slice(0, start)}${replacement}${blogForm.content.slice(end)}`;

    setBlogForm((prev) => ({ ...prev, content: next }));

    requestAnimationFrame(() => {
      el.focus();
      const cursor = start + replacement.length;
      el.setSelectionRange(cursor, cursor);
    });
  }

  function insertBlock(block: string) {
    const el = contentRef.current;
    if (!el) {
      setBlogForm((prev) => ({ ...prev, content: `${prev.content}\n${block}\n` }));
      return;
    }

    const start = el.selectionStart;
    const next = `${blogForm.content.slice(0, start)}\n${block}\n${blogForm.content.slice(start)}`;
    setBlogForm((prev) => ({ ...prev, content: next }));

    requestAnimationFrame(() => {
      el.focus();
      const cursor = start + block.length + 2;
      el.setSelectionRange(cursor, cursor);
    });
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
          >
            Log out
          </button>
        </form>
      </div>

      {message && (
        <p className="mt-4 rounded-lg border border-sky-200 bg-sky-50 px-4 py-2 text-sm text-sky-800">{message}</p>
      )}

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold">Create / Edit Blog Post</h2>
          <form className="mt-4 space-y-3" onSubmit={handleSaveBlog}>
            <input
              required
              value={blogForm.title}
              onChange={(e) => setBlogForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Post title"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
            <input
              required
              value={blogForm.category}
              onChange={(e) => setBlogForm((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="Category"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              list="blog-categories"
            />
            <datalist id="blog-categories">
              {categories.filter((c) => c !== "All").map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <input
              value={blogForm.image}
              onChange={(e) => setBlogForm((prev) => ({ ...prev, image: e.target.value }))}
              placeholder="Cover image path e.g /uploads/my-image.jpg"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="block rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <span className="font-medium text-slate-700">Upload cover image</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading || busy}
                  onChange={handleCoverUpload}
                  className="mt-2 block w-full text-xs"
                />
              </label>
              <label className="block rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <span className="font-medium text-slate-700">Upload inline image</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading || busy}
                  onChange={handleInlineUpload}
                  className="mt-2 block w-full text-xs"
                />
              </label>
            </div>
            <div className="rounded-lg border border-slate-300">
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 p-2">
                <button
                  type="button"
                  onClick={() => setEditorMode("write")}
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    editorMode === "write" ? "bg-sky-700 text-white" : "bg-white text-slate-700"
                  }`}
                >
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setEditorMode("preview")}
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    editorMode === "preview" ? "bg-sky-700 text-white" : "bg-white text-slate-700"
                  }`}
                >
                  Preview
                </button>

                <div className="mx-1 h-5 w-px bg-slate-300" />

                <button type="button" onClick={() => insertBlock("<h2>Section Title</h2>")} className="rounded border border-slate-300 bg-white px-2 py-1 text-xs">H2</button>
                <button type="button" onClick={() => insertBlock("<h3>Subheading</h3>")} className="rounded border border-slate-300 bg-white px-2 py-1 text-xs">H3</button>
                <button type="button" onClick={() => insertAtSelection("<strong>", "</strong>")} className="rounded border border-slate-300 bg-white px-2 py-1 text-xs">Bold</button>
                <button type="button" onClick={() => insertAtSelection("<em>", "</em>")} className="rounded border border-slate-300 bg-white px-2 py-1 text-xs">Italic</button>
                <button type="button" onClick={() => insertBlock("<ul><li>Point one</li><li>Point two</li></ul>")} className="rounded border border-slate-300 bg-white px-2 py-1 text-xs">List</button>
                <button type="button" onClick={() => insertAtSelection("<a href='https://'>", "</a>")} className="rounded border border-slate-300 bg-white px-2 py-1 text-xs">Link</button>
                <button type="button" onClick={() => insertBlock("<img src='/uploads/your-image.jpg' alt='Image' />")} className="rounded border border-slate-300 bg-white px-2 py-1 text-xs">Image</button>
              </div>

              {editorMode === "write" ? (
                <textarea
                  ref={contentRef}
                  required
                  value={blogForm.content}
                  onChange={(e) => setBlogForm((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder={"HTML or markdown content. Inline images: <img src='/logo.png' alt='...' />"}
                  rows={14}
                  className="w-full rounded-b-lg px-3 py-3 font-mono text-sm outline-none"
                />
              ) : (
                <div
                  className="min-h-87.5 rounded-b-lg bg-white px-4 py-4 text-[1.02rem] leading-7 text-slate-900 [&_img]:my-6 [&_img]:w-full [&_img]:rounded-xl [&_img]:border [&_img]:border-slate-200"
                  dangerouslySetInnerHTML={{ __html: blogForm.content || "<p>Nothing to preview yet.</p>" }}
                />
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={busy || uploading}
                className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800 disabled:opacity-60"
              >
                {blogForm.id ? "Update Post" : "Create Post"}
              </button>
              {blogForm.id && (
                <button
                  type="button"
                  onClick={() => setBlogForm(emptyBlogForm)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold">Create / Edit Shop Product</h2>
          <form className="mt-4 space-y-3" onSubmit={handleSaveProduct}>
            <select
              value={productForm.category}
              onChange={(e) =>
                setProductForm((prev) => ({
                  ...prev,
                  category: e.target.value as ShopCategory,
                }))
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              <option value="digital-products">Digital Products</option>
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
            </select>
            <input
              required
              value={productForm.title}
              onChange={(e) => setProductForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Product title"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
            <textarea
              required
              value={productForm.description}
              onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Product description"
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
            <input
              required
              value={productForm.price}
              onChange={(e) => setProductForm((prev) => ({ ...prev, price: e.target.value }))}
              placeholder="Price e.g ₦5,000"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
            <input
              value={productForm.buyLink}
              onChange={(e) => setProductForm((prev) => ({ ...prev, buyLink: e.target.value }))}
              placeholder="Buy link e.g /contact"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={busy || uploading}
                className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800 disabled:opacity-60"
              >
                {productForm.id ? "Update Product" : "Create Product"}
              </button>
              {productForm.id && (
                <button
                  type="button"
                  onClick={() => setProductForm(emptyProductForm)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-semibold">All Blog Posts</h3>
          <div className="mt-4 space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="rounded-lg border border-slate-200 p-3">
                <p className="font-semibold">{post.title}</p>
                <p className="text-xs text-slate-500">{post.category} · {new Date(post.date).toLocaleDateString()}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setBlogForm({
                        id: post.id,
                        title: post.title,
                        category: post.category,
                        image: post.image || "",
                        content: post.content,
                      })
                    }
                    className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-medium"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteBlog(post.id)}
                    className="rounded-lg border border-red-300 px-3 py-1 text-xs font-medium text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-semibold">All Shop Products</h3>
          <div className="mt-4 space-y-4">
            {(Object.keys(productGroups) as ShopCategory[]).map((group) => (
              <div key={group}>
                <p className="mb-2 text-sm font-semibold uppercase text-slate-600">{group.replace("-", " ")}</p>
                <div className="space-y-2">
                  {productGroups[group].map((product) => (
                    <div key={product.id} className="rounded-lg border border-slate-200 p-3">
                      <p className="font-semibold">{product.title}</p>
                      <p className="text-xs text-slate-500">{product.price}</p>
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setProductForm({
                              id: product.id,
                              category: product.category,
                              title: product.title,
                              description: product.description,
                              price: product.price,
                              buyLink: product.buyLink,
                            })
                          }
                          className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-medium"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="rounded-lg border border-red-300 px-3 py-1 text-xs font-medium text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
