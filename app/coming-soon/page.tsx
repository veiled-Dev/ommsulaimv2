import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Coming Soon</h1>
        <p className="mt-6 text-lg text-gray-600">
          Our shop is currently being prepared. We will be launching soon, in shaa Allah.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-black px-6 py-3 text-white text-sm font-medium"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium"
          >
            Contact Us
          </Link>
        </div>
      </main>
    </>
  );
}