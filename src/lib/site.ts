import type { Metadata } from "next";

export const SITE_NAME = "Union of the Armenian Evangelical Churches in the Near East";

// Absolute origin used for canonical URLs, sitemap entries and social-preview
// image links. Resolution order:
//   1. SITE_URL — set explicitly when self-hosting (e.g. the planned VPS).
//   2. VERCEL_PROJECT_PRODUCTION_URL — injected by Vercel; becomes the real
//      domain automatically once uaecne.org is attached to the project, so
//      previews never point at the old AWS site before cutover.
//   3. localhost — local `next build` / `next start`.
export const SITE_URL =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// Default share image: the homepage hero photo (real GA photograph).
export const DEFAULT_SHARE_IMAGE = "/hero-general-assembly.jpg";

// Social crawlers (WhatsApp in particular) drop previews for large images,
// and many hero photos here are 400–700 KB. Route the share image through
// Next's built-in image optimizer at 1200px instead of linking the original.
export function shareImage(src: string): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=1200&q=75`;
}

// Meta description from text that already appears verbatim on the page —
// never new copy. Keeps whole sentences while they fit in ~160 characters;
// otherwise cuts at a word boundary.
export function summarize(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  // Split into sentences, re-joining pieces that only ended on a title or
  // abbreviation ("St.", "Rev.", "Dr.") so a name is never cut in half.
  const raw = clean.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [];
  const sentences: string[] = [];
  for (const piece of raw) {
    const prev = sentences[sentences.length - 1];
    if (prev && /\b(St|Sts|Rev|Revs|Mr|Mrs|Ms|Dr|Prof|Mt|No|vs|ca)\.\s*$/.test(prev)) {
      sentences[sentences.length - 1] = prev + piece;
    } else {
      sentences.push(piece);
    }
  }
  let out = "";
  for (const s of sentences) {
    if ((out + s).trim().length > max) break;
    out += s;
  }
  if (out.trim()) return out.trim();
  // First sentence alone is too long: end at the last clause break if it
  // keeps most of the text, otherwise at a word boundary.
  const cut = clean.slice(0, max - 1);
  const clause = Math.max(cut.lastIndexOf(", "), cut.lastIndexOf("; "), cut.lastIndexOf(" — "));
  const end = clause > max * 0.55 ? clause : cut.lastIndexOf(" ");
  return `${cut.slice(0, end).replace(/[,;—\s]+$/, "")}…`;
}

export function pageMetadata(opts: {
  title: string;
  description?: string;
  image?: string | null;
  path: string;
}): Metadata {
  const image = shareImage(opts.image ?? DEFAULT_SHARE_IMAGE);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      title: opts.title,
      description: opts.description,
      url: opts.path,
      images: [{ url: image, width: 1200 }],
    },
    twitter: { card: "summary_large_image" },
  };
}
