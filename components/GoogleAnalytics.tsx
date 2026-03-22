"use client";

import { useEffect } from "react";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

const CONSENT_KEY = "ommsulaim:analytics-consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

type Props = {
  gaId: string;
};

export default function GoogleAnalytics({ gaId }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isConsentGranted, setIsConsentGranted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncConsent = () => {
      setIsConsentGranted(window.localStorage.getItem(CONSENT_KEY) === "granted");
    };

    syncConsent();
    window.addEventListener("storage", syncConsent);
    window.addEventListener("ommsulaim:analytics-consent-changed", syncConsent);

    return () => {
      window.removeEventListener("storage", syncConsent);
      window.removeEventListener("ommsulaim:analytics-consent-changed", syncConsent);
    };
  }, []);

  useEffect(() => {
    if (
      !gaId ||
      !isConsentGranted ||
      typeof window === "undefined" ||
      typeof window.gtag !== "function"
    ) {
      return;
    }

    const query = searchParams?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [gaId, isConsentGranted, pathname, searchParams]);

  if (!isConsentGranted) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}