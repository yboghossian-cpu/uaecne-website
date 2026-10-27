import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { getAdmin } from "@/lib/server/auth";
import { MEDIA_DIR, getDb } from "@/lib/server/db";

// Image upload for Admin › Media and the image pickers. Photos are rotated
// upright, resized to at most 2400px, and saved without their metadata
// (removes phone GPS location). PDFs are stored as-is.
const MAX_BYTES = 20 * 1024 * 1024;

function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

const safeName = (s: string) =>
  s
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50) || "file";

export async function POST(req: Request) {
  const db = getDb();
  if (!db || !MEDIA_DIR) return Response.json({ error: "Uploads are not available on this server." }, { status: 503 });
  if (!sameOrigin(req)) return Response.json({ error: "Bad origin" }, { status: 403 });
  if (!(await getAdmin())) return Response.json({ error: "Please sign in again." }, { status: 401 });

  const form = await req.formData();
  const files = form.getAll("file").filter((f): f is File => f instanceof File);
  if (!files.length) return Response.json({ error: "No file received." }, { status: 400 });

  const out: { id: number; url: string; name: string; width: number | null; height: number | null; alt: string }[] = [];
  const errors: string[] = [];
  const month = new Date().toISOString().slice(0, 7);
  fs.mkdirSync(path.join(MEDIA_DIR, month), { recursive: true });

  for (const file of files) {
    if (file.size > MAX_BYTES) {
      errors.push(`${file.name}: larger than 20 MB`);
      continue;
    }
    const buf = Buffer.from(await file.arrayBuffer());
    const id = crypto.randomBytes(3).toString("hex");
    let rel: string;
    let mime: string;
    let width: number | null = null;
    let height: number | null = null;
    let data: Buffer;
    try {
      if (file.type === "application/pdf" || /\.pdf$/i.test(file.name)) {
        if (buf.subarray(0, 5).toString() !== "%PDF-") throw new Error("not a PDF");
        rel = `${month}/${safeName(file.name)}-${id}.pdf`;
        mime = "application/pdf";
        data = buf;
      } else {
        const img = sharp(buf, { failOn: "error" }).rotate();
        const meta = await img.metadata();
        if (!meta.format || !["jpeg", "png", "webp", "gif", "heif", "tiff", "avif"].includes(meta.format)) {
          throw new Error("not a supported image");
        }
        const keepPng = meta.format === "png" && meta.hasAlpha;
        const pipeline = img.resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true });
        data = keepPng
          ? await pipeline.png({ compressionLevel: 9 }).toBuffer()
          : await pipeline.jpeg({ quality: 84, mozjpeg: true }).toBuffer();
        const outMeta = await sharp(data).metadata();
        width = outMeta.width ?? null;
        height = outMeta.height ?? null;
        rel = `${month}/${safeName(file.name)}-${id}.${keepPng ? "png" : "jpg"}`;
        mime = keepPng ? "image/png" : "image/jpeg";
      }
    } catch (e) {
      errors.push(`${file.name}: ${e instanceof Error ? e.message : "could not read"}`);
      continue;
    }
    fs.writeFileSync(path.join(MEDIA_DIR, rel), data);
    const info = db
      .prepare("INSERT INTO media (file, original_name, mime, width, height, size) VALUES (?, ?, ?, ?, ?, ?)")
      .run(rel, file.name.slice(0, 200), mime, width, height, data.length);
    out.push({ id: Number(info.lastInsertRowid), url: `/media/${rel}`, name: file.name, width, height, alt: "" });
  }
  return Response.json({ files: out, errors });
}
