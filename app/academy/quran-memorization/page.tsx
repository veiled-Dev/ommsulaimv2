import Link from "next/link";
import Navbar from "@/components/Navbar";
import MemorizationPlanner from "@/components/academy/MemorizationPlanner";

export default function QuranMemorizationPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Free OmmSulaim Resource
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Qur’an Memorization Planner
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-700 dark:text-slate-300 md:text-lg">
            Build a practical weekly routine for new memorization, recent revision, and older revision.
            Your plan stays saved on this device, so you can return and keep checking off your progress.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/academy"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              ← Back to Academy
            </Link>
            <Link
              href="/academy/hifz-coaching"
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
            >
              Explore Hifz Coaching
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-5xl rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/60">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">1. Set your routine</p>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Enter your current memorization point, new pages per day, and the number of weeks you want to plan.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">2. Follow the schedule</p>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Your plan separates new memorization, recent revision, and older revision across the week.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">3. Track your days</p>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Check off each completed day. Your checklist is saved locally without requiring an account.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-10 max-w-5xl">
          <MemorizationPlanner />
        </div>

        <section className="mx-auto mt-12 max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Need more structure?
              </p>
              <h2 className="mt-2 text-2xl font-bold">Structured Hifz Coaching</h2>
              <p className="mt-2 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
                If you want regular guidance and accountability alongside your personal Hifz routine,
                explore our structured coaching option.
              </p>
            </div>
            <Link
              href="/academy/hifz-coaching"
              className="inline-flex justify-center rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90 dark:bg-white dark:text-black"
            >
              Learn About Coaching
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}