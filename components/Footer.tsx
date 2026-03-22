import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto grid gap-8 px-6 py-16 text-gray-700 md:grid-cols-4">
        {/* About */}
        <div>
          <h3 className="font-bold text-lg mb-4">OmmSulaim</h3>
          <p className="text-gray-600">
            We provide digital learning, website design, and e-commerce solutions to empower learners and businesses.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="transition-colors hover:text-sky-700">Home</Link></li>
            <li><Link href="/about" className="transition-colors hover:text-sky-700">About</Link></li>
            <li><Link href="/services" className="transition-colors hover:text-sky-700">Services</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-sky-700">Contact</Link></li>
          </ul>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-bold text-lg mb-4">Shop</h3>
          <ul className="space-y-2">
            <li><Link href="/coming-soon" className="transition-colors hover:text-sky-700">Digital Products</Link></li>
            <li><Link href="/coming-soon" className="transition-colors hover:text-sky-700">Clothing</Link></li>
            <li><Link href="/coming-soon" className="transition-colors hover:text-sky-700">Accessories</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-lg mb-4">Contact</h3>
          <p>WhatsApp: <a href="https://wa.me/2349160341006" className="text-sky-700 hover:text-amber-700 hover:underline">+2349160341006</a></p>
          <p>Email: <a href="mailto:support@ommsulaim.com" className="text-sky-700 hover:text-amber-700 hover:underline">support@ommsulaim.com</a></p>
        </div>
      </div>

      <div className="mt-8 border-t border-slate-200 py-4 text-center text-sm text-gray-600">
        © 2026 OmmSulaim Digital Services Ltd. All rights reserved.
      </div>
    </footer>
  );
}