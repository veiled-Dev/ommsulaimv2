import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const enrolUrl = "https://forms.gle/Tzvw6uvPqZfYab7e7";

export const metadata: Metadata = { title: "Qur’an & Arabic Learning", description: "Explore OmmSulaim Academy programs for Qur’an reading, Tarteel and Tajweed, and structured Hifz coaching." };

export default function AcademyPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-24">
        {/* Hero */}
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            OmmSulaim Academy
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Qur’an &amp; Arabic Learning
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Structured Qur’an and Arabic learning designed to support students
            at different stages of their learning journey.
          </p>
        </section>

        {/* Programs */}
        <section className="mx-auto mt-24 max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Our Programs</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Choose the learning path that matches your current goals.
            </p>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-6 transition hover:border-amber-300 hover:shadow-lg">
              <h3 className="text-xl font-medium">Qur’an Reading</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Learn to read the Qur’an fluently with proper pronunciation and
                Tajweed foundations.
              </p>
              <Link
                href={enrolUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block font-medium text-sky-700 hover:text-amber-700"
              >
                Enrol Now →
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 transition hover:border-amber-300 hover:shadow-lg">
              <h3 className="text-xl font-medium">Tarteel &amp; Tajweed</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Develop more confident recitation through correct rhythm,
                pronunciation, and Tajweed rules.
              </p>
              <Link
                href={enrolUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block font-medium text-sky-700 hover:text-amber-700"
              >
                Enrol Now →
              </Link>
            </div>

            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6 transition hover:shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
                Coaching
              </p>

              <h3 className="mt-2 text-xl font-medium">Hifz Coaching</h3>

              <p className="mt-3 leading-7 text-slate-600">
                Build a consistent memorization and revision routine through
                focused coaching, guidance, and accountability.
              </p>

              <Link
                href="/academy/hifz-coaching"
                className="mt-5 inline-block font-medium text-sky-700 hover:text-amber-700"
              >
                Explore Hifz Coaching →
              </Link>
            </div>
          </div>
        </section>

        {/* How Learning Works */}
        <section className="mx-auto mt-24 max-w-4xl text-center">
          <h2 className="text-3xl font-semibold">How Learning Works</h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Learning is structured around the student’s goals, current level,
            and ability to maintain a consistent routine.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border p-6 transition hover:shadow-lg">
              <h3 className="font-medium">01: Understand Your Goals</h3>
              <p className="mt-2 text-slate-600">
                We identify what the student wants to learn and the kind of
                support they need.
              </p>
            </div>

            <div className="rounded-lg border p-6 transition hover:shadow-lg">
              <h3 className="font-medium">02: Structured Learning</h3>
              <p className="mt-2 text-slate-600">
                Lessons and coaching are organized into manageable steps that
                support steady progress.
              </p>
            </div>

            <div className="rounded-lg border p-6 transition hover:shadow-lg">
              <h3 className="font-medium">03: Ongoing Guidance</h3>
              <p className="mt-2 text-slate-600">
                Students receive guidance and feedback to help them stay
                consistent and continue developing.
              </p>
            </div>
          </div>
        </section>

        {/* Planner */}
        <section className="mx-auto mt-24 max-w-4xl rounded-3xl border border-amber-200 bg-amber-50 px-6 py-12 text-center md:px-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
            Free Hifz Resource
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Plan Your Qur’an Memorization
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-700">
            Use the free Hifz Planner to organize new memorization and revision
            and build a more consistent routine.
          </p>

          <Link
            href="/academy/quran-memorization?entry=academy"
            className="mt-7 inline-block rounded-lg bg-sky-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-800"
          >
            Open the Free Hifz Planner
          </Link>
        </section>

        {/* CTA */}
        <section className="mt-24 text-center">
          <h2 className="text-3xl font-semibold">
            Ready to begin your learning journey?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Explore the programs above or get in touch if you need help
            deciding where to begin.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={enrolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white"
            >
              Enrol Now
            </Link>

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
