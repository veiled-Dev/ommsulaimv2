import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <h2 className="text-lg font-bold text-white">OmmSulaim</h2>
          <p className="mt-4 leading-7 text-slate-400">
            Practical education, digital resources, and website solutions for learning and growing online.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-300">Explore</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/academy" className="hover:text-white">Academy</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-300">Resources</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/shop" className="hover:text-white">Digital Shop</Link></li>
            <li><Link href="/shop/digital-products" className="hover:text-white">Digital Products</Link></li>
            <li><Link href="/academy/quran-memorization" className="hover:text-white">Free Hifz Planner</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-300">Get in touch</h3>
          <div className="mt-4 space-y-3 text-sm">
            <p><a href="https://wa.me/2349160341006" className="hover:text-white">WhatsApp: +234 916 034 1006</a></p>
            <p><a href="mailto:support@ommsulaim.com" className="hover:text-white">support@ommsulaim.com</a></p>
            <Link href="/contact" className="inline-flex font-semibold text-amber-300 hover:text-amber-200">Contact OmmSulaim →</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© 2026 OmmSulaim Digital Service Ltd. All rights reserved.</p>
          <p>
            <Link href="/terms" className="hover:text-slate-300">Terms</Link>
            <span className="mx-2">·</span>
            <Link href="/privacy-policy" className="hover:text-slate-300">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
