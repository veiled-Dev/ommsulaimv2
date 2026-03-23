import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import MemorizationPlanner from "@/components/academy/MemorizationPlanner";

type PageProps = {
  searchParams: Promise<{ entry?: string | string[] }>;
};

export default async function QuranMemorizationPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const entry = Array.isArray(params.entry) ? params.entry[0] : params.entry;

  if (entry !== "academy") {
    redirect("/academy");
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Qur’an Memorization Planner</h1>
          <p className="mt-3 text-gray-700 dark:text-slate-200">
            Build a weekly-circle schedule for new memorization, new revision, and old revision.
          </p>
          <Link href="/academy" className="mt-4 inline-block text-sm font-medium text-blue-600">
            ← Back to Academy
          </Link>
        </div>

        <section className="mx-auto mb-8 max-w-5xl rounded-xl border border-gray-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">How it works</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-gray-800 dark:text-slate-100">
            <li>Set your total pages, current starting page, and old memorized pages.</li>
            <li>Choose how many new pages you want to memorize each day and how many weeks to generate.</li>
            <li>New revision runs in a circular cycle over the last 10 days of your new memorization.</li>
            <li>Old revision is spread across the week so the full old pool is completed every 7 days.</li>
            <li>Tick the “Done” checkbox each day to track progress; your data auto-saves on this device.</li>
          </ol>
        </section>

        <div className="mx-auto max-w-5xl">
          <MemorizationPlanner />
        </div>
      </main>
    </>
  );
}