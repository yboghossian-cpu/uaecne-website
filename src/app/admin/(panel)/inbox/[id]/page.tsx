import Link from "next/link";
import { notFound } from "next/navigation";
import { requireDb } from "@/lib/server/db";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { deleteSubmission, setSubmissionStatus } from "../../../actions";
import styles from "@/components/admin/admin.module.css";

type Row = {
  id: number;
  form: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  extra: string;
  status: string;
  email_status: string;
  created_at: string;
};

export default async function Message({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  const db = requireDb();
  const row = db.prepare("SELECT * FROM submissions WHERE id = ?").get(id) as Row | undefined;
  if (!row) notFound();
  if (row.status === "new") db.prepare("UPDATE submissions SET status = 'read' WHERE id = ?").run(id);
  let extra: { confidential?: boolean } = {};
  try {
    extra = JSON.parse(row.extra);
  } catch {}
  const subject = row.form === "prayer" ? "Your prayer request" : row.subject || "Your message to the UAECNE";

  return (
    <>
      <div className={styles.pageHead}>
        <div>
          <p className={styles.crumbs}>
            <Link href="/admin/inbox">Inbox</Link>
          </p>
          <h1 className={styles.title}>{row.form === "prayer" ? "Prayer request" : row.subject || "Message"}</h1>
          <p className={styles.subtitle}>
            From {row.name} · {row.created_at.slice(0, 16)} UTC
          </p>
        </div>
      </div>
      <section className={styles.card}>
        <dl className={styles.dl}>
          <dt>Name</dt>
          <dd>{row.name}</dd>
          {row.email && (
            <>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${row.email}`}>{row.email}</a>
              </dd>
            </>
          )}
          {row.phone && (
            <>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${row.phone.replace(/[^\d+]/g, "")}`}>{row.phone}</a>
              </dd>
            </>
          )}
          {row.form === "prayer" && (
            <>
              <dt>Confidential</dt>
              <dd>{extra.confidential ? "Yes — please keep private" : "No"}</dd>
            </>
          )}
          <dt>Email alert</dt>
          <dd className={styles.muted}>{row.email_status}</dd>
        </dl>
        <div className={styles.message}>{row.message}</div>
        <div className={styles.row} style={{ marginTop: "1.25rem" }}>
          {row.email && (
            <a className={styles.btn} href={`mailto:${row.email}?subject=${encodeURIComponent(`Re: ${subject}`)}`}>
              Reply by email
            </a>
          )}
          {row.status !== "archived" ? (
            <ConfirmButton
              label="Archive"
              confirmText=""
              className={styles.btnGhost}
              action={async () => {
                "use server";
                await setSubmissionStatus(id, "archived");
              }}
              refresh
            />
          ) : (
            <ConfirmButton
              label="Move back to inbox"
              confirmText=""
              className={styles.btnGhost}
              action={async () => {
                "use server";
                await setSubmissionStatus(id, "read");
              }}
              refresh
            />
          )}
          <ConfirmButton
            label="Mark as unread"
            confirmText=""
            className={styles.btnSmall}
            action={async () => {
              "use server";
              await setSubmissionStatus(id, "new");
            }}
          />
          <ConfirmButton
            label="Delete"
            confirmText="Delete this message permanently?"
            className={styles.btnDanger}
            action={async () => {
              "use server";
              await deleteSubmission(id);
            }}
          />
        </div>
      </section>
    </>
  );
}
