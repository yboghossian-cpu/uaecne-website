import fs from "node:fs";
import path from "node:path";
import { MEDIA_DIR } from "@/lib/server/db";

// Serves images uploaded from Admin › Media (stored outside the build, in
// UAECNE_DATA_DIR/media, so they survive redeploys and are backed up).
const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
};

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  if (!MEDIA_DIR) return new Response("Not found", { status: 404 });
  const { path: parts } = await params;
  const file = path.resolve(MEDIA_DIR, ...parts);
  if (!file.startsWith(MEDIA_DIR + path.sep)) return new Response("Not found", { status: 404 });
  const type = TYPES[path.extname(file).toLowerCase()];
  if (!type) return new Response("Not found", { status: 404 });
  let data: Buffer;
  try {
    data = await fs.promises.readFile(file);
  } catch {
    return new Response("Not found", { status: 404 });
  }
  return new Response(new Uint8Array(data), {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
