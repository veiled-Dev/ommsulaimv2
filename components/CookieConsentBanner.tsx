"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "ommsulaim:analytics-consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const current = window.localStorage.getItem(CONSENT_KEY);
    setVisible(current !== "granted" && current !== "denied");

    const openPreferences = () => setVisible(true);
    window.addEventListener("ommsulaim:open-cookie-preferences", openPreferences);

    return () => {
      window.removeEventListener("ommsulaim:open-cookie-preferences", openPreferences);
    };
  }, []);

  function setConsent(value: "granted" | "denied") {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event("ommsulaim:analytics-consent-changed"));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-700">
          We use analytics cookies to understand site usage and improve your experience.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setConsent("denied")}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => setConsent("granted")}
            className="rounded-lg bg-sky-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-800"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}