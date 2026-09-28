"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Product = { id: string; title: string; description: string; price: string; currency: "NGN" | "USD" };

export default function CheckoutPage() {
  const params = useSearchParams();
  const productId = params.get("product") || "";
  const [product, setProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!productId) return;
    fetch(`/api/shop/product?id=${encodeURIComponent(productId)}`, { cache: "no-store" })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Product not found.");
        setProduct(data.product);
      })
      .catch((err) => setError(err.message));
  }, [productId]);

  async function startPayment(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/shop/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to start payment.");
      window.location.href = data.paymentLink;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start payment.");
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link href="/shop" className="text-sm font-semibold text-sky-700 hover:text-amber-700">← Back to Shop</Link>
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">Secure checkout</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">{product?.title || "Checkout"}</h1>
        {product && <><p className="mt-4 leading-7 text-slate-600">{product.description}</p><p className="mt-5 text-2xl font-bold text-slate-950">{product.currency === "USD" ? "$" : "₦"}{product.price}</p></>}
        <form onSubmit={startPayment} className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-slate-800">Email address
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
          </label>
          {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <button disabled={!product || busy} className="w-full rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800 disabled:opacity-60">
            {busy ? "Preparing payment…" : "Continue to payment"}
          </button>
        </form>
        <p className="mt-5 text-xs leading-5 text-slate-500">Your payment is processed through Flutterwave. OmmSulaim does not receive or store your card details.</p>
      </div>
    </main>
  );
}
