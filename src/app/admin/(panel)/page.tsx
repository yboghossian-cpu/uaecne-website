import Link from "next/link";
import { requireDb } from "@/lib/server/db";
import { getChurches, getSchools } from "@/lib/server/content";
import { getAllPostsForAdmin } from "@/lib/server/posts";
import { mailConfigured } from "@/lib/server/mail";
import styles from "@/components/admin/admin.module.css";

export default function Dashboard() {
  const db = requireDb();
  const count = (sql: string) => (db.prepare(sql).get() as { n: number }).n;
  const unread = count("SELECT COUNT(*) AS n FROM submissions WHERE status = 'new'");
  const edited = count("SELECT COUNT(*) AS n FROM docs");
  const media = count("SELECT COUNT(*) AS n FROM media");
  const posts = getAllPostsForAdmin();
  const recent = db
    .prepare("SELECT id, form, name, subject, status, created_at FROM submissions ORDER BY id DESC LIMIT 5")
    .all() as { id: number; form: string; name: string; subject: string; status: string; created_at: string }[];
  const recentEdits = db
    .prepare("SELECT collection, key, updated_at FROM docs ORDER BY updated_at DESC LIMIT 5")
    .all() as { collection: string; key: string; updated_at: string }[];

  return (
    <>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Everything on the website, in one place.</p>
        </div>
        <div className={styles.row}>
          <Link href="/admin/news/new" className={styles.btn}>
            + New post
          </Link>
          <Link href="/admin/media" className={styles.btnGhost}>
            Upload photos
          </Link>
        </div>
      </div>

      <div className={styles.stats}>
        <Link href="/admin/inbox" className={styles.stat}>
          <span className={styles.statNum}>{unread}</span>
          <span className={styles.statLabel}>Unread messages</span>
        </Link>
        <Link href="/admin/news" className={styles.stat}>
          <span className={styles.statNum}>{posts.filter((p) => p.published).length}</span>
          <span className={styles.statLabel}>Published posts</span>
        </Link>
        <Link href="/admin/churches" className={styles.stat}>
          <span className={styles.statNum}>{getChurches().length}</span>
          <span className={styles.statLabel}>Churches</span>
        </Link>
        <Link href="/admin/schools" className={styles.stat}>
          <span className={styles.statNum}>{getSchools().length}</span>
          <span className={styles.statLabel}>Schools</span>
        </Link>
        <Link href="/admin/media" className={styles.stat}>
          <span className={styles.statNum}>{media}</span>
          <span className={styles.statLabel}>Uploaded files</span>
        </Link>
        <div className={styles.stat}>
          <span className={styles.statNum}>{edited}</span>
          <span className={styles.statLabel}>Pages edited here</span>
        </div>
      </div>

      {!mailConfigured() && (
        <div className={styles.card}>
          <p className={styles.msgErr}>
            Email notifications are off: form messages are saved in the Inbox but not emailed. Add the Gmail app
            password on the server to switch them on (see the deployment guide).
          </p>
        </div>
      )}

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Latest messages</h2>
        {recent.length === 0 ? (
          <p className={styles.muted}>No messages yet.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <tbody>
                {recent.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <Link href={`/admin/inbox/${r.id}`}>{r.name}</Link>
                      <div className={styles.muted}>{r.subject || (r.form === "prayer" ? "Prayer request" : "")}</div>
                    </td>
                    <td>
                      {r.status === "new" ? (
                        <span className={styles.pill}>New</span>
                      ) : (
                        <span className={styles.pillGrey}>{r.status}</span>
                      )}
                    </td>
                    <td className={styles.muted}>{r.created_at.slice(0, 16)} UTC</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Recently edited pages</h2>
        {recentEdits.length === 0 ? (
          <p className={styles.muted}>No pages edited from the admin yet.</p>
        ) : (
          <ul style={{ listStyle: "none", display: "grid", gap: "0.4rem" }}>
            {recentEdits.map((e) => {
              const kind = e.collection.startsWith("church") ? "churches" : "schools";
              return (
                <li key={`${e.collection}/${e.key}`}>
                  <Link href={`/admin/${kind}/${e.key}`} style={{ color: "var(--color-red)" }}>
                    {e.key}
                  </Link>{" "}
                  <span className={styles.muted}>— {e.updated_at.slice(0, 16)} UTC</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
