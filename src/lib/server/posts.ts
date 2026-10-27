import "server-only";
import { getDb } from "./db";

export type PostKind = "news" | "event";

export type Post = {
  id: number;
  kind: PostKind;
  slug: string;
  title: string;
  kicker: string;
  tag: string;
  date: string; // YYYY-MM-DD (publication date)
  event_start: string | null; // YYYY-MM-DDTHH:mm (events only)
  event_end: string | null;
  location: string;
  excerpt: string;
  body: string;
  cover: string | null;
  cover_alt: string;
  link: string | null; // optional: card opens this page instead of /news/<slug>
  featured: number;
  published: number;
  created_at: string;
  updated_at: string;
};

/** The homepage's existing "Latest Updates" feature, verbatim — seeded as the
 *  first post so the homepage is unchanged until a new post is published. */
const SEED: Omit<Post, "id" | "created_at" | "updated_at"> = {
  kind: "news",
  slug: "79th-general-assembly",
  title: "A Milestone Gathering in Beirut",
  kicker: "June 2026 · 79th General Assembly",
  tag: "General Assembly · Beirut",
  date: "2026-06-22",
  event_start: null,
  event_end: null,
  location: "",
  excerpt:
    "Held on June 21–22, 2026, in Beirut, the 79th General Assembly of the UAECNE marked the church’s 180th anniversary under the theme “Freedom of Conscience and Responsible Faith.” Forty voting members convened in person and online to review reports on the resilience of the Union’s ministries, schools, and finances — closing with committee elections, a memorial for past leaders, and a Holy Communion service.",
  body: "",
  cover: "/news-general-assembly.jpg",
  cover_alt: "Delegates of the 79th General Assembly gathered at the First Armenian Evangelical Church",
  link: "/resource-center/news/79th-general-assembly",
  featured: 1,
  published: 1,
};

function ensureSeeded() {
  const db = getDb();
  if (!db) return;
  const done = db.prepare("SELECT 1 FROM settings WHERE key = 'posts_seeded'").get();
  if (done) return;
  db.transaction(() => {
    const { n } = db.prepare("SELECT COUNT(*) AS n FROM posts").get() as { n: number };
    if (n === 0) {
      db.prepare(
        `INSERT INTO posts (kind, slug, title, kicker, tag, date, event_start, event_end, location, excerpt, body, cover, cover_alt, link, featured, published)
         VALUES (@kind, @slug, @title, @kicker, @tag, @date, @event_start, @event_end, @location, @excerpt, @body, @cover, @cover_alt, @link, @featured, @published)`,
      ).run(SEED);
    }
    db.prepare("INSERT INTO settings (key, value) VALUES ('posts_seeded', '1')").run();
  })();
}

const seedPost = (): Post => ({ ...SEED, id: 0, created_at: "", updated_at: "" });

export function postHref(p: Pick<Post, "slug" | "link">): string {
  return p.link || `/news/${p.slug}`;
}

/** Published posts, newest first. */
export function getPublishedPosts(kind?: PostKind): Post[] {
  const db = getDb();
  if (!db) return !kind || kind === "news" ? [seedPost()] : [];
  ensureSeeded();
  const rows = db
    .prepare(
      `SELECT * FROM posts WHERE published = 1 ${kind ? "AND kind = ?" : ""}
       ORDER BY COALESCE(event_start, date) DESC, id DESC`,
    )
    .all(...(kind ? [kind] : [])) as Post[];
  return rows;
}

/** The post shown in the homepage "Latest Updates" feature: the newest
 *  featured post, else the newest post. */
export function getHomepagePost(): Post | null {
  const posts = getPublishedPosts();
  return posts.find((p) => p.featured) ?? posts[0] ?? null;
}

export function getPostBySlug(slug: string): Post | null {
  const db = getDb();
  if (!db) return slug === SEED.slug ? seedPost() : null;
  ensureSeeded();
  return (db.prepare("SELECT * FROM posts WHERE slug = ? AND published = 1").get(slug) as Post) ?? null;
}

export function getAllPostsForAdmin(): Post[] {
  const db = getDb();
  if (!db) return [];
  ensureSeeded();
  return db.prepare("SELECT * FROM posts ORDER BY date DESC, id DESC").all() as Post[];
}

export function getPostById(id: number): Post | null {
  const db = getDb();
  if (!db) return null;
  return (db.prepare("SELECT * FROM posts WHERE id = ?").get(id) as Post) ?? null;
}

// Western Armenian month names (classical orthography).
const HY_MONTHS = ["Յունուար", "Փետրուար", "Մարտ", "Ապրիլ", "Մայիս", "Յունիս", "Յուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"];

export function formatDate(iso: string | null, withTime = false, lang: "en" | "hy" = "en"): string {
  if (!iso) return "";
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  if (lang === "hy") {
    const time = withTime && iso.length > 10 ? `, ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}` : "";
    return `${d.getDate()} ${HY_MONTHS[d.getMonth()]} ${d.getFullYear()}${time}`;
  }
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withTime && iso.length > 10 ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}
