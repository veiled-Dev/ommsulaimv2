import { createHash, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "ommsulaim_admin";

type CookieReader = {
  get(name: string): { value: string } | undefined;
};

function getAdminPassword(): string {
  return (process.env.ADMIN_PASSWORD ?? "").trim();
}

function hashToken(password: string): string {
  return createHash("sha256").update(`ommsulaim:${password}`).digest("hex");
}

export function validateAdminPassword(input: string): boolean {
  const expected = getAdminPassword();
  const provided = input.trim();
  if (!expected || !provided) return false;

  const expectedHash = Buffer.from(hashToken(expected));
  const providedHash = Buffer.from(hashToken(provided));

  if (expectedHash.length !== providedHash.length) return false;
  return timingSafeEqual(expectedHash, providedHash);
}

export function getAdminSessionToken(): string {
  const password = getAdminPassword();
  return password ? hashToken(password) : "";
}

export function isAdminCookieValue(value: string | undefined): boolean {
  const token = getAdminSessionToken();
  if (!token || !value) return false;

  const expected = Buffer.from(token);
  const provided = Buffer.from(value);
  if (expected.length !== provided.length) return false;
  return timingSafeEqual(expected, provided);
}

export function isAdminAuthenticated(cookiesStore: CookieReader): boolean {
  const cookieValue = cookiesStore.get(ADMIN_COOKIE_NAME)?.value;
  return isAdminCookieValue(cookieValue);
}
