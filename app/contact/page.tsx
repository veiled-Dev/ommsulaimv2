import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-24">
        {/* Hero / Title */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Contact Us
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            We’re here to answer your questions and guide you. Reach out via WhatsApp, email, or the form below.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mt-24 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Get in Touch</h2>
          <p className="mt-4 text-gray-600">
            WhatsApp: <a href="https://wa.me/2349160341006" className="font-medium text-sky-700">+2349160341006</a> <br />
            Email: <a href="mailto:support@ommsulaim.com" className="font-medium text-sky-700">support@ommsulaim.com</a>
          </p>
        </section>

        {/* Contact Form */}
        <section className="mt-16 max-w-3xl mx-auto">
          <form className="grid gap-6" action="/api/contact" method="post">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                name="name"
                type="text"
                required
                placeholder="Your Name"
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-sky-600 focus:ring-sky-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-sky-600 focus:ring-sky-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                name="subject"
                type="text"
                required
                placeholder="Subject"
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-sky-600 focus:ring-sky-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                required
                placeholder="Your message"
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-sky-600 focus:ring-sky-600"
                rows={5}
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-sky-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-800"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* CTA */}
        <section className="mt-24 text-center">
          <h2 className="text-3xl font-semibold">Prefer Instant Messaging?</h2>
          <p className="mt-4 text-gray-600">
            Message us on WhatsApp for quick responses.
          </p>
          <div className="mt-6">
            <a
              href="https://wa.me/2349060341006"
              className="rounded-lg border border-amber-400 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-amber-50"
            >
              WhatsApp Us
            </a>
          </div>
        </section>
      </main>
    </>
  );
}