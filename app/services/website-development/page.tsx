import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/Navbar";

const audiences = [
  "Online teachers & tutors",
  "Online academies",
  "Small businesses",
  "Personal brands",
  "Educators & learning projects",
  "Organisations going digital",
];

const builds = [
  {
    title: "Business Websites",
    description:
      "Professional websites that clearly explain what you offer and make it easy for people to get in touch.",
  },
  {
    title: "Teacher & Academy Websites",
    description:
      "Purpose-built websites for teachers, tutors, and online academies that need a clear home for their programmes and resources.",
  },
  {
    title: "Landing Pages",
    description:
      "Focused pages for a course, service, project, campaign, or specific offer.",
  },
  {
    title: "Blog & Content Sites",
    description:
      "Websites designed to publish useful content, build an audience, and keep information organised.",
  },
  {
    title: "Resource Pages & Simple Tools",
    description:
      "Custom pages for planners, trackers, quizzes, calculators, and other straightforward web resources.",
  },
];

const included = [
  "Responsive design for phones, tablets, and desktops",
  "Custom page layouts built around your goals",
  "Core pages such as Home, About, Services, and Contact",
  "Clear navigation and user-friendly structure",
  "Contact and enquiry flows",
  "A clean foundation for future improvements",
];

const process = [
  ["01", "Understand", "We learn about your goals, audience, content, and what the website needs to achieve."],
  ["02", "Plan", "We organise the pages, content, and features before development begins."],
  ["03", "Build", "We develop the website and shape the experience across screen sizes."],
  ["04", "Review & Launch", "You review the finished site, we make agreed adjustments, and prepare it for launch."],
];

export const metadata: Metadata = { title: "Website Design & Development", description: "Custom responsive websites for small businesses, personal brands, educators, and online academies." };

export default function WebsiteDevelopmentPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                Website Design & Development
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
                A website that works for your goals.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                We design and build modern, responsive websites for educators,
                online teachers, small businesses, personal brands, and
                organisations that want a professional presence online.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded-lg bg-sky-700 px-6 py-3 font-medium text-white transition hover:bg-sky-800"
                >
                  Tell Us About Your Project
                </Link>
                <Link
                  href="/services"
                  className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-800 transition hover:bg-slate-50"
                >
                  View All Services
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-amber-700">
                More than a pretty website
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">
                Clear structure. Useful features. Room to grow.
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                A good website should help visitors understand what you do,
                find what they need, and take the next step without confusion.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                Who It&apos;s For
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Websites for people building something online
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                We work especially well with people who need both a strong
                online presence and a practical understanding of digital
                learning, content, and services.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {audiences.map((audience) => (
                <div
                  key={audience}
                  className="rounded-2xl border border-slate-200 bg-white p-5 font-medium text-slate-800 shadow-sm"
                >
                  {audience}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              What We Can Build
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Choose a starting point, then shape it around your needs
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {builds.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 px-6 py-20 text-white md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2 md:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                  What&apos;s Included
                </p>
                <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                  Built with the essentials in place
                </h2>
                <p className="mt-5 max-w-xl leading-7 text-slate-300">
                  Every project is scoped around what you actually need. We
                  focus on a solid, usable website rather than adding features
                  simply for the sake of having them.
                </p>
              </div>

              <ul className="space-y-4">
                {included.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 text-slate-200"
                  >
                    <span className="mr-3 text-amber-300">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Our Process
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              From idea to launched website
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {process.map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-semibold text-amber-700">{number}</span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-amber-50 px-6 py-20 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              Let&apos;s Build It Properly
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Have a website idea but not sure where to start?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
              Tell us what you are building, who it is for, and what you want
              the website to do. We can start with the scope and work out the
              right next step from there.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-lg bg-sky-700 px-6 py-3 font-medium text-white transition hover:bg-sky-800"
            >
              Start a Project Enquiry
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
