import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getShopProductsByCategory } from "@/lib/shop";

export default async function DigitalProductsPage() {
  const products = await getShopProductsByCategory("digital-products");

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-700">OmmSulaim Shop</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">Digital Products</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">Ebooks, workbooks, planners, and other practical digital resources for learning and teaching.</p>
        </div>

        {products.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">{product.access === "free" ? "Free Resource" : "Digital Product"}</span>
                <h2 className="mt-3 text-xl font-semibold text-slate-950">{product.title}</h2>
                <p className="mt-3 flex-1 leading-7 text-slate-600">{product.description}</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="font-semibold text-slate-950">{product.access === "free" ? "Free" : product.price}</span>
                  <Link href={product.buyLink || "/contact"} className="rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-800">
                    {product.access === "free" ? "Get Resource" : "Purchase"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-950">Digital products are being prepared.</h2>
            <p className="mt-3 text-slate-600">Check back soon for new resources.</p>
          </div>
        )}

        <div className="mt-12">
          <Link href="/shop" className="text-sm font-semibold text-sky-700 hover:text-sky-900">← Back to Shop</Link>
        </div>
      </main>
    </>
  );
}
