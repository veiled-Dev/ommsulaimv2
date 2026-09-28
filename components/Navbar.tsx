"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((open) => !open);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center" aria-label="OmmSulaim home">
          <div className="h-11 w-11 overflow-hidden rounded-full border border-amber-200 bg-white shadow-sm">
            <Image
              src="/logo.png"
              alt="OmmSulaim"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-7 text-sm font-medium text-slate-700 md:flex">
          <li><Link href="/" className="transition-colors hover:text-sky-700">Home</Link></li>
          <li><Link href="/about" className="hover:text-sky-700 transition-colors duration-300">About</Link></li>
          <li><Link href="/services" className="hover:text-sky-700 transition-colors duration-300">Services</Link></li>
          <li><Link href="/shop" className="hover:text-sky-700 transition-colors duration-300">Shop</Link></li>
          <li><Link href="/academy" className="hover:text-sky-700 transition-colors duration-300">Academy</Link></li>
          <li><Link href="/blog" className="hover:text-sky-700 transition-colors duration-300">Blog</Link></li>
          <li><Link href="/contact" className="hover:text-sky-700 transition-colors duration-300">Contact</Link></li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 hover:text-sky-700 md:hidden"
          onClick={toggleMobile}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white shadow-lg md:hidden">
          <ul className="flex flex-col gap-2 p-6 text-sm font-medium text-slate-800">
            <li><Link href="/" onClick={toggleMobile}>Home</Link></li>
            <li><Link href="/about" onClick={toggleMobile}>About</Link></li>
            <li><Link href="/services" onClick={toggleMobile}>Services</Link></li>
            <li><Link href="/shop" onClick={toggleMobile}>Shop</Link></li>
            <li><Link href="/academy" onClick={toggleMobile}>Academy</Link></li>
            <li><Link href="/blog" onClick={toggleMobile}>Blog</Link></li>
            <li><Link href="/contact" onClick={toggleMobile} className="mt-2 block rounded-lg bg-sky-700 px-3 py-2.5 text-center text-white hover:bg-sky-800">Contact</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}