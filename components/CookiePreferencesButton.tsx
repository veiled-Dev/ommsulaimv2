"use client";

export default function CookiePreferencesButton() {
  function openPreferences() {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new Event("ommsulaim:open-cookie-preferences"));
  }

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="hover:text-amber-700"
    >
      Cookie Preferences
    </button>
  );
}