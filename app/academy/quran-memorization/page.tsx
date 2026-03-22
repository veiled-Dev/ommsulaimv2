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
          <p className="mt-3 text-gray-600">
            Build a weekly-circle schedule for new memorization, new revision, and old revision.
          </p>
          <Link href="/academy" className="mt-4 inline-block text-sm font-medium text-blue-600">
            ← Back to Academy
          </Link>
        </div>

        <div className="mx-auto max-w-5xl">
          <MemorizationPlanner />
        </div>
      </main>
    </>
  );
}