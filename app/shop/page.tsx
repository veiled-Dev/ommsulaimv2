import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getAllShopProducts } from "@/lib/shop";

export default async function ShopPage() {
  const products = await getAllShopProducts();
  const paidProducts = products.filter((product) => product.access === "paid");
  const freeProducts = products.filter((product) => product.access === "free");

  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">OmmSulaim Digital Shop</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
                Practical digital resources for learning and teaching.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Explore ebooks, workbooks, planners, and other digital resources created to make learning and teaching more practical.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#paid-products" className="rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800">Browse Products</a>
                <a href="#free-resources" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Free Resources</a>
              </div>
            </div>
          </div>
        </section>

        <section id="paid-products" className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">Digital products</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">Resources you can purchase</h2>
          <p className="mt-3 max-w-2xl text-slate-600">Downloadable resources for learners, parents, teachers, and families.</p>

          {paidProducts.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paidProducts.map((product) => (
                <article key={product.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sm font-bold text-sky-700">PDF</div>
                  <h3 className="text-xl font-semibold text-slate-950">{product.title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-slate-600">{product.description}</p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="font-semibold text-slate-950">{product.price}</span>
                    <Link href={product.buyLink || "/contact"} className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">Purchase</Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h3 className="text-xl font-semibold text-slate-950">We’re building the first collection.</h3>
              <p className="mx-auto mt-3 max-w-xl text-slate-600">Paid digital products will appear here as they are published. In the meantime, explore the free resources below.</p>
            </div>
          )}
        </section>

        <section id="free-resources" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-sky-700">Free resources</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Useful resources, free to use.</h2>
            <p className="mt-3 max-w-2xl text-slate-600">Start with free resources and use them at home or in your learning routine.</p>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <span className="text-sm font-semibold text-sky-700">FREE</span>
                <h3 className="mt-3 text-xl font-semibold text-slate-950">Qur’an Memorization Planner</h3>
                <p className="mt-3 leading-7 text-slate-600">Build a practical weekly routine for new memorization, recent revision, and older revision.</p>
                <Link href="/academy/quran-memorization" className="mt-6 inline-flex rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-800">Use the Planner</Link>
              </article>

              {freeProducts.map((product) => (
                <article key={product.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <span className="text-sm font-semibold text-sky-700">FREE</span>
                  <h3 className="mt-3 text-xl font-semibold text-slate-950">{product.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{product.description}</p>
                  <Link href={product.buyLink || "/contact"} className="mt-6 inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50">Get Resource</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-3xl bg-slate-950 px-6 py-12 text-white md:px-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">Need something specific?</p>
            <h2 className="mt-3 text-3xl font-bold">Have a resource idea or question?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">If you are looking for a particular learning resource or want to discuss a digital project, get in touch with us.</p>
            <Link href="/contact" className="mt-7 inline-flex rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-300">Contact OmmSulaim</Link>
          </div>
        </section>
      </main>
    </>
  );
}
