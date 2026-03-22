import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function AcademyPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-24">
        {/* Hero / Title */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            OmmSulaim Academy
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Structured Qur’an learning and educational programs designed to support
            students of all ages in reading, understanding, and memorization.
          </p>
        </section>

        {/* Programs Overview */}
        <section className="mt-24 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Our Programs</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-8 text-left">
            {/* Program 1 */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-medium mb-2">Qur’an Reading</h3>
              <p className="text-gray-600">
                Learn to read the Qur’an fluently with proper Tajweed and pronunciation.
              </p>
              <Link
                href="https://forms.gle/Tzvw6uvPqZfYab7e7"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-600 font-medium"
              >
                Enrol Now
              </Link>
            </div>

            {/* Program 2 */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-medium mb-2">Tarteel & Tajweed</h3>
              <p className="text-gray-600">
                Enhance your recitation skills with correct rhythm, and Tajweed rules.
              </p>
              <Link
                href="https://forms.gle/Tzvw6uvPqZfYab7e7"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-600 font-medium"
              >
                Enrol Now
              </Link>
            </div>

            {/* Program 3 */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-medium mb-2">Memorization (Hifz)</h3>
              <p className="text-gray-600">
                Structured support for memorizing the Qur’an efficiently and confidently.
              </p>
              <Link
                href="https://forms.gle/Tzvw6uvPqZfYab7e7"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-600 font-medium"
              >
                Enrol Now
              </Link>
            </div>
          </div>
        </section>

        {/* How Learning Works */}
        <section className="mt-24 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">How Learning Works</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg hover:shadow-lg transition">
              <h3 className="font-medium">Step 1: Assessment</h3>
              <p className="text-gray-600 mt-2">
                Students are assessed to determine their current reading and memorization level.
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-lg transition">
              <h3 className="font-medium">Step 2: Structured Learning</h3>
              <p className="text-gray-600 mt-2">
                Customized lesson plans are provided to build skills gradually and effectively.
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-lg transition">
              <h3 className="font-medium">Step 3: Progress Tracking</h3>
              <p className="text-gray-600 mt-2">
                Students receive regular feedback and guidance to stay on track and succeed.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 text-center">
          <h2 className="text-3xl font-semibold">Ready to start your learning journey?</h2>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="https://forms.gle/Tzvw6uvPqZfYab7e7"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-black px-6 py-3 text-white text-sm font-medium"
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

        {/* Additional CTA */}
        <section className="mt-24 text-center">
          <h2 className="text-3xl font-semibold">Open Qur’an Memorization Planner</h2>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/academy/quran-memorization?entry=academy"
              className="inline-flex items-center rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-900"
            >
              Open Qur’an Memorization Planner
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}