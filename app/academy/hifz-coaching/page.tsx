import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function HifzCoachingPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6">
        {/* Hero */}
        <section className="mx-auto max-w-4xl py-24 text-center md:py-32">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            OmmSulaim Academy
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Structured Hifz Coaching
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Helping Qur’an students build a consistent memorization and
            revision routine through focused coaching, guidance, and
            accountability.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-lg bg-sky-700 px-7 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-sky-800"
            >
              Enquire About Hifz Coaching
            </Link>

            <Link
              href="/academy/quran-memorization"
              className="rounded-lg border border-amber-400 bg-white px-7 py-3 text-sm font-medium text-slate-900 transition hover:bg-amber-50"
            >
              Try the Free Hifz Planner
            </Link>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
                  Who it is for
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                  For students who are already memorizing Qur’an
                </h2>

                <p className="mt-4 leading-8 text-slate-600">
                  This coaching is for students who want more structure,
                  consistency, and guidance as they continue their Hifz
                  journey.
                </p>

                <ul className="mt-6 space-y-3 text-slate-700">
                  <li>• Students who struggle to maintain a regular routine</li>
                  <li>• Students who need help balancing new memorization and revision</li>
                  <li>• Students who benefit from regular accountability and guidance</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
                  The focus
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                  Memorize, revise, and stay consistent
                </h2>

                <p className="mt-4 leading-8 text-slate-600">
                  The goal is not simply to add more pages. We work on a
                  manageable routine that gives attention to new memorization,
                  recent revision, and older memorized portions.
                </p>

                <p className="mt-4 leading-8 text-slate-600">
                  The exact pace can be adjusted around the student’s current
                  memorization, available time, and ability to maintain the
                  routine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How coaching works */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
              How coaching works
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">
              Three focused sessions each week
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
              Regular sessions provide a rhythm for working through new
              memorization, revision, and the habits that help students stay
              consistent.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3 text-left">
              <div className="rounded-2xl border border-slate-200 p-7">
                <span className="text-sm font-semibold text-amber-600">
                  01
                </span>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">
                  New Memorization
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  Work through manageable new portions while building a routine
                  that can be maintained consistently.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-7">
                <span className="text-sm font-semibold text-amber-600">
                  02
                </span>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">
                  Revision
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  Give regular attention to recent and older memorized portions
                  so previous work remains active.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-7">
                <span className="text-sm font-semibold text-amber-600">
                  03
                </span>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">
                  Guidance &amp; Accountability
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  Get ongoing guidance and a clear routine to help you keep
                  moving rather than repeatedly starting over.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl rounded-3xl border border-amber-200 bg-amber-50 px-6 py-12 text-center md:px-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
              Coaching fee
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              $5 per session
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-8 text-slate-700">
              Coaching is scheduled three times each week. Students enrol
              monthly for 12 sessions.
            </p>

            <p className="mt-5 text-2xl font-semibold text-slate-900">
              $60 / month
            </p>

            <p className="mt-2 text-sm text-slate-600">
              12 coaching sessions per month
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-block rounded-lg bg-sky-700 px-7 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-sky-800"
            >
              Enquire About Coaching
            </Link>
          </div>
        </section>

        {/* Planner bridge */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 p-8 text-center md:p-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
              Not ready for coaching?
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              Start with the free Hifz Planner
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
              Use the planner to organize your new memorization and revision,
              then return when you need more structure and accountability.
            </p>

            <Link
              href="/academy/quran-memorization"
              className="mt-6 inline-block font-semibold text-sky-700 underline decoration-amber-500 underline-offset-4 hover:text-amber-700"
            >
              Open the Free Hifz Planner →
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mb-20 rounded-3xl bg-slate-900 px-6 py-14 text-center text-white md:px-12">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Ready for a more consistent Hifz routine?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
            Get in touch to discuss Hifz coaching and how the sessions can fit
            into the student’s current memorization routine.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-amber-400 px-7 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
          >
            Enquire About Hifz Coaching
          </Link>
        </section>
      </main>
    </>
  );
}
