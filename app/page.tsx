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
            Digital Solutions for Learning, Growth, and Online Presence
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            OmmSulaim Digital Services Ltd is a digital solutions company focused on building structured learning systems, developing educational resources, and providing practical web solutions.
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
            OmmSulaim Digital Services Ltd is a registered digital services company with a focus on education technology, digital learning, and practical web solutions.
          </p>
          <p className="mt-4 text-gray-600">
            The company develops structured systems, resources, and platforms designed to support effective learning and a functional online presence.
          </p>
          <p className="mt-4 text-gray-600">
            We focus on creating simple, structured, and accessible digital systems that solve real learning and operational needs.
          </p>
          <Link
            href="/about"
            className="mt-4 inline-block font-medium text-sky-700 hover:text-amber-700"
          >
            Learn More
          </Link>
        </section>

        {/* Focus Areas */}
        <section className="mt-24 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Our Focus Areas</h2>
          <ul className="mt-6 space-y-2 text-gray-700">
            <li>Education Technology (EdTech)</li>
            <li>Digital Learning Systems</li>
            <li>Web &amp; Online Solutions</li>
          </ul>
        </section>

        {/* Services Preview */}
        <section className="mt-24 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">What We Offer</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-8">
            <Link
              href="/academy"
              className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-amber-300 hover:shadow-md"
            >
              <h3 className="text-xl font-medium mb-2">Education Platforms</h3>
              <p className="text-gray-600">
                Development and delivery of structured learning programs through dedicated platforms such as OmmSulaim Academy.
              </p>
            </Link>
            <Link
              href="/coming-soon"
              className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-amber-300 hover:shadow-md"
            >
              <h3 className="text-xl font-medium mb-2">Digital Learning Resources</h3>
              <p className="text-gray-600">
                Creation of digital products and materials designed to support structured education, independent study, and consistent learning.
              </p>
            </Link>
            <Link
              href="/services"
              className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-amber-300 hover:shadow-md"
            >
              <h3 className="text-xl font-medium mb-2">Web &amp; Digital Solutions</h3>
              <p className="text-gray-600">
                Website development, setup, and consultancy services to help individuals and small organizations establish and manage their online presence.
              </p>
            </Link>
          </div>
        </section>

        {/* Featured Shop Section */}
        <section className="mt-24 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Shop</h2>
          <p className="mt-4 text-gray-600">
            Access digital resources and tools developed to support learning, organization, and personal growth.
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
          <h2 className="text-3xl font-semibold">OmmSulaim Academy</h2>
          <p className="mt-4 text-gray-600">
            Our dedicated learning platform for Qur&#39;an and Arabic education.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/academy"
              className="rounded-lg bg-sky-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-800"
            >
              Explore the Academy
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}