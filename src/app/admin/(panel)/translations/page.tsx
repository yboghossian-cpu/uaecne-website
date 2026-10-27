import TranslationsTable from "@/components/admin/TranslationsTable";
import { translationRows } from "@/lib/i18n/admin";
import { getSettings } from "@/lib/server/settings";
import styles from "@/components/admin/admin.module.css";

export const dynamic = "force-dynamic";

export default function TranslationsPage() {
  const rows = translationRows();
  const live = getSettings().armenianLive;
  return (
    <>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Translations</h1>
          <p className={styles.subtitle}>
            Every English text on the public site and its Western Armenian version. Drafts show on the Armenian site
            straight away; “Approve” marks a text as checked. The Armenian site is{" "}
            <strong>{live ? "public" : "hidden from visitors"}</strong> (Settings › Armenian version).
          </p>
        </div>
        <div className={styles.row}>
          <a href="/?lang=hy" target="_blank" rel="noreferrer" className={styles.btnGhost}>
            Preview Armenian
          </a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- separate root layout / file download: full page load */}
          <a href="/admin/api/translations" className={styles.btnGhost}>
            Download all
          </a>
        </div>
      </div>
      <TranslationsTable rows={rows} />
    </>
  );
}
