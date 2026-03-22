import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-24">
        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Faith-Centred Education and Digital Solutions
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            OmmSulaim Digital Services Ltd provides online learning, digital resources, 
            and modern web solutions designed to support purposeful growth.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/academy"
              className="rounded-lg bg-sky-700 px-6 py-3 text-white text-sm font-medium shadow-sm transition hover:bg-sky-800"
            >
              Explore the Academy
            </Link>
            <Link
              href="/services"
              className="rounded-lg border border-amber-400 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-amber-50"
            >
              Our Services
            </Link>
          </div>
        </section>

        {/* About Snippet */}
        <section className="mt-24 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">About OmmSulaim</h2>
          <p className="mt-4 text-gray-600">
            OmmSulaim Digital Services Ltd is a registered company focused on education, 
            digital learning, and practical technology services.
          </p>
          <Link
            href="/about"
            className="mt-4 inline-block font-medium text-sky-700 hover:text-amber-700"
          >
            Learn More
          </Link>
        </section>

        {/* Services Preview */}
        <section className="mt-24 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">What We Offer</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-8">
            <Link
              href="/academy"
              className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-amber-300 hover:shadow-md"
            >
              <h3 className="text-xl font-medium mb-2">Education & Learning</h3>
              <p className="text-gray-600">
                Structured Qur’an learning and educational programs for all ages.
              </p>
            </Link>
            <Link
              href="/coming-soon"
              className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-amber-300 hover:shadow-md"
            >
              <h3 className="text-xl font-medium mb-2">Digital Products</h3>
              <p className="text-gray-600">
                Ebooks and curated learning resources for self-study and growth.
              </p>
            </Link>
            <Link
              href="/services"
              className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-amber-300 hover:shadow-md"
            >
              <h3 className="text-xl font-medium mb-2">Web & Tech Services</h3>
              <p className="text-gray-600">
                Website design, consultancy, and simple digital solutions for small businesses.
              </p>
            </Link>
          </div>
        </section>

        {/* Featured Shop Section */}
        <section className="mt-24 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Shop</h2>
          <p className="mt-4 text-gray-600">
            Explore curated resources and lifestyle essentials to support learning and growth.
          </p>
          <Link
            href="/coming-soon"
            className="mt-6 inline-block rounded-lg bg-sky-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-800"
          >
            Go to Shop
          </Link>
        </section>

        {/* Call to Action */}
        <section className="mt-24 rounded-lg border border-slate-200 bg-white py-16 text-center">
          <h2 className="text-3xl font-semibold">Ready to start?</h2>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/academy"
              className="rounded-lg bg-sky-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-800"
            >
              Join the Academy
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-amber-400 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-amber-50"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}