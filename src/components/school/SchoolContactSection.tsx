import type { SchoolContent, SchoolContactRow } from "@/data/schoolContent";
import SocialLinks from "@/components/shared/SocialLinks";
import { hasSocial, type SocialLinks as Social } from "@/lib/social";
import styles from "./SchoolContactSection.module.css";

type SchoolContactSectionProps = {
  location: SchoolContent["location"];
  contactRows: SchoolContactRow[] | null;
  // Required only to build the real Maps address-search link below — not
  // rendered anywhere in this component otherwise.
  schoolName: string;
  // Opt-in italic footnote recording unresolved source discrepancies.
  // Omitted for every other school, which render exactly as before.
  note?: string | null;
  // Curated Google Maps place link; falls back to an address search.
  mapsUrl?: string | null;
  // Verified social accounts, shown under "Our Location".
  social?: Social | null;
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
  contactRows: contactRowsIn,
  schoolName,
  note,
  mapsUrl: curatedMapsUrl,
  social: socialIn,
}: SchoolContactSectionProps) {
  const social = hasSocial(socialIn) ? socialIn : null;
  // Facebook/Instagram rows in "Get in Touch" are replaced by the
  // "Follow Us" links under the location once verified links exist.
  const SOCIAL_ROWS = ["Facebook", "Instagram", "YouTube", "Website"];
  const filtered =
    social && contactRowsIn ? contactRowsIn.filter((r) => !SOCIAL_ROWS.includes(r.key)) : contactRowsIn;
  const contactRows = filtered && filtered.length ? filtered : social ? null : contactRowsIn;
  if (!location && !contactRows && !social) return null;

  const showBoth = location && contactRows;
  // Real, functional address-search link — not a pin/coordinate (never
  // invented). Query is the school's own real name + its first address
  // line, exactly the pattern the Aleppo College for Girls mockup already
  // uses for its own Google Maps button. Exact per-unit Maps links (a
  // curated place link, not a generic address search) are pending from
  // Yeghia in a single later sweep — see OPEN_QUESTIONS.
  const mapsUrl = curatedMapsUrl
    ? curatedMapsUrl
    : location
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
            {location.landmark && (
              <div className={styles.row}>
                <svg className={styles.rowIco}>
                  <use href="#ic-church" />
                </svg>
                <span>{location.landmark}</span>
              </div>
            )}
            <SocialLinks social={social} name={schoolName} />
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
            {!location && <SocialLinks social={social} name={schoolName} />}
          </div>
        )}

        {!location && !contactRows && social && (
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <span className={styles.icoWrap}>
                <svg className={styles.ico}>
                  <use href="#ic-globe" />
                </svg>
              </span>
              <h3 className={styles.cardTitle}>Online</h3>
            </div>
            <SocialLinks social={social} name={schoolName} />
          </div>
        )}
      </div>
      {note && <p className={styles.note}>{note}</p>}
    </section>
  );
}
