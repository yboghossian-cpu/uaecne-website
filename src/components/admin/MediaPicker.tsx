"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { listMedia, type MediaItem } from "@/app/admin/actions";
import styles from "./admin.module.css";

export async function uploadFiles(files: FileList | File[]): Promise<{ files: MediaItem[]; errors: string[] }> {
  const fd = new FormData();
  for (const f of Array.from(files)) fd.append("file", f);
  const res = await fetch("/admin/api/upload", { method: "POST", body: fd });
  const json = (await res.json().catch(() => ({}))) as { files?: MediaItem[]; errors?: string[]; error?: string };
  if (!res.ok) return { files: [], errors: [json.error ?? `Upload failed (${res.status})`] };
  return { files: json.files ?? [], errors: json.errors ?? [] };
}

export function UploadZone({ onUploaded }: { onUploaded: (items: MediaItem[]) => void }) {
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const input = useRef<HTMLInputElement>(null);

  const go = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    setErrors([]);
    const r = await uploadFiles(files);
    setBusy(false);
    setErrors(r.errors);
    if (r.files.length) onUploaded(r.files);
    if (input.current) input.current.value = "";
  };

  return (
    <div
      className={`${styles.drop} ${over ? styles.dropActive : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        go(e.dataTransfer.files);
      }}
    >
      <p style={{ marginBottom: "0.6rem" }}>{busy ? "Uploading…" : "Drag photos here, or"}</p>
      <label className={styles.btnGhost} style={{ cursor: "pointer" }}>
        Choose files
        <input
          ref={input}
          type="file"
          multiple
          accept="image/*,application/pdf"
          hidden
          disabled={busy}
          onChange={(e) => go(e.target.files)}
        />
      </label>
      <p className={styles.help} style={{ marginTop: "0.6rem" }}>
        JPG, PNG, WEBP or PDF · up to 20 MB · photos are resized and their location data removed
      </p>
      {errors.map((e) => (
        <p key={e} className={styles.msgErr} style={{ marginTop: "0.5rem" }}>
          {e}
        </p>
      ))}
    </div>
  );
}

export default function MediaPicker({ onSelect, onClose }: { onSelect: (url: string) => void; onClose: () => void }) {
  const [data, setData] = useState<{ uploads: MediaItem[]; site: MediaItem[] } | null>(null);
  const [tab, setTab] = useState<"uploads" | "site">("uploads");
  const [q, setQ] = useState("");

  const load = useCallback(async () => setData(await listMedia()), []);
  useEffect(() => {
    listMedia().then(setData);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const list = (data?.[tab] ?? []).filter(
    (m) => !q || m.name.toLowerCase().includes(q.toLowerCase()) || m.url.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className={styles.modalBack} onClick={onClose} role="dialog" aria-modal="true" aria-label="Choose an image">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHead}>
          <h2 className={styles.cardTitle}>Choose an image</h2>
          <button type="button" className={styles.btnSmall} onClick={onClose}>
            Close
          </button>
        </div>
        <UploadZone
          onUploaded={(items) => {
            if (items.length === 1) onSelect(items[0].url);
            else {
              setTab("uploads");
              load();
            }
          }}
        />
        <div className={styles.row} style={{ marginBottom: "1rem" }}>
          <div className={styles.tabs} style={{ marginBottom: 0 }}>
            <button
              type="button"
              className={`${styles.tab} ${tab === "uploads" ? styles.tabActive : ""}`}
              onClick={() => setTab("uploads")}
            >
              Uploaded ({data?.uploads.length ?? "…"})
            </button>
            <button
              type="button"
              className={`${styles.tab} ${tab === "site" ? styles.tabActive : ""}`}
              onClick={() => setTab("site")}
            >
              Website images ({data?.site.length ?? "…"})
            </button>
          </div>
          <input
            className={`${styles.input} ${styles.search}`}
            placeholder="Search by name…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        {!data ? (
          <p className={styles.muted}>Loading…</p>
        ) : list.length === 0 ? (
          <p className={styles.muted}>Nothing here yet.</p>
        ) : (
          <div className={styles.mediaGrid}>
            {list.map((m) => (
              <button
                type="button"
                key={m.url}
                className={styles.mediaTile}
                onClick={() => onSelect(m.url)}
                title={m.name}
              >
                {m.url.endsWith(".pdf") ? (
                  <span className={styles.thumbEmpty}>PDF</span>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.url} alt="" loading="lazy" />
                )}
                <span className={styles.mediaName}>{m.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
