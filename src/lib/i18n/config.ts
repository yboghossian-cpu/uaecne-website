export const LANGS = ["en", "hy"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";
/** Cookie holding the visitor's chosen language (set by the EN | ՀԱՅ switch). */
export const LANG_COOKIE = "uaecne_lang";
/** HTML lang attribute — Western Armenian is "hyw". */
export const HTML_LANG: Record<Lang, string> = { en: "en", hy: "hyw" };

export function isLang(v: unknown): v is Lang {
  return v === "en" || v === "hy";
}

// Fields that are never translated (addresses of things, not words).
export const NO_TRANSLATE_KEYS = new Set([
  "id",
  "slug",
  "src",
  "href",
  "url",
  "mapsUrl",
  "link",
  "cover",
  "icon",
  "heroIcon",
  "emblem",
  "photo",
  "key",
  "email",
  "phone",
  "fax",
  "website",
  "facebook",
  "instagram",
  "youtube",
  "x",
  "tiktok",
  "linkedin",
  "country",
]);

/** Should this string be offered for translation? */
export function isTranslatable(s: string): boolean {
  const t = s.trim();
  if (!t) return false;
  if (!/[A-Za-z]/.test(t)) return false; // numbers, dates, Armenian already
  if (/[Ա-֏]/.test(t) && !/[A-Za-z]{3}/.test(t)) return false;
  if (/^(https?:|mailto:|tel:|\/|#)/.test(t)) return false;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return false;
  if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(t)) return false; // slugs / icon ids
  return true;
}
