import Link from "next/link";
import CheckoutForm from "@/components/shop/CheckoutForm";
import { getShopProductById } from "@/lib/shop";

type Props = { searchParams: Promise<{ product?: string }> };

export default async function CheckoutPage({ searchParams }: Props) {
  const params = await searchParams;
  const product = params.product ? await getShopProductById(params.product) : null;

  if (!product || product.access !== "paid") {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-slate-950">Product not found</h1>
        <p className="mt-4 text-slate-600">This digital product is unavailable.</p>
        <Link href="/shop" className="mt-6 inline-block font-semibold text-sky-700">Back to Shop →</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link href="/shop" className="text-sm font-semibold text-sky-700 hover:text-amber-700">← Back to Shop</Link>
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">Secure checkout</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">{product.title}</h1>
        <p className="mt-4 leading-7 text-slate-600">{product.description}</p>
        <p className="mt-5 text-2xl font-bold text-slate-950">{product.currency === "USD" ? "$" : "₦"}{product.price}</p>
        <CheckoutForm productId={product.id} />
        <p className="mt-5 text-xs leading-5 text-slate-500">Your payment is processed through Flutterwave. OmmSulaim does not receive or store your card details.</p>
      </div>
    </main>
  );
}
