"use server";

import fs from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clientIp, createSession, destroySession, hashPassword, requireAdmin, verifyPassword } from "@/lib/server/auth";
import { MEDIA_DIR, getDb, rateLimit, requireDb } from "@/lib/server/db";
import { baselineDoc, baselineSamples, isBuiltIn, type Collection } from "@/lib/server/content";
import { saveSettings as storeSettings, type SiteSettings } from "@/lib/server/settings";
import { blankFor, checkShape, inferShape } from "@/lib/admin/shape";
import { mailConfigured, notifyRecipients, sendMail } from "@/lib/server/mail";

export type ActionResult = { ok: boolean; message: string };

// ---------------- auth ----------------

export async function login(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  const db = getDb();
  if (!db) return { ok: false, message: "The admin portal is not set up on this server." };
  const ip = await clientIp();
  if (!rateLimit("login", ip, 8, 900)) {
    return { ok: false, message: "Too many attempts. Wait 15 minutes and try again." };
  }
  const username = String(fd.get("username") ?? "").trim();
  const password = String(fd.get("password") ?? "");
  const row = db.prepare("SELECT id, pass_hash FROM admins WHERE username = ?").get(username) as
    { id: number; pass_hash: string } | undefined;
  // Always run one hash so timing doesn't reveal whether the user exists.
  const ok = row ? verifyPassword(password, row.pass_hash) : (verifyPassword(password, hashPassword("x")), false);
  if (!row || !ok) return { ok: false, message: "Wrong username or password." };
  await createSession(row.id);
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

export async function changePassword(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  const db = requireDb();
  const current = String(fd.get("current") ?? "");
  const next = String(fd.get("next") ?? "");
  const again = String(fd.get("again") ?? "");
  const row = db.prepare("SELECT pass_hash FROM admins WHERE id = ?").get(admin.id) as { pass_hash: string };
  if (!verifyPassword(current, row.pass_hash)) return { ok: false, message: "Your current password is wrong." };
  if (next.length < 12) return { ok: false, message: "Use at least 12 characters." };
  if (next !== again) return { ok: false, message: "The new passwords do not match." };
  db.prepare("UPDATE admins SET pass_hash = ? WHERE id = ?").run(hashPassword(next), admin.id);
  db.prepare("DELETE FROM sessions WHERE admin_id = ?").run(admin.id);
  await createSession(admin.id);
  return { ok: true, message: "Password changed. Other devices have been signed out." };
}

// ---------------- settings ----------------

const lines = (v: FormDataEntryValue | null) =>
  String(v ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

const url = (v: FormDataEntryValue | null) => {
  const s = String(v ?? "").trim();
  if (!s) return "";
  if (s.startsWith("/") || /^https?:\/\//i.test(s)) return s;
  return `https://${s}`;
};

export async function saveSettingsAction(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  await requireAdmin();
  const s: SiteSettings = {
    contact: {
      addressEn: lines(fd.get("addressEn")),
      addressHy: lines(fd.get("addressHy")),
      email: String(fd.get("email") ?? "").trim(),
      phones: lines(fd.get("phones")),
    },
    social: {
      facebook: url(fd.get("facebook")),
      youtube: url(fd.get("youtube")),
      instagram: url(fd.get("instagram")),
      x: url(fd.get("x")),
    },
    donateUrl: url(fd.get("donateUrl")),
    announcement: {
      enabled: fd.get("announcementEnabled") === "on",
      text: String(fd.get("announcementText") ?? "").trim(),
      linkLabel: String(fd.get("announcementLinkLabel") ?? "").trim(),
      linkUrl: url(fd.get("announcementLinkUrl")),
    },
    seo: { defaultDescription: String(fd.get("defaultDescription") ?? "").trim() },
    notifications: { emails: lines(fd.get("notifyEmails")) },
  };
  storeSettings(s);
  revalidatePath("/", "layout");
  return { ok: true, message: "Settings saved — the website is updated." };
}

export async function sendTestEmail(): Promise<ActionResult> {
  await requireAdmin();
  if (!mailConfigured())
    return { ok: false, message: "Email is not configured on the server (SMTP_USER / SMTP_PASS)." };
  const res = await sendMail({
    subject: "UAECNE website — test email",
    text: "This is a test email from the UAECNE website admin. Form notifications will arrive like this.",
  });
  return res.ok
    ? { ok: true, message: `Test email sent to ${notifyRecipients().join(", ")}.` }
    : { ok: false, message: `Could not send: ${res.error}` };
}

// ---------------- churches & schools ----------------

type Kind = "church" | "school";
const dirOf = (k: Kind): Collection => (k === "church" ? "church-dir" : "school-dir");
const pageOf = (k: Kind): Collection => (k === "church" ? "church-page" : "school-page");
const base = (k: Kind) => (k === "church" ? "/churches" : "/schools");

function revalidateEntry(kind: Kind, slug: string) {
  revalidatePath(`${base(kind)}/${slug}`);
  revalidatePath(base(kind));
  revalidatePath("/sitemap.xml");
}

function writeDoc(collection: Collection, key: string, data: unknown, note: string) {
  const db = requireDb();
  const prev = db.prepare("SELECT data FROM docs WHERE collection = ? AND key = ?").get(collection, key) as
    { data: string } | undefined;
  const prevData = prev?.data ?? JSON.stringify(baselineDoc(collection, key));
  db.transaction(() => {
    db.prepare("INSERT INTO revisions (collection, key, data, note) VALUES (?, ?, ?, ?)").run(
      collection,
      key,
      prevData,
      note,
    );
    db.prepare(
      `INSERT INTO docs (collection, key, data, updated_at) VALUES (?, ?, ?, datetime('now'))
       ON CONFLICT(collection, key) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
    ).run(collection, key, JSON.stringify(data));
    // keep the 30 most recent revisions per page
    db.prepare(
      `DELETE FROM revisions WHERE collection = ? AND key = ? AND id NOT IN
       (SELECT id FROM revisions WHERE collection = ? AND key = ? ORDER BY id DESC LIMIT 30)`,
    ).run(collection, key, collection, key);
  })();
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseKind(v: unknown): Kind {
  if (v !== "church" && v !== "school") throw new Error("Bad kind");
  return v;
}

export async function saveDoc(kindIn: string, part: "dir" | "page", slug: string, json: string): Promise<ActionResult> {
  await requireAdmin();
  const kind = parseKind(kindIn);
  if (!SLUG_RE.test(slug)) return { ok: false, message: "Invalid page address." };
  if (json.length > 2_000_000) return { ok: false, message: "This page is too large to save." };
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return { ok: false, message: "Could not read the edited page." };
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return { ok: false, message: "Could not read the edited page." };
  }
  const collection = part === "dir" ? dirOf(kind) : pageOf(kind);
  const err = checkShape(data, inferShape(baselineSamples(collection)));
  if (err) return { ok: false, message: `Not saved: ${err}.` };
  if (part === "dir") {
    const d = data as Record<string, unknown>;
    d.slug = slug; // the page address never changes from the editor
    if (!String(d.name ?? "").trim()) return { ok: false, message: "The name cannot be empty." };
  }
  writeDoc(collection, slug, data, "Edited");
  revalidateEntry(kind, slug);
  return { ok: true, message: "Saved — the live page is updated." };
}

export async function resetDoc(kindIn: string, part: "dir" | "page", slug: string): Promise<ActionResult> {
  await requireAdmin();
  const kind = parseKind(kindIn);
  if (!isBuiltIn(kind, slug)) return { ok: false, message: "This page has no original version to go back to." };
  const collection = part === "dir" ? dirOf(kind) : pageOf(kind);
  const db = requireDb();
  const prev = db.prepare("SELECT data FROM docs WHERE collection = ? AND key = ?").get(collection, slug) as
    { data: string } | undefined;
  if (prev) {
    db.prepare("INSERT INTO revisions (collection, key, data, note) VALUES (?, ?, ?, ?)").run(
      collection,
      slug,
      prev.data,
      "Before reset to original",
    );
    db.prepare("DELETE FROM docs WHERE collection = ? AND key = ?").run(collection, slug);
  }
  revalidateEntry(kind, slug);
  return { ok: true, message: "Reset to the original version." };
}

export async function restoreRevision(id: number): Promise<ActionResult> {
  await requireAdmin();
  const db = requireDb();
  const rev = db.prepare("SELECT collection, key, data FROM revisions WHERE id = ?").get(id) as
    { collection: Collection; key: string; data: string | null } | undefined;
  if (!rev || !rev.data || rev.data === "null") return { ok: false, message: "That version cannot be restored." };
  writeDoc(rev.collection, rev.key, JSON.parse(rev.data), `Restored version #${id}`);
  const kind: Kind = rev.collection.startsWith("church") ? "church" : "school";
  revalidateEntry(kind, rev.key);
  return { ok: true, message: "Earlier version restored." };
}

export async function createEntry(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  await requireAdmin();
  const kind = parseKind(fd.get("kind"));
  const name = String(fd.get("name") ?? "").trim();
  const country = String(fd.get("country") ?? "").trim();
  const slug = String(fd.get("slug") ?? "").trim();
  if (!name || !country) return { ok: false, message: "Enter a name and a country." };
  if (!SLUG_RE.test(slug))
    return { ok: false, message: "The address may only use lowercase letters, numbers and dashes." };
  const db = requireDb();
  const exists =
    isBuiltIn(kind, slug) || db.prepare("SELECT 1 FROM docs WHERE collection = ? AND key = ?").get(dirOf(kind), slug);
  if (exists) return { ok: false, message: "That page address is already used." };
  const entry =
    kind === "church"
      ? {
          id: `custom-${slug}`,
          country,
          name,
          pastor: "",
          serviceTime: "",
          address: "",
          phone: "",
          email: "",
          estYear: "",
          secretary: "",
          isNew: false,
          slug,
          photo: null,
          emblem: null,
        }
      : { id: `custom-${slug}`, country, name, slug, photo: null, emblem: null };
  writeDoc(dirOf(kind), slug, entry, "Created");
  // School pages only exist with page content, so a new school starts with
  // an empty page (every section shows its "pending" placeholder).
  if (kind === "school") {
    const blank = blankFor(inferShape(baselineSamples(pageOf(kind)))) as Record<string, unknown>;
    writeDoc(pageOf(kind), slug, { ...blank, slug }, "Created");
  }
  revalidateEntry(kind, slug);
  redirect(`/admin/${kind === "church" ? "churches" : "schools"}/${slug}`);
}

export async function createPageProfile(kindIn: string, slug: string, json: string): Promise<ActionResult> {
  // Starts a full page profile (built from a blank template on the client).
  return saveDoc(kindIn, "page", slug, json);
}

export async function deleteEntry(kindIn: string, slug: string): Promise<ActionResult> {
  await requireAdmin();
  const kind = parseKind(kindIn);
  if (isBuiltIn(kind, slug)) return { ok: false, message: "Built-in pages cannot be deleted." };
  const db = requireDb();
  db.prepare("DELETE FROM docs WHERE collection IN (?, ?) AND key = ?").run(dirOf(kind), pageOf(kind), slug);
  revalidateEntry(kind, slug);
  redirect(`/admin/${kind === "church" ? "churches" : "schools"}`);
}

// ---------------- news & events ----------------

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function revalidatePosts(slug?: string) {
  revalidatePath("/");
  revalidatePath("/news");
  if (slug) revalidatePath(`/news/${slug}`);
  revalidatePath("/sitemap.xml");
}

export async function savePost(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  await requireAdmin();
  const db = requireDb();
  const id = Number(fd.get("id") ?? 0);
  const kind = fd.get("kind") === "event" ? "event" : "news";
  const title = String(fd.get("title") ?? "").trim();
  if (!title) return { ok: false, message: "Enter a title." };
  const slug = slugify(String(fd.get("slug") ?? "") || title);
  if (!slug) return { ok: false, message: "Enter a page address (letters or numbers)." };
  const clash = db.prepare("SELECT id FROM posts WHERE slug = ? AND id != ?").get(slug, id);
  if (clash) return { ok: false, message: "Another post already uses that page address." };
  const date = String(fd.get("date") ?? "").trim() || new Date().toISOString().slice(0, 10);
  const opt = (k: string) => String(fd.get(k) ?? "").trim() || null;
  const row = {
    kind,
    slug,
    title,
    kicker: String(fd.get("kicker") ?? "").trim(),
    tag: String(fd.get("tag") ?? "").trim(),
    date,
    event_start: kind === "event" ? opt("event_start") : null,
    event_end: kind === "event" ? opt("event_end") : null,
    location: kind === "event" ? String(fd.get("location") ?? "").trim() : "",
    excerpt: String(fd.get("excerpt") ?? "").trim(),
    body: String(fd.get("body") ?? "")
      .replace(/\r\n/g, "\n")
      .trim(),
    cover: opt("cover"),
    cover_alt: String(fd.get("cover_alt") ?? "").trim(),
    link: opt("link"),
    featured: fd.get("featured") === "on" ? 1 : 0,
    published: fd.get("published") === "on" ? 1 : 0,
  };
  if (row.link && !row.link.startsWith("/") && !/^https?:\/\//.test(row.link)) row.link = `https://${row.link}`;
  let newId = id;
  const old = id ? (db.prepare("SELECT slug FROM posts WHERE id = ?").get(id) as { slug: string } | undefined) : null;
  if (id && old) {
    db.prepare(
      `UPDATE posts SET kind=@kind, slug=@slug, title=@title, kicker=@kicker, tag=@tag, date=@date,
       event_start=@event_start, event_end=@event_end, location=@location, excerpt=@excerpt, body=@body,
       cover=@cover, cover_alt=@cover_alt, link=@link, featured=@featured, published=@published,
       updated_at=datetime('now') WHERE id=@id`,
    ).run({ ...row, id });
  } else {
    newId = Number(
      db
        .prepare(
          `INSERT INTO posts (kind, slug, title, kicker, tag, date, event_start, event_end, location, excerpt, body, cover, cover_alt, link, featured, published)
           VALUES (@kind, @slug, @title, @kicker, @tag, @date, @event_start, @event_end, @location, @excerpt, @body, @cover, @cover_alt, @link, @featured, @published)`,
        )
        .run(row).lastInsertRowid,
    );
  }
  if (old && old.slug !== slug) revalidatePath(`/news/${old.slug}`);
  revalidatePosts(slug);
  if (!id) redirect(`/admin/news/${newId}?saved=1`);
  return { ok: true, message: row.published ? "Saved and published." : "Saved as a draft (not on the website)." };
}

export async function deletePost(id: number): Promise<void> {
  await requireAdmin();
  const db = requireDb();
  const row = db.prepare("SELECT slug FROM posts WHERE id = ?").get(id) as { slug: string } | undefined;
  db.prepare("DELETE FROM posts WHERE id = ?").run(id);
  revalidatePosts(row?.slug);
  redirect("/admin/news");
}

// ---------------- inbox ----------------

export async function setSubmissionStatus(id: number, status: "new" | "read" | "archived"): Promise<void> {
  await requireAdmin();
  requireDb().prepare("UPDATE submissions SET status = ? WHERE id = ?").run(status, id);
  revalidatePath("/admin", "layout");
}

export async function deleteSubmission(id: number): Promise<void> {
  await requireAdmin();
  requireDb().prepare("DELETE FROM submissions WHERE id = ?").run(id);
  redirect("/admin/inbox");
}

// ---------------- media ----------------

export type MediaItem = {
  url: string;
  name: string;
  width: number | null;
  height: number | null;
  alt: string;
  id?: number;
};

export async function listMedia(): Promise<{ uploads: MediaItem[]; site: MediaItem[] }> {
  await requireAdmin();
  const db = requireDb();
  const uploads = (
    db.prepare("SELECT id, file, original_name, width, height, alt FROM media ORDER BY id DESC").all() as {
      id: number;
      file: string;
      original_name: string;
      width: number | null;
      height: number | null;
      alt: string;
    }[]
  ).map((m) => ({
    id: m.id,
    url: `/media/${m.file}`,
    name: m.original_name,
    width: m.width,
    height: m.height,
    alt: m.alt,
  }));
  const pub = path.join(process.cwd(), "public");
  let site: MediaItem[] = [];
  try {
    site = fs
      .readdirSync(pub)
      .filter((f) => /\.(jpe?g|png|webp|gif|svg)$/i.test(f))
      .sort()
      .map((f) => ({ url: `/${f}`, name: f, width: null, height: null, alt: "" }));
  } catch {}
  return { uploads, site };
}

export async function updateMediaAlt(id: number, alt: string): Promise<void> {
  await requireAdmin();
  requireDb().prepare("UPDATE media SET alt = ? WHERE id = ?").run(alt.slice(0, 300), id);
}

export async function deleteMedia(id: number): Promise<ActionResult> {
  await requireAdmin();
  const db = requireDb();
  const row = db.prepare("SELECT file FROM media WHERE id = ?").get(id) as { file: string } | undefined;
  if (!row || !MEDIA_DIR) return { ok: false, message: "Not found." };
  const usedIn = findMediaUse(`/media/${row.file}`);
  if (usedIn.length)
    return { ok: false, message: `Still used on: ${usedIn.slice(0, 3).join(", ")}. Remove it there first.` };
  db.prepare("DELETE FROM media WHERE id = ?").run(id);
  try {
    fs.unlinkSync(path.join(MEDIA_DIR, row.file));
  } catch {}
  revalidatePath("/admin/media");
  return { ok: true, message: "Deleted." };
}

function findMediaUse(u: string): string[] {
  const db = requireDb();
  const out: string[] = [];
  const docs = db.prepare("SELECT collection, key FROM docs WHERE instr(data, ?) > 0").all(u) as {
    collection: string;
    key: string;
  }[];
  for (const d of docs) out.push(d.key);
  const posts = db.prepare("SELECT title FROM posts WHERE cover = ? OR instr(body, ?) > 0").all(u, u) as {
    title: string;
  }[];
  for (const p of posts) out.push(p.title);
  const settings = db.prepare("SELECT 1 FROM settings WHERE instr(value, ?) > 0").get(u);
  if (settings) out.push("Settings");
  return out;
}
