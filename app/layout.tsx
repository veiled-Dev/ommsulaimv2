import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";

export const metadata: Metadata = {
  title: "OmmSulaim Digital Services Ltd",
  description: "Faith-centred education and digital solutions",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-slate-50 text-slate-900 antialiased"
      >
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {gaId && <CookieConsentBanner />}
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>

          <footer className="border-t border-slate-200 bg-white px-6 py-6 text-center text-sm text-slate-800">
            <p>© 2025 OmmSulaim Academy™ | All Rights Reserved</p>
            <p className="mt-1">
              <Link href="/terms" className="hover:text-amber-700">
                Terms
              </Link>
              <span className="mx-2">|</span>
              <Link href="/privacy-policy" className="hover:text-amber-700">
                Privacy Policy
              </Link>
              {gaId && (
                <>
                  <span className="mx-2">|</span>
                  <CookiePreferencesButton />
                </>
              )}
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
