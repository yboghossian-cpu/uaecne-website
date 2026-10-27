"use client";

import { useMemo, useState, useTransition } from "react";
import { approveAllShown, saveTranslation } from "@/app/admin/actions";
import type { Row } from "@/lib/i18n/admin";
import styles from "./admin.module.css";

const PAGE = 40;
type Filter = "all" | Row["status"];

function area(where: string) {
  return where.split(/[:(]/)[0].trim();
}

function Item({ row, onSaved }: { row: Row; onSaved: (r: Row) => void }) {
  const [text, setText] = useState(row.hy);
  const [msg, setMsg] = useState("");
  const [pending, start] = useTransition();
  const dirty = text !== row.hy;
  const run = (approve: boolean) =>
    start(async () => {
      const res = await saveTranslation(row.source, text, approve);
      setMsg(res.message);
      if (res.ok) onSaved({ ...row, hy: text.trim(), status: !text.trim() ? "missing" : approve ? "approved" : "draft" });
    });
  const pill = row.status === "approved" ? styles.pillGreen : row.status === "draft" ? styles.pillGold : styles.pillGrey;
  return (
    <div className={styles.item}>
      <div className={styles.itemHead}>
        <span className={`${styles.pill} ${pill}`}>{row.status}</span>
        <span className={styles.muted}>
          {row.where.slice(0, 3).join(" · ")}
          {row.where.length > 3 ? ` +${row.where.length - 3}` : ""}
        </span>
      </div>
      <div className={styles.grid2}>
        <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{row.source}</p>
        <textarea
          className={`${styles.textarea} ${styles.armenian}`}
          lang="hyw"
          value={text}
          rows={Math.min(12, Math.max(2, Math.ceil(row.source.length / 60)))}
          onChange={(e) => {
            setText(e.target.value);
            setMsg("");
          }}
        />
      </div>
      <div className={styles.row}>
        <button type="button" className={styles.btnSmall} disabled={pending || !dirty} onClick={() => run(false)}>
          Save draft
        </button>
        <button
          type="button"
          className={styles.btnSmall}
          disabled={pending || !text.trim() || (!dirty && row.status === "approved")}
          onClick={() => run(true)}
        >
          {dirty ? "Save & approve" : "Approve"}
        </button>
        {msg && <span className={styles.muted}>{msg}</span>}
      </div>
    </div>
  );
}

export default function TranslationsTable({ rows: initial }: { rows: Row[] }) {
  const [rows, setRows] = useState(initial);
  const [filter, setFilter] = useState<Filter>("all");
  const [where, setWhere] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const [bulkMsg, setBulkMsg] = useState("");
  const [pending, start] = useTransition();

  const areas = useMemo(() => [...new Set(rows.flatMap((r) => r.where.map(area)))].sort(), [rows]);
  const counts = useMemo(() => {
    const c = { all: rows.length, missing: 0, draft: 0, approved: 0 };
    for (const r of rows) c[r.status]++;
    return c;
  }, [rows]);
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (filter === "all" || r.status === filter) &&
        (!where || r.where.some((w) => area(w) === where || w === where)) &&
        (!needle || r.source.toLowerCase().includes(needle) || r.hy.toLowerCase().includes(needle)),
    );
  }, [rows, filter, where, q]);
  const pages = Math.max(1, Math.ceil(shown.length / PAGE));
  const cur = Math.min(page, pages - 1);
  const slice = shown.slice(cur * PAGE, cur * PAGE + PAGE);
  const subAreas = useMemo(
    () => (where ? [...new Set(rows.flatMap((r) => r.where.filter((w) => area(w) === where && w !== where)))].sort() : []),
    [rows, where],
  );

  const update = (r: Row) => setRows((all) => all.map((x) => (x.source === r.source ? r : x)));

  return (
    <section className={styles.card}>
      <div className={styles.tabs}>
        {(["all", "missing", "draft", "approved"] as const).map((f) => (
          <button
            key={f}
            type="button"
            className={`${styles.tab} ${filter === f ? styles.tabActive : ""}`}
            onClick={() => {
              setFilter(f);
              setPage(0);
            }}
          >
            {f[0].toUpperCase() + f.slice(1)} ({counts[f]})
          </button>
        ))}
      </div>
      <div className={styles.grid2}>
        <select
          className={styles.select}
          value={where}
          onChange={(e) => {
            setWhere(e.target.value);
            setPage(0);
          }}
        >
          <option value="">All pages</option>
          {areas.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
          {subAreas.map((a) => (
            <option key={a} value={a}>
              — {a}
            </option>
          ))}
        </select>
        <input
          className={styles.input}
          placeholder="Search English or Armenian…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(0);
          }}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.muted}>
          {shown.length} texts · page {cur + 1} of {pages}
        </span>
        <button type="button" className={styles.btnSmall} disabled={cur === 0} onClick={() => setPage(cur - 1)}>
          ‹ Prev
        </button>
        <button type="button" className={styles.btnSmall} disabled={cur >= pages - 1} onClick={() => setPage(cur + 1)}>
          Next ›
        </button>
        {filter === "draft" && slice.length > 0 && (
          <button
            type="button"
            className={styles.btnSmall}
            disabled={pending}
            onClick={() =>
              start(async () => {
                const res = await approveAllShown(slice.map((r) => r.source));
                setBulkMsg(res.message);
                const set = new Set(slice.map((r) => r.source));
                setRows((all) => all.map((x) => (set.has(x.source) && x.hy ? { ...x, status: "approved" } : x)));
              })
            }
          >
            Approve these {slice.length}
          </button>
        )}
        {bulkMsg && <span className={styles.muted}>{bulkMsg}</span>}
      </div>
      {slice.map((r) => (
        <Item key={r.source} row={r} onSaved={update} />
      ))}
      {slice.length === 0 && <p className={styles.muted}>Nothing here.</p>}
    </section>
  );
}
