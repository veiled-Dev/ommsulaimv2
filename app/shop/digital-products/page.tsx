import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getShopProductsByCategory } from "@/lib/shop";

export default async function DigitalProductsPage() {
  const products = await getShopProductsByCategory("digital-products");

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-24">
        {/* Hero / Title */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Digital Products
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Explore our curated ebooks and learning resources to enhance your skills and knowledge.
          </p>
        </section>

        {/* Products Grid */}
        <section className="mt-24 max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <div key={idx} className="p-6 border rounded-lg hover:shadow-lg transition flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-medium mb-2">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-800 font-semibold">{product.price}</span>
                <Link
                  href={product.buyLink || "/contact"}
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
          <h2 className="text-3xl font-semibold">Have Questions?</h2>
          <p className="mt-4 text-gray-600">
            Contact us for custom products, bulk orders, or inquiries about our digital resources.
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