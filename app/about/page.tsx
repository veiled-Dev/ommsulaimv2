import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-24">
        {/* Hero / Title */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About Us
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            We provide online learning, digital resources, and modern web solutions
            designed to support purposeful growth.
          </p>
        </section>

        {/* Who We Are */}
        <section className="mt-24 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Who We Are</h2>
          <p className="mt-4 text-gray-600">
            OmmSulaim Digital Services Ltd is a Nigerian-registered company focused
            on education, digital learning, and practical technology services.  
            We combine faith-aligned teaching with modern digital tools to support
            individuals, families, and organizations.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="mt-24 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 text-center">
          <div className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-amber-300 hover:shadow-md">
            <h3 className="text-2xl font-medium mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To provide meaningful education and practical digital solutions that
              empower learning and growth in a values-driven way.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-amber-300 hover:shadow-md">
            <h3 className="text-2xl font-medium mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To become a trusted provider of faith-centred digital education and
              learning technologies.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 text-center">
          <h2 className="text-3xl font-semibold">Get in Touch</h2>
          <p className="mt-4 text-gray-600">
            Reach out to learn more about our services or academy programs.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/academy"
              className="rounded-lg bg-sky-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-800"
            >
              Explore the Academy
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