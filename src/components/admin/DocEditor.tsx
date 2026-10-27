"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { blankFor, humanize, type Shape } from "@/lib/admin/shape";
import MediaPicker from "./MediaPicker";
import styles from "./admin.module.css";

/**
 * Structured editor for one church/school page (or directory entry). Every
 * field of the page is editable; the form is generated from the field
 * shapes, so it stays in step with the page templates automatically.
 */

type Json = null | string | number | boolean | Json[] | { [k: string]: Json };
type Obj = { [k: string]: Json };

type Props = {
  initial: Obj;
  shape: Shape;
  /** Save handler (server action bound to this page). */
  onSave: (json: string) => Promise<{ ok: boolean; message: string }>;
  /** Top-level keys to show first and open by default. */
  primary?: string[];
  /** Keys that must not be edited (e.g. the page address). */
  readOnly?: string[];
  /** Show all sections expanded (small documents). */
  flat?: boolean;
  liveUrl?: string;
};

const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);

function previewOf(v: Json): string {
  if (typeof v === "string") return v;
  if (isObj(v)) {
    for (const k of ["name", "title", "label", "heading", "role", "src", "range", "years", "number", "text"]) {
      const x = v[k];
      if (typeof x === "string" && x.trim()) return x;
    }
    for (const x of Object.values(v)) if (typeof x === "string" && x.trim()) return x;
  }
  return "";
}

function ImageInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.imageField}>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className={styles.thumb} />
      ) : (
        <span className={styles.thumbEmpty}>No image</span>
      )}
      <div style={{ display: "grid", gap: "0.4rem", minWidth: 0 }}>
        <input
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/image.jpg"
        />
        <div className={styles.row}>
          <button type="button" className={styles.btnSmall} onClick={() => setOpen(true)}>
            Choose / upload…
          </button>
          {value && (
            <button type="button" className={styles.btnSmall} onClick={() => onChange("")}>
              Clear
            </button>
          )}
        </div>
      </div>
      {open && (
        <MediaPicker
          onClose={() => setOpen(false)}
          onSelect={(url) => {
            onChange(url);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}

function Field({
  name,
  value,
  shape,
  onChange,
  onRemove,
  depth,
  readOnly,
}: {
  name: string;
  value: Json | undefined;
  shape: Shape | undefined;
  onChange: (v: Json | undefined) => void;
  onRemove?: () => void;
  depth: number;
  readOnly?: boolean;
}) {
  const types = shape?.types ?? [
    typeof value === "number" ? "number" : typeof value === "boolean" ? "boolean" : "string",
  ];
  const label = humanize(name);
  const armenian = /Hy$/.test(name);
  const nullable = types.includes("null");

  // ---- empty section / list: offer to add it ----
  if (
    (value === null || value === undefined) &&
    (types.includes("object") || (types.includes("array") && !types.includes("string")))
  ) {
    return (
      <button
        type="button"
        className={styles.addButton}
        onClick={() => onChange(blankFor({ ...shape!, types: types.filter((t) => t !== "null") }) as Json)}
      >
        + Add {label.toLowerCase()}
      </button>
    );
  }

  // ---- object ----
  if (isObj(value)) {
    const keys = [...Object.keys(value)];
    for (const k of shape?.order ?? []) if (!keys.includes(k)) keys.push(k);
    const present = keys.filter((k) => k in value);
    const missing = keys.filter((k) => !(k in value));
    return (
      <fieldset className={styles.group}>
        <div className={styles.groupHead}>
          <legend className={styles.groupTitle}>{label}</legend>
          {(nullable || onRemove) && (
            <button
              type="button"
              className={styles.btnSmall}
              onClick={() => (onRemove ? onRemove() : onChange(null))}
              title="Remove this section from the page"
            >
              Remove
            </button>
          )}
        </div>
        {present.map((k) => (
          <Field
            key={k}
            name={k}
            value={value[k]}
            shape={shape?.fields?.[k]}
            depth={depth + 1}
            onChange={(v) => {
              const next = { ...value };
              if (v === undefined) delete next[k];
              else next[k] = v;
              onChange(next);
            }}
            onRemove={
              shape?.optional?.includes(k)
                ? () => {
                    const next = { ...value };
                    delete next[k];
                    onChange(next);
                  }
                : undefined
            }
          />
        ))}
        {missing.length > 0 && (
          <div>
            {missing.map((k) => (
              <button
                key={k}
                type="button"
                className={styles.addButton}
                onClick={() => onChange({ ...value, [k]: blankFor(shape?.fields?.[k]) as Json })}
              >
                + {humanize(k)}
              </button>
            ))}
          </div>
        )}
      </fieldset>
    );
  }

  // ---- list ----
  if (Array.isArray(value)) {
    const itemShape = shape?.item;
    const simple = !itemShape || !itemShape.types.includes("object");
    const move = (i: number, d: number) => {
      const next = [...value];
      const [x] = next.splice(i, 1);
      next.splice(i + d, 0, x);
      onChange(next);
    };
    return (
      <fieldset className={styles.group}>
        <div className={styles.groupHead}>
          <legend className={styles.groupTitle}>
            {label} <span className={styles.muted}>({value.length})</span>
          </legend>
          {nullable && (
            <button
              type="button"
              className={styles.btnSmall}
              onClick={() => onChange(null)}
              title="Remove this list from the page"
            >
              Remove
            </button>
          )}
        </div>
        {value.map((item, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.itemHead}>
              <span className={styles.itemLabel}>
                {i + 1}. {previewOf(item).slice(0, 70)}
              </span>
              <span className={styles.row} style={{ gap: "0.3rem" }}>
                <button
                  type="button"
                  className={styles.btnSmall}
                  disabled={i === 0}
                  onClick={() => move(i, -1)}
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className={styles.btnSmall}
                  disabled={i === value.length - 1}
                  onClick={() => move(i, 1)}
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  className={styles.btnSmall}
                  onClick={() => {
                    if (confirm("Remove this item?")) onChange(value.filter((_, j) => j !== i));
                  }}
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </span>
            </div>
            {isObj(item) ? (
              (shape?.item?.order ?? Object.keys(item))
                .concat(Object.keys(item).filter((k) => !(shape?.item?.order ?? []).includes(k)))
                .filter((k, idx, arr) => arr.indexOf(k) === idx)
                .map((k) =>
                  k in item ? (
                    <Field
                      key={k}
                      name={k}
                      value={item[k]}
                      shape={itemShape?.fields?.[k]}
                      depth={depth + 1}
                      onChange={(v) => {
                        const next = [...value];
                        const o = { ...(item as Obj) };
                        if (v === undefined) delete o[k];
                        else o[k] = v;
                        next[i] = o;
                        onChange(next);
                      }}
                    />
                  ) : (
                    <button
                      key={k}
                      type="button"
                      className={styles.addButton}
                      onClick={() => {
                        const next = [...value];
                        next[i] = { ...(item as Obj), [k]: blankFor(itemShape?.fields?.[k]) as Json };
                        onChange(next);
                      }}
                    >
                      + {humanize(k)}
                    </button>
                  ),
                )
            ) : (
              <Field
                name={simple ? `${name.replace(/s$/, "")}` : "item"}
                value={item}
                shape={itemShape}
                depth={depth + 1}
                onChange={(v) => {
                  const next = [...value];
                  next[i] = v ?? "";
                  onChange(next);
                }}
              />
            )}
          </div>
        ))}
        <button
          type="button"
          className={styles.addButton}
          onClick={() => {
            const blank = itemShape
              ? (blankFor({ ...itemShape, types: itemShape.types.filter((t) => t !== "null") }) as Json)
              : "";
            onChange([...value, blank]);
          }}
        >
          + Add {humanize(name.replace(/s$/, "")).toLowerCase()}
        </button>
      </fieldset>
    );
  }

  // ---- boolean ----
  if (typeof value === "boolean" || (types.includes("boolean") && !types.includes("string"))) {
    return (
      <label className={styles.check}>
        <input
          type="checkbox"
          checked={Boolean(value)}
          disabled={readOnly}
          onChange={(e) => onChange(e.target.checked)}
        />
        {label}
      </label>
    );
  }

  // ---- number ----
  if (typeof value === "number" || (types.includes("number") && !types.includes("string"))) {
    return (
      <label className={styles.field}>
        <span className={styles.label}>{label}</span>
        <input
          type="number"
          className={styles.input}
          value={value === null || value === undefined ? "" : String(value)}
          disabled={readOnly}
          onChange={(e) => onChange(e.target.value === "" ? (nullable ? null : 0) : Number(e.target.value))}
        />
      </label>
    );
  }

  // ---- text ----
  const text = value === null || value === undefined ? "" : String(value);
  const set = (s: string) => onChange(s === "" && nullable ? null : s);
  if (shape?.image) {
    return (
      <div className={styles.field}>
        <span className={styles.label}>{label}</span>
        <ImageInput value={text} onChange={set} />
      </div>
    );
  }
  const long = shape?.long || text.length > 90 || text.includes("\n");
  return (
    <label className={styles.field}>
      <span className={styles.label}>
        {label}
        {onRemove && (
          <button type="button" className={styles.btnSmall} style={{ marginLeft: "0.5rem" }} onClick={onRemove}>
            Remove
          </button>
        )}
      </span>
      {long ? (
        <textarea
          className={`${styles.textarea} ${armenian ? styles.armenian : ""}`}
          lang={armenian ? "hyw" : undefined}
          value={text}
          readOnly={readOnly}
          rows={Math.min(14, Math.max(3, Math.ceil(text.length / 95) + text.split("\n").length - 1))}
          onChange={(e) => set(e.target.value)}
        />
      ) : (
        <input
          className={`${styles.input} ${armenian ? styles.armenian : ""}`}
          lang={armenian ? "hyw" : undefined}
          value={text}
          readOnly={readOnly}
          onChange={(e) => set(e.target.value)}
        />
      )}
      {armenian && !text && (
        <span className={styles.help}>Western Armenian only — leave empty until verified text is supplied.</span>
      )}
    </label>
  );
}

export default function DocEditor({ initial, shape, onSave, primary = [], readOnly = [], flat, liveUrl }: Props) {
  const [doc, setDoc] = useState<Obj>(initial);
  const [saved, setSaved] = useState(JSON.stringify(initial));
  const [open, setOpen] = useState<Set<string>>(() => new Set(flat ? [] : primary.slice(0, 1)));
  const [msg, setMsg] = useState<{ ok: boolean; message: string } | null>(null);
  const [pending, start] = useTransition();
  const dirty = JSON.stringify(doc) !== saved;

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const keys = useMemo(() => {
    const all = [...Object.keys(doc)];
    for (const k of shape.order ?? []) if (!all.includes(k)) all.push(k);
    const first = primary.filter((k) => all.includes(k));
    return [...first, ...all.filter((k) => !first.includes(k))].filter((k) => !readOnly.includes(k));
  }, [doc, shape, primary, readOnly]);

  const save = () =>
    start(async () => {
      const json = JSON.stringify(doc);
      const r = await onSave(json);
      setMsg(r);
      if (r.ok) setSaved(json);
    });

  const setKey = (k: string, v: Json | undefined) =>
    setDoc((d) => {
      const next = { ...d };
      if (v === undefined) delete next[k];
      else next[k] = v;
      return next;
    });

  const toggle = (k: string) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });

  return (
    <div>
      {!flat && (
        <div className={styles.row} style={{ marginBottom: "0.75rem", maxWidth: 1100 }}>
          <button type="button" className={styles.btnSmall} onClick={() => setOpen(new Set(keys))}>
            Expand all
          </button>
          <button type="button" className={styles.btnSmall} onClick={() => setOpen(new Set())}>
            Collapse all
          </button>
        </div>
      )}
      {keys.map((k) => {
        const v = doc[k];
        const fieldShape = shape.fields?.[k];
        const isSection =
          isObj(v) ||
          Array.isArray(v) ||
          (v === null && fieldShape && (fieldShape.types.includes("object") || fieldShape.types.includes("array")));
        if (flat || !isSection) {
          if (!(k in doc)) {
            return (
              <button
                key={k}
                type="button"
                className={styles.addButton}
                onClick={() => setKey(k, blankFor(fieldShape) as Json)}
              >
                + {humanize(k)}
              </button>
            );
          }
          return (
            <div
              key={k}
              className={flat ? undefined : styles.section}
              style={flat ? undefined : { padding: "0.75rem 1rem 0.1rem" }}
            >
              <Field
                name={k}
                value={v}
                shape={fieldShape}
                depth={0}
                readOnly={readOnly.includes(k)}
                onChange={(x) => setKey(k, x)}
              />
            </div>
          );
        }
        const isOpen = open.has(k);
        const empty = v === null || v === undefined || (Array.isArray(v) && v.length === 0);
        return (
          <section key={k} className={styles.section}>
            <button type="button" className={styles.sectionHead} onClick={() => toggle(k)} aria-expanded={isOpen}>
              <span className={styles.sectionTitle}>{humanize(k)}</span>
              <span className={styles.row} style={{ gap: "0.5rem" }}>
                {empty && <span className={styles.pillGrey}>Empty</span>}
                {Array.isArray(v) && v.length > 0 && <span className={styles.pillGold}>{v.length} items</span>}
                <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </span>
            </button>
            {isOpen && (
              <div className={styles.sectionBody}>
                <Field name={k} value={v} shape={fieldShape} depth={0} onChange={(x) => setKey(k, x)} />
              </div>
            )}
          </section>
        );
      })}
      <div className={styles.saveBar}>
        <button type="button" className={styles.btn} onClick={save} disabled={pending || !dirty}>
          {pending ? "Saving…" : "Save changes"}
        </button>
        {dirty && (
          <>
            <span className={styles.dirty}>Unsaved changes</span>
            <button
              type="button"
              className={styles.btnSmall}
              onClick={() => {
                if (confirm("Discard your unsaved changes?")) setDoc(JSON.parse(saved));
              }}
            >
              Discard
            </button>
          </>
        )}
        {msg && !dirty && <span className={msg.ok ? styles.msgOk : styles.msgErr}>{msg.message}</span>}
        {msg && dirty && !msg.ok && <span className={styles.msgErr}>{msg.message}</span>}
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener" className={styles.btnSmall} style={{ marginLeft: "auto" }}>
            View live page ↗
          </a>
        )}
      </div>
    </div>
  );
}
