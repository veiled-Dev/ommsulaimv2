import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6">
        {/* Hero */}
        <section className="mx-auto max-w-4xl py-24 text-center md:py-32">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            OmmSulaim Digital Services Ltd
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Learning, Digital Resources &amp; Online Solutions
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            OmmSulaim brings together Qur’an and Arabic education, practical
            digital learning resources, and web solutions for educators,
            families, and small organizations.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/academy"
              className="rounded-lg bg-sky-700 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-sky-800"
            >
              Explore the Academy
            </Link>

            <Link
              href="/academy/quran-memorization"
              className="rounded-lg border border-amber-400 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-amber-50"
            >
              Try the Free Hifz Planner
            </Link>
          </div>
        </section>

        {/* Three Pathways */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
              Explore OmmSulaim
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">
              What can we help you with?
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Link
              href="/academy"
              className="group rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
            >
              <p className="text-sm font-semibold text-amber-600">
                Qur’an &amp; Arabic
              </p>

              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                OmmSulaim Academy
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Structured learning support for Qur’an reading, Hifz, Tajweed,
                and Arabic.
              </p>

              <span className="mt-6 inline-block text-sm font-semibold text-sky-700 group-hover:text-amber-700">
                Explore the Academy →
              </span>
            </Link>

            <Link
              href="/academy/quran-memorization"
              className="group rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
            >
              <p className="text-sm font-semibold text-amber-600">
                Free Resource
              </p>

              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                Hifz Memorization Planner
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Organize new memorization and revision with a practical weekly
                Qur’an memorization plan.
              </p>

              <span className="mt-6 inline-block text-sm font-semibold text-sky-700 group-hover:text-amber-700">
                Try the Planner →
              </span>
            </Link>

            <Link
              href="/services"
              className="group rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
            >
              <p className="text-sm font-semibold text-amber-600">
                Web &amp; Digital
              </p>

              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                Web &amp; Digital Services
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Websites and practical digital solutions for educators, small
                businesses, and organizations.
              </p>

              <span className="mt-6 inline-block text-sm font-semibold text-sky-700 group-hover:text-amber-700">
                View Services →
              </span>
            </Link>
          </div>
        </section>

        {/* About OmmSulaim */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
                About OmmSulaim
              </p>

              <h2 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">
                Meaningful education. Practical digital solutions.
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                OmmSulaim brings together online learning, digital resources,
                and modern web solutions designed to support purposeful growth.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <h3 className="text-2xl font-semibold text-slate-900">
                  What we do
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  OmmSulaim Digital Service Ltd is a Nigerian-registered company
                  working across education, digital learning, and practical
                  technology services. Through OmmSulaim Academy, digital
                  resources, and web services, we create useful solutions that
                  make learning and online work more structured, accessible,
                  and practical.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <h3 className="text-2xl font-semibold text-slate-900">
                  Our purpose
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  Our mission is to provide meaningful education and practical
                  digital solutions that empower learning and growth in a
                  values-driven way. We aim to build useful, faith-centred
                  learning experiences and technologies people can trust.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/about"
                className="font-semibold text-sky-700 hover:text-amber-700"
              >
                Learn more about OmmSulaim →
              </Link>
            </div>
          </div>
        </section>

        {/* Free Hifz Planner */}
        <section className="py-16">
          <div className="overflow-hidden rounded-3xl border border-amber-200 bg-amber-50 px-6 py-12 text-center md:px-12 md:py-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
              Free Tool
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
              Plan Your Hifz Journey
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-700">
              A simple Qur’an memorization planner to help you organize new
              memorization, recent revision, and older revision while building
              a consistent routine.
            </p>

            <Link
              href="/academy/quran-memorization"
              className="mt-8 inline-block rounded-lg bg-sky-700 px-7 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-sky-800"
            >
              Try the Free Hifz Planner
            </Link>

            <p className="mt-5 text-sm text-slate-600">
              Looking for more structure and guidance with your Hifz?
            </p>

            <Link
              href="/academy"
              className="mt-2 inline-block text-sm font-semibold text-slate-900 underline decoration-amber-500 underline-offset-4 hover:text-amber-700"
            >
              Explore Hifz learning with OmmSulaim Academy →
            </Link>
          </div>
        </section>

        {/* Academy */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
              OmmSulaim Academy
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">
              Learn with structure and purpose
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Explore Qur’an, Hifz, Tajweed, and Arabic learning support
              designed for students at different stages of their learning
              journey.
            </p>

            <Link
              href="/academy"
              className="mt-8 inline-block rounded-lg bg-sky-700 px-7 py-3 text-sm font-medium text-white transition hover:bg-sky-800"
            >
              Explore the Academy
            </Link>
          </div>
        </section>

        {/* Blog */}
        <section className="py-16">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
                From the Blog
              </p>

              <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                Practical ideas for learning and teaching
              </h2>

              <p className="mt-3 max-w-2xl text-slate-600">
                Helpful articles, ideas, and resources for learners, parents,
                teachers, and people building better online learning
                experiences.
              </p>
            </div>

            <Link
              href="/blog"
              className="font-semibold text-sky-700 hover:text-amber-700"
            >
              Visit the Blog →
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mb-20 rounded-3xl bg-slate-900 px-6 py-14 text-center text-white md:px-12">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Have a learning or digital project in mind?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
            Whether you are looking for learning support, a useful digital
            resource, or help building your online presence, let’s explore
            what you need.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-amber-400 px-7 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
          >
            Get in Touch
          </Link>
        </section>
      </main>
    </>
  );
}
