"use client";

import { useKeepForm } from "@/lib/useKeepForm";
import { useState } from "react";
import { savePost } from "@/app/admin/actions";
import type { Post } from "@/lib/server/posts";
import MediaPicker from "./MediaPicker";
import styles from "./admin.module.css";

export default function PostForm({ post }: { post: Post | null }) {
  const [state, onSubmit, pending] = useKeepForm(savePost, { ok: true, message: "" });
  const [kind, setKind] = useState(post?.kind ?? "news");
  const [cover, setCover] = useState(post?.cover ?? "");
  const [picking, setPicking] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="id" value={post?.id ?? 0} />
      <section className={styles.card}>
        <div className={styles.tabs}>
          {(["news", "event"] as const).map((k) => (
            <label
              key={k}
              className={`${styles.tab} ${kind === k ? styles.tabActive : ""}`}
              style={{ cursor: "pointer" }}
            >
              <input type="radio" name="kind" value={k} checked={kind === k} onChange={() => setKind(k)} hidden />
              {k === "news" ? "News article" : "Event"}
            </label>
          ))}
        </div>
        <label className={styles.field}>
          <span className={styles.label}>Title *</span>
          <input name="title" required defaultValue={post?.title} className={styles.input} maxLength={200} />
        </label>
        <div className={styles.grid2}>
          <label className={styles.field}>
            <span className={styles.label}>Small heading above the title (optional)</span>
            <input
              name="kicker"
              defaultValue={post?.kicker}
              className={styles.input}
              placeholder="e.g. June 2026 · General Assembly"
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Photo tag (optional)</span>
            <input name="tag" defaultValue={post?.tag} className={styles.input} placeholder="e.g. Beirut" />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Publication date</span>
            <input name="date" type="date" defaultValue={post?.date ?? today} className={styles.input} />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Page address</span>
            <input name="slug" defaultValue={post?.slug} className={styles.input} placeholder="made from the title" />
          </label>
        </div>
        {kind === "event" && (
          <div className={styles.grid2}>
            <label className={styles.field}>
              <span className={styles.label}>Starts</span>
              <input
                name="event_start"
                type="datetime-local"
                defaultValue={post?.event_start ?? ""}
                className={styles.input}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Ends (optional)</span>
              <input
                name="event_end"
                type="datetime-local"
                defaultValue={post?.event_end ?? ""}
                className={styles.input}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Location</span>
              <input name="location" defaultValue={post?.location} className={styles.input} />
            </label>
          </div>
        )}
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Cover photo</h2>
        <input type="hidden" name="cover" value={cover} />
        <div className={styles.imageField} style={{ gridTemplateColumns: "160px 1fr" }}>
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt="" className={styles.thumb} style={{ width: 160, height: 110 }} />
          ) : (
            <span className={styles.thumbEmpty} style={{ width: 160, height: 110 }}>
              No photo
            </span>
          )}
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <div className={styles.row}>
              <button type="button" className={styles.btnGhost} onClick={() => setPicking(true)}>
                Choose / upload photo
              </button>
              {cover && (
                <button type="button" className={styles.btnSmall} onClick={() => setCover("")}>
                  Remove
                </button>
              )}
            </div>
            <label className={styles.field}>
              <span className={styles.label}>Photo description (for screen readers)</span>
              <input name="cover_alt" defaultValue={post?.cover_alt} className={styles.input} />
            </label>
          </div>
        </div>
        {picking && (
          <MediaPicker
            onClose={() => setPicking(false)}
            onSelect={(u) => {
              setCover(u);
              setPicking(false);
            }}
          />
        )}
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Text</h2>
        <label className={styles.field}>
          <span className={styles.label}>Summary</span>
          <textarea name="excerpt" defaultValue={post?.excerpt} rows={4} className={styles.textarea} maxLength={900} />
          <span className={styles.help}>Shown on cards and on the homepage. Two or three sentences.</span>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Full text</span>
          <textarea name="body" defaultValue={post?.body} rows={14} className={styles.textarea} />
          <span className={styles.help}>
            Leave an empty line between paragraphs. Start a line with “## ” for a subheading.
          </span>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Link instead of a full article (optional)</span>
          <input
            name="link"
            defaultValue={post?.link ?? ""}
            className={styles.input}
            placeholder="/resource-center/… or https://…"
          />
          <span className={styles.help}>If set, “Read more” opens this page instead of the full text above.</span>
        </label>
      </section>

      <div className={styles.saveBar}>
        <label className={styles.check} style={{ margin: 0 }}>
          <input type="checkbox" name="published" defaultChecked={post ? Boolean(post.published) : true} />
          Published
        </label>
        <label className={styles.check} style={{ margin: 0 }}>
          <input type="checkbox" name="featured" defaultChecked={Boolean(post?.featured)} />
          Feature on homepage
        </label>
        <button className={styles.btn} disabled={pending}>
          {pending ? "Saving…" : "Save post"}
        </button>
        {state.message && <span className={state.ok ? styles.msgOk : styles.msgErr}>{state.message}</span>}
      </div>
    </form>
  );
}
