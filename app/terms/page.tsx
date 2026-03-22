import Navbar from "@/components/Navbar";

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-24">
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Terms & Conditions</h1>
          <p className="mt-4 text-gray-600">
            Please read these terms carefully before using OmmSulaim Digital Services Ltd website and services.
          </p>
        </section>

        <section className="mt-16 space-y-12 text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
            <p>By using our website and services, you agree to these terms and conditions.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Services Overview</h2>
            <p>We provide digital learning, web services, and online products. Access and usage of these services are subject to the terms outlined here.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">User Obligations</h2>
            <p>Users must provide accurate information, respect copyright and intellectual property, and use services responsibly.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Payments & Orders</h2>
            <p>All transactions are final for digital products. For physical products, shipping and returns policies apply as described in the Shop section.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Intellectual Property</h2>
            <p>All content on the website is owned by OmmSulaim Digital Services Ltd and protected by copyright laws. Unauthorized use is prohibited.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
            <p>We are not liable for indirect, incidental, or consequential damages arising from the use of our website or services.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Contact</h2>
            <p>For legal questions, contact us at <a href="mailto:info@ommsulaim.com" className="text-blue-600">info@ommsulaim.com</a>.</p>
          </div>
        </section>
      </main>
    </>
  );
}