"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <nav className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center" aria-label="OmmSulaim home">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 items-center text-slate-800 font-medium">
          <li><Link href="/" className="hover:text-sky-600 transition-colors duration-300">Home</Link></li>
          <li><Link href="/about" className="hover:text-sky-600 transition-colors duration-300">About</Link></li>
          <li><Link href="/services" className="hover:text-sky-600 transition-colors duration-300">Services</Link></li>
          <li className="relative group">
            <Link href="/coming-soon" className="hover:text-amber-500 cursor-pointer transition-colors duration-300">
              Shop
            </Link>
            <ul className="absolute left-0 mt-2 w-48 rounded-md bg-white/95 shadow-lg ring-1 ring-sky-100 opacity-0 invisible transition-all duration-300 group-hover:visible group-hover:opacity-100">
              <li><Link href="/coming-soon" className="block px-4 py-2 hover:bg-sky-50">Digital Products</Link></li>
              <li><Link href="/coming-soon" className="block px-4 py-2 hover:bg-sky-50">Clothing</Link></li>
              <li><Link href="/coming-soon" className="block px-4 py-2 hover:bg-sky-50">Accessories</Link></li>
            </ul>
          </li>
          <li><Link href="/academy" className="hover:text-sky-600 transition-colors duration-300">Academy</Link></li>
          <li><Link href="/blog" className="hover:text-sky-600 transition-colors duration-300">Blog</Link></li>
          <li><Link href="/contact" className="hover:text-sky-600 transition-colors duration-300">Contact</Link></li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-sky-700 transition-colors hover:text-amber-500"
          onClick={toggleMobile}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-sky-100 bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 p-6 font-medium text-slate-800">
            <li><Link href="/" onClick={toggleMobile}>Home</Link></li>
            <li><Link href="/about" onClick={toggleMobile}>About</Link></li>
            <li><Link href="/services" onClick={toggleMobile}>Services</Link></li>
            <li><Link href="/coming-soon" onClick={toggleMobile}>Digital Products</Link></li>
            <li><Link href="/coming-soon" onClick={toggleMobile}>Clothing</Link></li>
            <li><Link href="/coming-soon" onClick={toggleMobile}>Accessories</Link></li>
            <li><Link href="/academy" onClick={toggleMobile}>Academy</Link></li>
            <li><Link href="/blog" onClick={toggleMobile}>Blog</Link></li>
            <li><Link href="/contact" onClick={toggleMobile}>Contact</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}