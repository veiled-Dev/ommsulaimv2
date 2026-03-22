import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;

function extensionFromFile(file: File): string {
  const mime = file.type.toLowerCase();
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  if (mime === "image/svg+xml") return "svg";

  const name = file.name.toLowerCase();
  const ext = name.includes(".") ? name.split(".").pop() : "";
  return ext || "jpg";
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  if (!isAdminAuthenticated(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const entry = form.get("file");

  if (!(entry instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (!entry.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed." }, { status: 400 });
  }

  if (entry.size > MAX_UPLOAD_SIZE) {
    return NextResponse.json({ error: "Image is too large. Max 5MB." }, { status: 400 });
  }

  const ext = extensionFromFile(entry);
  const filename = `${Date.now()}-${randomUUID()}.${ext}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadsDir, filename);

  await fs.mkdir(uploadsDir, { recursive: true });

  const bytes = Buffer.from(await entry.arrayBuffer());
  await fs.writeFile(filePath, bytes);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
