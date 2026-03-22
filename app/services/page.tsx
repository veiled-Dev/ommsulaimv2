import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-24">
        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our Services
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            We provide a range of services designed to empower learning, 
            digital literacy, and practical web solutions for individuals and organizations.
          </p>
        </section>

        {/* Services Grid */}
        <section className="mt-24 max-w-5xl mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Education & Learning */}
            <Link
              href="/academy"
              className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-amber-300 hover:shadow-md"
            >
              <h3 className="text-xl font-medium mb-2">Education & Learning</h3>
              <p className="text-gray-600">
                Structured Qur’an learning and educational programs for children and adults.
              </p>
              <span className="mt-4 inline-block font-medium text-sky-700">
                Learn More
              </span>
            </Link>

            {/* Digital Products */}
            <Link
              href="/coming-soon"
              className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-amber-300 hover:shadow-md"
            >
              <h3 className="text-xl font-medium mb-2">Digital Products</h3>
              <p className="text-gray-600">
                Ebooks and curated digital resources to support self-learning and development.
              </p>
              <span className="mt-4 inline-block font-medium text-sky-700">
                Browse Products
              </span>
            </Link>

            {/* Web & Tech Services */}
            <Link
              href="/services"
              className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-amber-300 hover:shadow-md"
            >
              <h3 className="text-xl font-medium mb-2">Web & Tech Services</h3>
              <p className="text-gray-600">
                Website design, consultancy, and simple digital solutions for small businesses.
              </p>
              <span className="mt-4 inline-block font-medium text-sky-700">
                Contact Us
              </span>
            </Link>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mt-24 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Why Choose OmmSulaim</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6 text-left">
            <div className="rounded-lg border border-slate-200 bg-white p-4 transition hover:border-amber-300 hover:shadow-md">
              <h3 className="font-medium">Faith-aligned and Values-driven</h3>
              <p className="text-gray-600 mt-2">
                Every service and product is designed with ethical and faith-aligned principles.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 transition hover:border-amber-300 hover:shadow-md">
              <h3 className="font-medium">Structured and Practical Learning</h3>
              <p className="text-gray-600 mt-2">
                We focus on clarity, structure, and actionable digital solutions.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 transition hover:border-amber-300 hover:shadow-md">
              <h3 className="font-medium">Supportive Technology Services</h3>
              <p className="text-gray-600 mt-2">
                From website design to digital consultancy, we make tech simple.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 transition hover:border-amber-300 hover:shadow-md">
              <h3 className="font-medium">Long-term Impact</h3>
              <p className="text-gray-600 mt-2">
                Our services are designed to create lasting growth for families and organizations.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 text-center">
          <h2 className="text-3xl font-semibold">Get Started Today</h2>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/academy"
              className="rounded-lg bg-sky-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-800"
            >
              Explore Academy
            </Link>
            <Link
              href="/coming-soon"
              className="rounded-lg border border-amber-400 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-amber-50"
            >
              Visit Shop
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