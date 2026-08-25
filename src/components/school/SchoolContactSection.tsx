import type { SchoolContent, SchoolContactRow } from "@/data/schoolContent";
import styles from "./SchoolContactSection.module.css";

type SchoolContactSectionProps = {
  location: SchoolContent["location"];
  contactRows: SchoolContactRow[] | null;
  // Required only to build the real Maps address-search link below — not
  // rendered anywhere in this component otherwise.
  schoolName: string;
};

// Icon keyed by row label, not just presence of an href — a pending Phone
// row still shows the phone icon, not a fallback person icon.
const ROW_ICON: Record<string, string> = {
  Phone: "#ic-phone",
  Email: "#ic-mail",
  Secretary: "#ic-user",
  Fax: "#ic-phone",
  Facebook: "#ic-fb",
  Instagram: "#ic-ig",
};

// "Our Location" / "Get in Touch" — same card shape as
// ChurchContactSection, but schools.ts carries no directory contact fields
// at all, so both cards are wholly sourced from SchoolContent and each
// independently nullable. Renders nothing when both are null (validated by
// Shamlian-Tatikian, which has neither).
export default function SchoolContactSection({
  location,
  contactRows,
  schoolName,
}: SchoolContactSectionProps) {
  if (!location && !contactRows) return null;

  const showBoth = location && contactRows;
  // Real, functional address-search link — not a pin/coordinate (never
  // invented). Query is the school's own real name + its first address
  // line, exactly the pattern the Aleppo College for Girls mockup already
  // uses for its own Google Maps button. Exact per-unit Maps links (a
  // curated place link, not a generic address search) are pending from
  // Yeghia in a single later sweep — see OPEN_QUESTIONS.
  const mapsUrl = location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${schoolName} ${location.addressLines[0] ?? ""}`,
      )}`
    : null;

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
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapBtn}
              >
                <svg className={styles.mapBtnIcon}>
                  <use href="#ic-pin" />
                </svg>
                View on Maps
              </a>
            )}
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
