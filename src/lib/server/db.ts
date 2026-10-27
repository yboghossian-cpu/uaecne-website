import "server-only";
import fs from "node:fs";
import path from "node:path";
import type BetterSqlite3 from "better-sqlite3";

/**
 * SQLite storage for the admin portal (settings, page edits, news, form
 * submissions, media, the admin account and sessions).
 *
 * The database lives in UAECNE_DATA_DIR (on the server: /var/lib/uaecne).
 * When that variable is not set — e.g. on the Vercel preview — there is no
 * database: every page falls back to the content in src/data/*.ts and the
 * admin portal reports that it is unavailable. Nothing breaks.
 */

export const DATA_DIR = process.env.UAECNE_DATA_DIR ? path.resolve(process.env.UAECNE_DATA_DIR) : null;
export const MEDIA_DIR = DATA_DIR ? path.join(DATA_DIR, "media") : null;

type DB = BetterSqlite3.Database;

const g = globalThis as unknown as { __uaecneDb?: DB | null };

const SCHEMA = `
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS docs (
  collection TEXT NOT NULL,
  key TEXT NOT NULL,
  data TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (collection, key)
);
CREATE TABLE IF NOT EXISTS revisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  collection TEXT NOT NULL,
  key TEXT NOT NULL,
  data TEXT,
  note TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS revisions_doc ON revisions (collection, key, id);
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL CHECK (kind IN ('news','event')),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  kicker TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL,
  event_start TEXT,
  event_end TEXT,
  location TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  cover TEXT,
  cover_alt TEXT NOT NULL DEFAULT '',
  link TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  form TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  extra TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','read','archived')),
  email_status TEXT NOT NULL DEFAULT 'pending',
  ip_hash TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  file TEXT NOT NULL UNIQUE,
  original_name TEXT NOT NULL,
  mime TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  size INTEGER NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  pass_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS rate_events (
  bucket TEXT NOT NULL,
  ip TEXT NOT NULL,
  at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS rate_events_lookup ON rate_events (bucket, ip, at);
`;

export function getDb(): DB | null {
  if (g.__uaecneDb !== undefined) return g.__uaecneDb;
  if (!DATA_DIR) {
    g.__uaecneDb = null;
    return null;
  }
  // Loaded lazily so builds without a data directory never touch the
  // native module.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Database = require("better-sqlite3") as typeof BetterSqlite3;
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(path.join(DATA_DIR, "media"), { recursive: true });
  const db = new Database(path.join(DATA_DIR, "uaecne.db"));
  db.pragma("journal_mode = WAL");
  db.pragma("busy_timeout = 5000");
  db.pragma("foreign_keys = ON");
  db.exec(SCHEMA);
  g.__uaecneDb = db;
  return db;
}

export function requireDb(): DB {
  const db = getDb();
  if (!db) throw new Error("The admin database is not configured on this server (UAECNE_DATA_DIR).");
  return db;
}

/** Records an event and reports whether the caller is still under `limit`
 *  events in the last `windowSec` seconds. */
export function rateLimit(bucket: string, ip: string, limit: number, windowSec: number): boolean {
  const db = getDb();
  if (!db) return true;
  const now = Math.floor(Date.now() / 1000);
  db.prepare("DELETE FROM rate_events WHERE at < ?").run(now - 86400);
  const { n } = db
    .prepare("SELECT COUNT(*) AS n FROM rate_events WHERE bucket = ? AND ip = ? AND at > ?")
    .get(bucket, ip, now - windowSec) as { n: number };
  if (n >= limit) return false;
  db.prepare("INSERT INTO rate_events (bucket, ip, at) VALUES (?, ?, ?)").run(bucket, ip, now);
  return true;
}
