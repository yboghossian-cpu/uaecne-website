import Link from "next/link";
import { requireDb } from "@/lib/server/db";
import styles from "@/components/admin/admin.module.css";

type Row = {
  id: number;
  form: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
};

const FILTERS = [
  { key: "inbox", label: "Inbox", where: "status != 'archived'" },
  { key: "new", label: "Unread", where: "status = 'new'" },
  { key: "contact", label: "Contact", where: "form = 'contact' AND status != 'archived'" },
  { key: "prayer", label: "Prayer requests", where: "form = 'prayer' AND status != 'archived'" },
  { key: "archived", label: "Archived", where: "status = 'archived'" },
];

export default async function Inbox({ searchParams }: { searchParams: Promise<{ f?: string }> }) {
  const { f = "inbox" } = await searchParams;
  const filter = FILTERS.find((x) => x.key === f) ?? FILTERS[0];
  const rows = requireDb()
    .prepare(
      `SELECT id, form, name, email, subject, message, status, created_at FROM submissions WHERE ${filter.where} ORDER BY id DESC LIMIT 500`,
    )
    .all() as Row[];
  return (
    <>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Inbox</h1>
          <p className={styles.subtitle}>Messages sent from the Contact and Prayer Request forms.</p>
        </div>
      </div>
      <div className={styles.tabs}>
        {FILTERS.map((x) => (
          <Link
            key={x.key}
            href={`/admin/inbox?f=${x.key}`}
            className={`${styles.tab} ${x.key === filter.key ? styles.tabActive : ""}`}
          >
            {x.label}
          </Link>
        ))}
      </div>
      <section className={styles.card}>
        {rows.length === 0 ? (
          <p className={styles.muted}>No messages here.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>From</th>
                  <th>Message</th>
                  <th>Received</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} style={r.status === "new" ? { background: "#fffaf0" } : undefined}>
                    <td>
                      <Link href={`/admin/inbox/${r.id}`}>{r.name}</Link>
                      <div className={styles.muted}>{r.email}</div>
                    </td>
                    <td>
                      {r.status === "new" && <span className={styles.pill}>New</span>}{" "}
                      {r.form === "prayer" && <span className={styles.pillGold}>Prayer</span>}{" "}
                      <strong>{r.subject}</strong>
                      <div className={styles.muted}>
                        {r.message.slice(0, 140)}
                        {r.message.length > 140 ? "…" : ""}
                      </div>
                    </td>
                    <td className={styles.muted} style={{ whiteSpace: "nowrap" }}>
                      {r.created_at.slice(0, 16)} UTC
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
