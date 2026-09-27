import Navbar from "@/components/Navbar";
import Link from "next/link";

const services = [
  {
    title: "Website Design & Development",
    description:
      "Modern, responsive websites for educators, small businesses, personal brands, and organisations that need a professional presence online.",
    href: "/services/website-development",
    link: "Explore Website Services",
  },
  {
    title: "Online Learning & E-Learning",
    description:
      "Practical digital solutions for teachers, tutors, and online academies looking to organise and improve how they teach online.",
    href: "/contact",
    link: "Discuss Your Learning Project",
  },
  {
    title: "Digital Content & Resources",
    description:
      "Useful digital resources and content designed to support learning, teaching, communication, and everyday digital work.",
    href: "/contact",
    link: "Discuss a Content Project",
  },
  {
    title: "Digital Literacy & Skills Training",
    description:
      "Practical training to help individuals and teams build confidence with digital tools and online platforms.",
    href: "/contact",
    link: "Ask About Training",
  },
  {
    title: "Technical Support & IT Consultancy",
    description:
      "Straightforward guidance and support for choosing, setting up, improving, and managing digital tools and online systems.",
    href: "/contact",
    link: "Discuss Your Needs",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              OmmSulaim Digital Services
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Digital Solutions for Learning & Growing Online
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              We help educators, online teachers, small businesses, and
              organisations turn their ideas into practical digital solutions.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="bg-slate-50 px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                What We Do
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Practical services, built around your needs
              </h2>
              <p className="mt-4 text-slate-600">
                Whether you are starting from scratch or improving something
                you already have, we focus on solutions that are useful,
                manageable, and built to grow with you.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
                >
                  <h3 className="text-xl font-semibold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-4 flex-1 leading-7 text-slate-600">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="mt-6 font-medium text-sky-700 hover:text-sky-900"
                  >
                    {service.link} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Help */}
        <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                Who We Help
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Built for people doing meaningful work online
              </h2>
              <p className="mt-5 leading-7 text-slate-600">
                Our work sits at the intersection of education and technology,
                so we understand both the teaching side and the digital side
                of building an online presence.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Online teachers & tutors",
                "Online academies",
                "Small businesses",
                "Educators & learning projects",
                "Personal brands",
                "Organisations going digital",
              ].map((audience) => (
                <div
                  key={audience}
                  className="rounded-xl border border-slate-200 bg-white p-5 font-medium text-slate-800 shadow-sm"
                >
                  {audience}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-slate-900 px-6 py-20 text-white md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                How We Work
              </p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                A simple process from idea to solution
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-4">
              {[
                ["01", "Tell Us What You Need", "Share your goals, challenges, and what you want to achieve."],
                ["02", "Plan the Solution", "We clarify the scope and map out a practical approach."],
                ["03", "Build & Deliver", "We create the agreed solution and keep the process clear."],
                ["04", "Support & Improve", "Where needed, we help you maintain, improve, or build on it."],
              ].map(([number, title, description]) => (
                <div key={number} className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                  <span className="text-sm font-semibold text-amber-300">{number}</span>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            Tell us what you are trying to build, improve, or learn. We can
            start by understanding the problem and working out the right next
            step.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-lg bg-sky-700 px-6 py-3 font-medium text-white transition hover:bg-sky-800"
          >
            Let&apos;s Talk
          </Link>
        </section>
      </main>
    </>
  );
}
