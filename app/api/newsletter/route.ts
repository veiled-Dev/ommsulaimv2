import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type NewsletterSubscriber = {
  email: string;
  subscribedAt: string;
};

const NEWSLETTER_FILE = path.join(process.cwd(), "newsletter.json");

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function withParam(url: URL, key: string, value: string) {
  url.searchParams.set(key, value);
  return url;
}

async function readSubscribers(): Promise<NewsletterSubscriber[]> {
  try {
    const raw = await fs.readFile(NEWSLETTER_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((row) => {
        if (!row || typeof row !== "object") return null;
        const email = typeof row.email === "string" ? row.email.trim().toLowerCase() : "";
        const subscribedAt = typeof row.subscribedAt === "string" ? row.subscribedAt : "";
        if (!email) return null;
        return {
          email,
          subscribedAt: subscribedAt || new Date().toISOString(),
        };
      })
      .filter((row): row is NewsletterSubscriber => !!row);
  } catch {
    return [];
  }
}

async function writeSubscribers(subscribers: NewsletterSubscriber[]) {
  await fs.writeFile(NEWSLETTER_FILE, `${JSON.stringify(subscribers, null, 2)}\n`, "utf8");
}

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const redirectToRaw = String(form.get("redirectTo") ?? "/blog").trim();
  const redirectTo = redirectToRaw.startsWith("/") ? redirectToRaw : "/blog";
  const redirectUrl = new URL(redirectTo, req.url);

  if (!isValidEmail(email)) {
    return NextResponse.redirect(withParam(redirectUrl, "error", "invalid_email"), 303);
  }

  const subscribers = await readSubscribers();
  const exists = subscribers.some((entry) => entry.email === email);

  if (!exists) {
    subscribers.unshift({
      email,
      subscribedAt: new Date().toISOString(),
    });
    await writeSubscribers(subscribers);
  }

  return NextResponse.redirect(withParam(redirectUrl, "subscribed", "1"), 303);
}
