import type { SchoolContent, SchoolContactRow } from "@/data/schoolContent";
import styles from "./SchoolContactSection.module.css";

type SchoolContactSectionProps = {
  location: SchoolContent["location"];
  contactRows: SchoolContactRow[] | null;
};

// Icon keyed by row label, not just presence of an href — a pending Phone
// row still shows the phone icon, not a fallback person icon.
const ROW_ICON: Record<string, string> = {
  Phone: "#ic-phone",
  Email: "#ic-mail",
  Secretary: "#ic-user",
};

// "Our Location" / "Get in Touch" — same card shape as
// ChurchContactSection, but schools.ts carries no directory contact fields
// at all, so both cards are wholly sourced from SchoolContent and each
// independently nullable. Renders nothing when both are null (validated by
// Shamlian-Tatikian, which has neither).
export default function SchoolContactSection({
  location,
  contactRows,
}: SchoolContactSectionProps) {
  if (!location && !contactRows) return null;

  const showBoth = location && contactRows;

  return (
    <section className={`${styles.contact} wash-band`}>
      <div className={showBoth ? styles.grid : `${styles.grid} ${styles.gridSingle}`}>
        {location && (
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <span className={styles.icoWrap}>
                <svg className={styles.ico}>
                  <use href="#ic-pin" />
                </svg>
              </span>
              <h3 className={styles.cardTitle}>Our Location</h3>
            </div>
            <div className={styles.row}>
              <svg className={styles.rowIco}>
                <use href="#ic-pin" />
              </svg>
              <span>
                <span className={styles.key}>Address</span>
                {location.addressLines.map((line, i) => (
                  <span key={i} className={styles.addressLine}>
                    {line}
                  </span>
                ))}
              </span>
            </div>
            <div className={styles.spacer} />
            <span className={styles.mapBtn} role="link" aria-disabled="true">
              View on Maps
            </span>
          </div>
        )}

        {contactRows && (
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <span className={styles.icoWrap}>
                <svg className={styles.ico}>
                  <use href="#ic-mail" />
                </svg>
              </span>
              <h3 className={styles.cardTitle}>Get in Touch</h3>
            </div>
            {contactRows.map((row, i) => (
              <div className={styles.row} key={i}>
                <svg className={styles.rowIco}>
                  <use href={ROW_ICON[row.key] ?? (row.href ? "#ic-mail" : "#ic-user")} />
                </svg>
                <span>
                  <span className={styles.key}>{row.key}</span>
                  {row.href ? (
                    <a href={row.href} className={styles.link}>
                      {row.value}
                    </a>
                  ) : row.pending ? (
                    <em className={styles.pending}>{row.value}</em>
                  ) : (
                    row.value
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
