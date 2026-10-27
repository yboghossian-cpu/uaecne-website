import "server-only";
import * as headquarters from "@/data/headquarters";
import * as higherEd from "@/data/higherEdContent";
import * as history from "@/data/historyContent";
import * as outreach from "@/data/outreachContent";
import { syriaMinistries } from "@/data/syriaMinistries";
import uiKeys from "@/i18n/ui-keys.json";
import { buildChurchView } from "@/lib/churchTemplate";
import { buildSchoolView } from "@/lib/schoolTemplate";
import { getAllChurchContent, getChurches, getAllSchoolContent, getSchools } from "@/lib/server/content";
import { getAllPostsForAdmin } from "@/lib/server/posts";
import { getSettings } from "@/lib/server/settings";
import { NO_TRANSLATE_KEYS, isTranslatable } from "./config";

/**
 * Every English text the public site can show, with where it appears —
 * the list behind Admin › Translations and the translation export.
 */
export type SourceString = { source: string; where: string[] };

export function collectSources(): SourceString[] {
  const map = new Map<string, Set<string>>();
  const add = (s: string, where: string) => {
    if (!isTranslatable(s)) return;
    const set = map.get(s) ?? new Set<string>();
    set.add(where);
    map.set(s, set);
  };
  const walk = (v: unknown, where: string, key = "") => {
    if (v === null || v === undefined) return;
    if (typeof v === "string") return add(v, where);
    if (Array.isArray(v)) return v.forEach((x) => walk(x, where, key));
    if (typeof v === "object") {
      const o = v as Record<string, unknown>;
      for (const [k, x] of Object.entries(o)) {
        if (k.endsWith("Hy") || NO_TRANSLATE_KEYS.has(k)) continue;
        const human = o[`${k}Hy`];
        if (human !== undefined && human !== null && (typeof human !== "string" || human.trim())) continue;
        walk(x, where, k);
      }
    }
    void key;
  };

  for (const k of uiKeys as string[]) add(k, "Interface");

  const churchContent = getAllChurchContent();
  for (const c of getChurches()) {
    const content = churchContent[c.slug] ?? null;
    add(c.country, "Interface (countries)");
    walk(c, `Church: ${c.name}`);
    walk(content, `Church: ${c.name}`);
    walk(buildChurchView(c, content), `Church: ${c.name}`);
  }
  const schoolContent = getAllSchoolContent();
  for (const s of getSchools()) {
    const content = schoolContent[s.slug];
    add(s.country, "Interface (countries)");
    walk(s, `School: ${s.name}`);
    if (content) {
      walk(content, `School: ${s.name}`);
      walk(buildSchoolView(s, content), `School: ${s.name}`);
    }
  }
  for (const [name, v] of Object.entries(outreach)) walk(v, `Outreach (${name.replace(/Content$/, "")})`);
  for (const [name, v] of Object.entries(higherEd)) walk(v, `Higher education (${name.replace(/Content$/, "")})`);
  for (const [name, v] of Object.entries(headquarters)) walk(v, `Headquarters (${name})`);
  walk(history.historyContent, "History");
  for (const m of syriaMinistries) walk(m, `Syria: ${m.title}`);
  for (const p of getAllPostsForAdmin()) {
    walk({ title: p.title, kicker: p.kicker, tag: p.tag, location: p.location, excerpt: p.excerpt, body: p.body, cover_alt: p.cover_alt }, `News: ${p.title}`);
  }
  const s = getSettings();
  walk({ text: s.announcement.text, label: s.announcement.linkLabel }, "Announcement banner");

  return [...map.entries()].map(([source, where]) => ({ source, where: [...where].sort() }));
}
