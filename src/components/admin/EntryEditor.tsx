import Link from "next/link";
import { notFound } from "next/navigation";
import { baselineSamples, currentDoc, getChurch, getSchool, isBuiltIn, type Collection } from "@/lib/server/content";
import { requireDb } from "@/lib/server/db";
import { blankFor, inferShape, type Shape } from "@/lib/admin/shape";
import { deleteEntry, resetDoc, restoreRevision, saveDoc } from "@/app/admin/actions";
import DocEditor from "./DocEditor";
import ConfirmButton from "./ConfirmButton";
import styles from "./admin.module.css";

const PRIMARY: Record<Collection, string[]> = {
  "church-page": [
    "masthead",
    "heroPhoto",
    "logo",
    "factsBar",
    "about",
    "pastorCard",
    "leadership",
    "contactOverride",
    "history",
    "gallery",
  ],
  "school-page": [
    "masthead",
    "heroPhoto",
    "logo",
    "factsBar",
    "about",
    "principalCard",
    "leadership",
    "location",
    "contactRows",
    "gallery",
  ],
  "church-dir": [],
  "school-dir": [],
};

export default function EntryEditor({
  kind,
  slug,
  tab,
}: {
  kind: "church" | "school";
  slug: string;
  tab: "page" | "card";
}) {
  const entry = kind === "church" ? getChurch(slug) : getSchool(slug);
  if (!entry) notFound();
  const plural = kind === "church" ? "churches" : "schools";
  const collection: Collection = tab === "card" ? `${kind}-dir` : `${kind}-page`;
  const part = tab === "card" ? "dir" : "page";
  const { data, edited } = currentDoc(collection, slug);
  const shape: Shape = inferShape(baselineSamples(collection));
  const builtIn = isBuiltIn(kind, slug);
  const revisions = requireDb()
    .prepare("SELECT id, note, created_at FROM revisions WHERE collection = ? AND key = ? ORDER BY id DESC LIMIT 10")
    .all(collection, slug) as { id: number; note: string; created_at: string }[];

  const save = saveDoc.bind(null, kind, part, slug);
  const blank = { ...(blankFor(shape) as Record<string, unknown>), slug };

  return (
    <>
      <div className={styles.pageHead}>
        <div>
          <p className={styles.crumbs}>
            <Link href={`/admin/${plural}`}>{kind === "church" ? "Churches" : "Schools"}</Link> › {entry.country}
          </p>
          <h1 className={styles.title}>{entry.name}</h1>
          <p className={styles.subtitle}>
            /{plural}/{slug}{" "}
            {edited ? (
              <span className={styles.pillGold}>Edited in admin</span>
            ) : (
              <span className={styles.pillGrey}>Original</span>
            )}
          </p>
        </div>
        <a href={`/${plural}/${slug}`} target="_blank" rel="noopener" className={styles.btnGhost}>
          View live page ↗
        </a>
      </div>

      <div className={styles.tabs}>
        <Link href={`/admin/${plural}/${slug}`} className={`${styles.tab} ${tab === "page" ? styles.tabActive : ""}`}>
          Page content
        </Link>
        <Link
          href={`/admin/${plural}/${slug}?tab=card`}
          className={`${styles.tab} ${tab === "card" ? styles.tabActive : ""}`}
        >
          Directory card & contacts
        </Link>
      </div>

      {tab === "page" && !data ? (
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>No full page yet</h2>
          <p className={styles.cardHint}>
            This {kind} currently shows the short directory version of its page (from the “Directory card & contacts”
            tab). Start a full page to add an about text, history, leadership, photos and more.
          </p>
          <ConfirmButton
            label="Start a full page"
            confirmText=""
            className={styles.btn}
            action={async () => {
              "use server";
              return saveDoc(kind, "page", slug, JSON.stringify(blank));
            }}
            refresh
          />
        </section>
      ) : (
        <DocEditor
          key={`${collection}:${edited}:${revisions[0]?.id ?? 0}`}
          initial={data as Record<string, never>}
          shape={shape}
          onSave={save}
          primary={PRIMARY[collection]}
          readOnly={["slug", "id"]}
          flat={tab === "card"}
          liveUrl={`/${plural}/${slug}`}
        />
      )}

      <section className={styles.card} style={{ marginTop: "1.5rem" }}>
        <h2 className={styles.cardTitle}>History</h2>
        <p className={styles.cardHint}>Every save keeps the previous version. Restore one if something goes wrong.</p>
        {revisions.length === 0 ? (
          <p className={styles.muted}>No earlier versions yet.</p>
        ) : (
          <ul style={{ listStyle: "none", display: "grid", gap: "0.5rem", marginBottom: "1rem" }}>
            {revisions.map((r) => (
              <li key={r.id} className={styles.row}>
                <span className={styles.muted}>
                  {r.created_at.slice(0, 16)} UTC — version before: {r.note}
                </span>
                <ConfirmButton
                  label="Restore"
                  confirmText="Replace the current page with this earlier version?"
                  className={styles.btnSmall}
                  action={async () => {
                    "use server";
                    return restoreRevision(r.id);
                  }}
                  refresh
                />
              </li>
            ))}
          </ul>
        )}
        <div className={styles.row}>
          {builtIn && edited && (
            <ConfirmButton
              label="Reset to original"
              confirmText="Undo all admin edits on this tab and go back to the original version? (It is kept in History.)"
              className={styles.btnGhost}
              action={async () => {
                "use server";
                return resetDoc(kind, part, slug);
              }}
              refresh
            />
          )}
          {!builtIn && (
            <ConfirmButton
              label={`Delete this ${kind}`}
              confirmText={`Delete this ${kind} and its page permanently?`}
              className={styles.btnDanger}
              action={async () => {
                "use server";
                await deleteEntry(kind, slug);
                return { ok: true, message: "" };
              }}
            />
          )}
        </div>
      </section>
    </>
  );
}
