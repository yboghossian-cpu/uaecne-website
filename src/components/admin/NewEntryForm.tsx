"use client";

import { useKeepForm } from "@/lib/useKeepForm";
import { useState } from "react";
import { createEntry } from "@/app/admin/actions";
import styles from "./admin.module.css";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

export default function NewEntryForm({ kind, countries }: { kind: "church" | "school"; countries: string[] }) {
  const [state, onSubmit, pending] = useKeepForm(createEntry, { ok: true, message: "" });
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [touched, setTouched] = useState(false);
  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="kind" value={kind} />
      <div className={styles.grid2}>
        <label className={styles.field}>
          <span className={styles.label}>Name</span>
          <input
            name="name"
            required
            className={styles.input}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!touched) setSlug(slugify(e.target.value));
            }}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Country (as it should be grouped)</span>
          <input name="country" required list={`countries-${kind}`} className={styles.input} />
          <datalist id={`countries-${kind}`}>
            {countries.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>
      </div>
      <label className={styles.field}>
        <span className={styles.label}>Page address</span>
        <input
          name="slug"
          required
          className={styles.input}
          value={slug}
          onChange={(e) => {
            setTouched(true);
            setSlug(slugify(e.target.value));
          }}
        />
        <span className={styles.help}>
          /{kind === "church" ? "churches" : "schools"}/{slug || "…"} — cannot be changed later.
        </span>
      </label>
      <div className={styles.row}>
        <button className={styles.btn} disabled={pending}>
          {pending ? "Creating…" : `Create ${kind}`}
        </button>
        {!state.ok && <span className={styles.msgErr}>{state.message}</span>}
      </div>
    </form>
  );
}
