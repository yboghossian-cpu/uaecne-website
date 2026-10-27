import "server-only";
import { churches as baseChurches, type Church } from "@/data/churches";
import { churchContent as baseChurchContent, type ChurchContent } from "@/data/churchContent";
import { schools as baseSchools, type School } from "@/data/schools";
import { schoolContent as baseSchoolContent, type SchoolContent } from "@/data/schoolContent";
import { getDb } from "./db";

/**
 * Content store. The built-in content in src/data/*.ts is the baseline;
 * anything saved from the admin portal is stored as a whole document in
 * the `docs` table and replaces the baseline for that page. "Reset to
 * original" deletes the stored document. Pages and churches/schools added
 * from the admin exist only in the database.
 */

export type Collection = "church-dir" | "church-page" | "school-dir" | "school-page";

export const COLLECTIONS: Record<Collection, { label: string }> = {
  "church-dir": { label: "Church directory entry" },
  "church-page": { label: "Church page" },
  "school-dir": { label: "School directory entry" },
  "school-page": { label: "School page" },
};

function storedDocs<T>(collection: Collection): Map<string, T> {
  const db = getDb();
  const out = new Map<string, T>();
  if (!db) return out;
  const rows = db.prepare("SELECT key, data FROM docs WHERE collection = ?").all(collection) as {
    key: string;
    data: string;
  }[];
  for (const r of rows) {
    try {
      out.set(r.key, JSON.parse(r.data) as T);
    } catch {
      // A corrupt row never takes the page down — the baseline is used.
    }
  }
  return out;
}

function storedDoc<T>(collection: Collection, key: string): T | null {
  const db = getDb();
  if (!db) return null;
  const row = db.prepare("SELECT data FROM docs WHERE collection = ? AND key = ?").get(collection, key) as
    { data: string } | undefined;
  if (!row) return null;
  try {
    return JSON.parse(row.data) as T;
  } catch {
    return null;
  }
}

function mergeDirectory<T extends { slug: string }>(base: T[], stored: Map<string, T>): T[] {
  const out = base.map((entry) => stored.get(entry.slug) ?? entry);
  const known = new Set(base.map((e) => e.slug));
  for (const [slug, entry] of stored) if (!known.has(slug)) out.push(entry);
  return out;
}

export function getChurches(): Church[] {
  return mergeDirectory(baseChurches, storedDocs<Church>("church-dir"));
}

export function getChurch(slug: string): Church | null {
  return storedDoc<Church>("church-dir", slug) ?? baseChurches.find((c) => c.slug === slug) ?? null;
}

export function getChurchContent(slug: string): ChurchContent | null {
  return storedDoc<ChurchContent>("church-page", slug) ?? baseChurchContent[slug] ?? null;
}

export function getAllChurchContent(): Record<string, ChurchContent> {
  return { ...baseChurchContent, ...Object.fromEntries(storedDocs<ChurchContent>("church-page")) };
}

export function getSchools(): School[] {
  return mergeDirectory(baseSchools, storedDocs<School>("school-dir"));
}

export function getSchool(slug: string): School | null {
  return storedDoc<School>("school-dir", slug) ?? baseSchools.find((s) => s.slug === slug) ?? null;
}

export function getSchoolContent(slug: string): SchoolContent | null {
  return storedDoc<SchoolContent>("school-page", slug) ?? baseSchoolContent[slug] ?? null;
}

export function getAllSchoolContent(): Record<string, SchoolContent> {
  return { ...baseSchoolContent, ...Object.fromEntries(storedDocs<SchoolContent>("school-page")) };
}

// ---- used by the admin editor ----

export function baselineDoc(collection: Collection, key: string): unknown | null {
  switch (collection) {
    case "church-dir":
      return baseChurches.find((c) => c.slug === key) ?? null;
    case "church-page":
      return baseChurchContent[key] ?? null;
    case "school-dir":
      return baseSchools.find((s) => s.slug === key) ?? null;
    case "school-page":
      return baseSchoolContent[key] ?? null;
  }
}

/** Every baseline document of a collection — used to work out the shape of
 *  each field (so an empty section can be filled in with the right form). */
export function baselineSamples(collection: Collection): unknown[] {
  switch (collection) {
    case "church-dir":
      return baseChurches;
    case "church-page":
      return Object.values(baseChurchContent);
    case "school-dir":
      return baseSchools;
    case "school-page":
      return Object.values(baseSchoolContent);
  }
}

export function currentDoc(collection: Collection, key: string): { data: unknown | null; edited: boolean } {
  const stored = storedDoc<unknown>(collection, key);
  if (stored !== null) return { data: stored, edited: true };
  return { data: baselineDoc(collection, key), edited: false };
}

export function isBuiltIn(kind: "church" | "school", slug: string): boolean {
  return kind === "church" ? baseChurches.some((c) => c.slug === slug) : baseSchools.some((s) => s.slug === slug);
}
