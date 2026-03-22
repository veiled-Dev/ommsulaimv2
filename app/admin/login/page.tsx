import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isAdminAuthenticated } from "@/lib/admin-auth";

type Props = {
  searchParams: Promise<{ error?: string | string[] }>;
};

function pick(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminLoginPage({ searchParams }: Props) {
  const cookieStore = await cookies();
  if (isAdminAuthenticated(cookieStore)) {
    redirect("/admin");
  }

  const params = await searchParams;
  const error = pick(params.error);

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-6 py-16">
      <section className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">Only authorized owner access is allowed.</p>

        {error === "invalid" && (
          <p className="mt-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            Invalid password.
          </p>
        )}

        <form action="/api/admin/login" method="post" className="mt-5 space-y-3">
          <input
            type="password"
            name="password"
            required
            placeholder="Enter admin password"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800"
          >
            Log in
          </button>
        </form>

        <Link href="/" className="mt-4 inline-block text-sm font-medium text-sky-700 hover:text-amber-700">
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}
