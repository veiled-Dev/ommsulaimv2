import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: {
    default: "OmmSulaim Digital Service Ltd | Education, Digital Resources & Web Solutions",
    template: "%s | OmmSulaim Digital Service Ltd",
  },
  description: "Qur’an and Arabic learning, practical digital resources, and custom web solutions for educators, small businesses, and organisations.",
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
        {gaId && (
          <Suspense fallback={null}>
            <GoogleAnalytics gaId={gaId} />
          </Suspense>
        )}
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
