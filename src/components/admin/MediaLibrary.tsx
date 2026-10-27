"use client";

import { useCallback, useEffect, useState } from "react";
import { deleteMedia, listMedia, updateMediaAlt, type MediaItem } from "@/app/admin/actions";
import { UploadZone } from "./MediaPicker";
import styles from "./admin.module.css";

export default function MediaLibrary() {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [sel, setSel] = useState<MediaItem | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; message: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => setItems((await listMedia()).uploads), []);
  useEffect(() => {
    listMedia().then((r) => setItems(r.uploads));
  }, []);

  return (
    <>
      <section className={styles.card}>
        <UploadZone
          onUploaded={() => {
            load();
          }}
        />
        {!items ? (
          <p className={styles.muted}>Loading…</p>
        ) : items.length === 0 ? (
          <p className={styles.muted}>
            No uploads yet. Photos already on the website can be picked from any image field.
          </p>
        ) : (
          <div className={styles.mediaGrid}>
            {items.map((m) => (
              <button
                type="button"
                key={m.url}
                className={styles.mediaTile}
                onClick={() => {
                  setSel(m);
                  setMsg(null);
                  setCopied(false);
                }}
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
      </section>

      {sel && (
        <div className={styles.modalBack} onClick={() => setSel(null)} role="dialog" aria-modal="true">
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <div className={styles.modalHead}>
              <h2 className={styles.cardTitle} style={{ overflowWrap: "anywhere" }}>
                {sel.name}
              </h2>
              <button type="button" className={styles.btnSmall} onClick={() => setSel(null)}>
                Close
              </button>
            </div>
            {!sel.url.endsWith(".pdf") && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={sel.url} alt="" style={{ width: "100%", borderRadius: 10, marginBottom: "1rem" }} />
            )}
            <dl className={styles.dl}>
              <dt>Address</dt>
              <dd>{sel.url}</dd>
              {sel.width && (
                <>
                  <dt>Size</dt>
                  <dd>
                    {sel.width} × {sel.height} px
                  </dd>
                </>
              )}
            </dl>
            <label className={styles.field}>
              <span className={styles.label}>Description (for screen readers)</span>
              <input
                className={styles.input}
                defaultValue={sel.alt}
                onBlur={(e) => sel.id && updateMediaAlt(sel.id, e.target.value)}
              />
            </label>
            <div className={styles.row}>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={() => {
                  navigator.clipboard?.writeText(sel.url);
                  setCopied(true);
                }}
              >
                {copied ? "Copied" : "Copy address"}
              </button>
              <a href={sel.url} target="_blank" rel="noopener" className={styles.btnGhost}>
                Open
              </a>
              <button
                type="button"
                className={styles.btnDanger}
                onClick={async () => {
                  if (!sel.id || !confirm("Delete this file permanently?")) return;
                  const r = await deleteMedia(sel.id);
                  setMsg(r);
                  if (r.ok) {
                    setSel(null);
                    load();
                  }
                }}
              >
                Delete
              </button>
            </div>
            {msg && (
              <p className={msg.ok ? styles.msgOk : styles.msgErr} style={{ marginTop: "0.75rem" }}>
                {msg.message}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
