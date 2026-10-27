import "server-only";
import base from "@/i18n/hy.json";
import { getDb } from "@/lib/server/db";

/**
 * Armenian translations, keyed by the exact English source text.
 * The repo file src/i18n/hy.json holds the drafted translations; edits made
 * in Admin › Translations are stored in the database and override it.
 */
export type TranslationStatus = "draft" | "approved";

const g = globalThis as unknown as { __hyDict?: { stamp: string; map: Map<string, string> } };

export function getDictionary(): Map<string, string> {
  const db = getDb();
  if (!db) {
    if (!g.__hyDict) g.__hyDict = { stamp: "file", map: new Map(Object.entries(base as Record<string, string>)) };
    return g.__hyDict.map;
  }
  db.exec(`CREATE TABLE IF NOT EXISTS translations (
    source TEXT PRIMARY KEY,
    hy TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','approved')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`);
  const { stamp } = db.prepare("SELECT COALESCE(MAX(updated_at), '') || ':' || COUNT(*) AS stamp FROM translations").get() as {
    stamp: string;
  };
  if (g.__hyDict && g.__hyDict.stamp === stamp) return g.__hyDict.map;
  const map = new Map(Object.entries(base as Record<string, string>));
  for (const r of db.prepare("SELECT source, hy FROM translations").all() as { source: string; hy: string }[]) {
    if (r.hy.trim()) map.set(r.source, r.hy);
    else map.delete(r.source);
  }
  g.__hyDict = { stamp, map };
  return map;
}
