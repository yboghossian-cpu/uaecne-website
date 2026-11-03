import { getT } from "@/lib/i18n/server";
import PublicForm from "@/components/forms/PublicForm";
import { institution, type InstitutionKind } from "@/lib/server/institutionEmail";
import styles from "./InstitutionMessage.module.css";

// "Send a Message" section on every church and school page. The message is
// emailed to the address(es) on the page's own contact card; pages with no
// email on file show nothing. If the email can't be sent, the visitor is
// told so (see formActions) — never that it reached the church or school.
export default async function InstitutionMessage({ kind, slug }: { kind: InstitutionKind; slug: string }) {
  const target = institution(kind, slug);
  if (!target?.emails.length) return null;
  const tx = await getT();
  return (
    <section className={styles.section}>
      <div className={styles.split}>
        <div className={styles.head}>
          <div className={styles.eyebrow}>{tx("Contact")}</div>
          <h2 className={styles.heading}>{tx("Send a Message")}</h2>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.note}>
            {kind === "church"
              ? tx("Your message goes directly to the church office, which will reply to you by email.")
              : tx("Your message goes directly to the school office, which will reply to you by email.")}
          </p>
        </div>
        <div className={styles.card}>
          <PublicForm form={kind} slug={slug} />
        </div>
      </div>
    </section>
  );
}
