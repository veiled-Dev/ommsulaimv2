import Link from "next/link";

type Props = { searchParams: Promise<{ status?: string; download?: string }> };

export default async function PaymentResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const success = params.status === "success";

  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">OmmSulaim Digital Shop</p>
      <h1 className="mt-3 text-4xl font-bold text-slate-950">{success ? "Payment successful" : "Payment could not be confirmed"}</h1>
      <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">
        {success ? "Thank you. Your payment has been verified." : "We could not confirm this payment. If you were charged, please contact us with your payment reference."}
      </p>
      {success && params.download && (
        <a href={`/api/shop/download?token=${encodeURIComponent(params.download)}`} className="mt-8 inline-flex rounded-xl bg-sky-700 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-800">
          Download your product
        </a>
      )}
      <div className="mt-6">
        <Link href="/shop" className="text-sm font-semibold text-sky-700 hover:text-amber-700">Back to the Shop →</Link>
      </div>
    </main>
  );
}
