import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  getAdminSessionToken,
  validateAdminPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");

  if (!validateAdminPassword(password)) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", req.url), 303);
  }

  const token = getAdminSessionToken();
  const response = NextResponse.redirect(new URL("/admin", req.url), 303);
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
