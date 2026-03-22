import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getShopProductsByCategory } from "@/lib/shop";

export default async function AccessoriesPage() {
  const accessoriesItems = await getShopProductsByCategory("accessories");

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-24">
        {/* Hero / Title */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Accessories
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Explore our collection of bags, learning tools, and lifestyle accessories
            to complement your learning journey.
          </p>
        </section>

        {/* Product Grid */}
        <section className="mt-24 max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {accessoriesItems.map((item, idx) => (
            <div key={idx} className="p-6 border rounded-lg hover:shadow-lg transition flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-800 font-semibold">{item.price}</span>
                <Link
                  href={item.buyLink || "/contact"}
                  className="rounded-lg bg-black px-4 py-2 text-white text-sm font-medium"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-24 text-center">
          <h2 className="text-3xl font-semibold">Need Custom Accessories?</h2>
          <p className="mt-4 text-gray-600">
            Contact us for custom orders, bulk requests, or special accessories.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}