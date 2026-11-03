import "server-only";
import type { Metadata } from "next";
import { lang as rootLang } from "next/root-params";
import { DEFAULT_LANG, genderedRole, isLang, isProtected, isTranslatable, isWomansName, type Lang } from "./config";
import { getDictionary } from "./dictionary";

export type T = (s: string) => string;

/** Current page language (from the /[lang] root segment). */
export async function getLang(): Promise<Lang> {
  try {
    const v = await rootLang();
    return isLang(v) ? v : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

function makeT(lang: Lang): T {
  if (lang === "en") return (s) => s;
  const dict = getDictionary();
  return (s: string) => {
    if (typeof s !== "string") return s;
    const hit = dict.get(s);
    if (hit) return hit;
    // keep surrounding whitespace, translate the core text
    const m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (m && (m[1] || m[3])) {
      const core = dict.get(m[2]);
      if (core) return m[1] + core + m[3];
    }
    return s;
  };
}

/** String translator for the current language. */
export async function getT(): Promise<T> {
  return makeT(await getLang());
}

/** Fills {placeholders} after translating the template itself. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

function localizeWith<V>(value: V, t: T, lang: Lang): V {
  if (lang === "en" || value === null || value === undefined) return value;
  if (typeof value === "string") return (isTranslatable(value) ? t(value) : value) as V;
  if (Array.isArray(value)) return value.map((v) => localizeWith(v, t, lang)) as V;
  if (typeof value === "object") {
    const src = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    // A person's role takes the feminine form when the person is a woman.
    const woman = isWomansName(src.name);
    for (const [k, v] of Object.entries(src)) {
      if (k.endsWith("Hy")) {
        out[k] = v;
        continue;
      }
      // Human-supplied Armenian (fooHy) always wins over a drafted translation.
      const human = src[`${k}Hy`];
      if (human !== undefined && human !== null && (typeof human !== "string" || human.trim())) {
        out[k] = human;
        continue;
      }
      if (woman && (k === "role" || k === "title") && typeof v === "string" && isTranslatable(v)) {
        out[k] = genderedRole(t, v, src.name);
        continue;
      }
      out[k] = isProtected(k, v) ? v : localizeWith(v, t, lang);
    }
    return out as V;
  }
  return value;
}

/** Translates a page's metadata (browser-tab title, description, share
 *  texts). Titles are "Page — UAECNE": each part is translated on its own. */
export async function tMeta<M extends Metadata>(meta: M): Promise<M> {
  const lang = await getLang();
  if (lang === "en") return meta;
  const t = makeT(lang);
  const title = (v: unknown) =>
    typeof v === "string" ? v.split(" — ").map((p) => (isTranslatable(p) ? t(p) : p)).join(" — ") : v;
  const text = (v: unknown) => (typeof v === "string" && isTranslatable(v) ? t(v) : v);
  const out = { ...meta } as Metadata;
  out.title = title(meta.title) as Metadata["title"];
  out.description = text(meta.description) as Metadata["description"];
  if (meta.openGraph) {
    const og = { ...meta.openGraph } as Record<string, unknown>;
    og.title = title(og.title);
    og.description = text(og.description);
    og.siteName = text(og.siteName);
    og.locale = "hy_AM";
    out.openGraph = og as Metadata["openGraph"];
  }
  return out as M;
}

/** Deep-translates page data for the current language. */
export async function getL(): Promise<<V>(value: V) => V> {
  const lang = await getLang();
  const t = makeT(lang);
  return <V,>(value: V) => localizeWith(value, t, lang);
}
