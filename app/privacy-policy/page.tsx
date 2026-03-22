import Navbar from "@/components/Navbar";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-24">
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-gray-600">
            Learn how OmmSulaim Digital Services Ltd collects, uses, and protects your information.
          </p>
        </section>

        <section className="mt-16 space-y-12 text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
            <p>OmmSulaim Digital Services Ltd respects your privacy and is committed to protecting your personal information. This policy explains how we handle your data.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
            <p>We may collect personal information such as your name, email, and contact details when you use our website or services.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
            <p>Your information is used to provide services, communicate with you, improve our offerings, and ensure a smooth user experience.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Cookies & Tracking</h2>
            <p>Our website may use cookies to enhance user experience and track usage patterns.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Security</h2>
            <p>We take measures to protect your personal data, but we cannot guarantee absolute security.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p>If you have questions about this privacy policy, contact us at <a href="mailto:info@ommsulaim.com" className="text-blue-600">info@ommsulaim.com</a>.</p>
          </div>
        </section>
      </main>
    </>
  );
}