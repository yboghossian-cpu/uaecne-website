import "server-only";
import base from "@/i18n/hy.json";
import { requireDb } from "@/lib/server/db";
import { getDictionary } from "./dictionary";
import { collectSources } from "./sources";

export type Row = { source: string; where: string[]; hy: string; status: "missing" | "draft" | "approved" };

export function translationRows(): Row[] {
  getDictionary(); // ensures the table exists
  const db = requireDb();
  const stored = new Map(
    (db.prepare("SELECT source, hy, status FROM translations").all() as { source: string; hy: string; status: string }[]).map(
      (r) => [r.source, r],
    ),
  );
  const file = base as Record<string, string>;
  return collectSources()
    .map(({ source, where }) => {
      const s = stored.get(source);
      const hy = s ? s.hy : (file[source] ?? "");
      const status: Row["status"] = !hy.trim() ? "missing" : s?.status === "approved" ? "approved" : "draft";
      return { source, where, hy, status };
    })
    .sort((a, b) => a.where[0].localeCompare(b.where[0]) || a.source.localeCompare(b.source));
}
