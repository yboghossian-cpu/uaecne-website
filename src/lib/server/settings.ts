import "server-only";
import { getDb } from "./db";

/**
 * Site-wide settings edited from Admin › Settings. The defaults are exactly
 * what the site showed before the admin portal existed, so a fresh install
 * looks identical until something is changed.
 */
export type SiteSettings = {
  contact: {
    addressEn: string[];
    addressHy: string[];
    email: string;
    phones: string[];
  };
  social: { facebook: string; youtube: string; instagram: string; x: string };
  donateUrl: string;
  // Shows the ՀԱՅ switch to visitors (after the translation audit).
  armenianLive: boolean;
  announcement: { enabled: boolean; text: string; linkLabel: string; linkUrl: string };
  seo: { defaultDescription: string };
  notifications: { emails: string[] };
};

export const DEFAULT_SETTINGS: SiteSettings = {
  contact: {
    addressEn: ["Kobayyat Street; Sector 67; Building # 228", "Jeitawi Region, Ashrafieh", "Beirut, Lebanon"],
    addressHy: ["Քոպայէթ փողոց, Սեկտոր 67, Շէնք թիւ 228", "Ժէյթաուի շրջան, Աշրաֆիէ", "Պէյրութ, Լիբանան"],
    email: "office.director@uaecne.org",
    phones: ["+961-1-443547", "+961-1-565628"],
  },
  social: {
    facebook: "https://www.facebook.com/UAECNE",
    youtube: "https://www.youtube.com/channel/UCuK0j_A_Wx0oyNYvWJv5Ngg",
    instagram: "",
    x: "",
  },
  donateUrl: "",
  armenianLive: false,
  announcement: { enabled: false, text: "", linkLabel: "", linkUrl: "" },
  seo: {
    defaultDescription: "The Union of the Armenian Evangelical Churches in the Near East — est. 1846.",
  },
  notifications: { emails: [] },
};

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Deep-merge stored values over the defaults, keeping only known keys with
 *  the right type — so an old or partial row can never break the footer. */
function overlay<T>(base: T, stored: unknown): T {
  if (Array.isArray(base)) {
    return (Array.isArray(stored) && stored.every((x) => typeof x === "string") ? stored : base) as T;
  }
  if (isObj(base)) {
    const out: Record<string, unknown> = { ...base };
    if (isObj(stored)) for (const k of Object.keys(base)) out[k] = overlay(base[k], stored[k]);
    return out as T;
  }
  return (typeof stored === typeof base ? stored : base) as T;
}

export function getSettings(): SiteSettings {
  const db = getDb();
  if (!db) return DEFAULT_SETTINGS;
  const row = db.prepare("SELECT value FROM settings WHERE key = 'site'").get() as { value: string } | undefined;
  if (!row) return DEFAULT_SETTINGS;
  try {
    return overlay(DEFAULT_SETTINGS, JSON.parse(row.value));
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(next: SiteSettings): void {
  const db = getDb();
  if (!db) throw new Error("Database not configured");
  const clean = overlay(DEFAULT_SETTINGS, next);
  db.prepare(
    `INSERT INTO settings (key, value, updated_at) VALUES ('site', ?, datetime('now'))
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
  ).run(JSON.stringify(clean));
}

/** tel: href from a display number ("+961-1-443547" -> "+9611443547"). */
export function telHref(display: string): string {
  return `tel:${display.replace(/[^\d+]/g, "")}`;
}
