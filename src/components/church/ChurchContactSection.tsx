import type { Church } from "@/data/churches";
import type { ChurchContent } from "@/data/churchContent";
import styles from "./ChurchContactSection.module.css";

// Derived from ChurchContent so the two never drift apart (see
// churchContent.ts's own field comment for the full render-rule
// explanation: string = override, null = suppress, absent = fall through).
type ContactOverride = ChurchContent["contactOverride"];

type ChurchContactSectionProps = {
  church: Church;
  contactOverride: ContactOverride;
};

// Two cards ("Our Location" / "Get in Touch") built from churches.ts's
// directory fields (address, phone, secretary, serviceTime). `contactOverride`
// patches specific fields when a reference file's own supplied contact data
// conflicts with churches.ts (see OPEN_QUESTIONS.md #30 for email, #31 for
// address) — start from churches.ts, then spread the override on top; only
// its set keys change. An explicit `email: null` suppresses the email row
// entirely (see OPEN_QUESTIONS.md #34, Nor Marash).
export default function ChurchContactSection({
  church,
  contactOverride,
}: ChurchContactSectionProps) {
  const phone = contactOverride?.phone ?? church.phone;
  const secretary = contactOverride?.secretary ?? church.secretary;
  const hasEmailOverride = contactOverride
    ? Object.prototype.hasOwnProperty.call(contactOverride, "email")
    : false;
  const emailField = hasEmailOverride ? contactOverride!.email : church.email;
  const emails = (emailField ?? "")
    .split("\n")
    .map((e) => e.trim())
    .filter(Boolean);
  const addressField = contactOverride?.address ?? church.address;
  const addressLines = addressField.split("\n").filter(Boolean);
  const showLocationCard = !contactOverride?.hideLocationCard;

  return (
    <section className={styles.contact}>
      <div
        className={
          showLocationCard ? styles.grid : `${styles.grid} ${styles.gridSingle}`
        }
      >
        {showLocationCard && (
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
              {addressLines.map((line, i) => (
                <span key={i} className={styles.addressLine}>
                  {line}
                </span>
              ))}
            </span>
          </div>
          {church.serviceTime && (
            <div className={styles.row}>
              <svg className={styles.rowIco}>
                <use href="#ic-dot" />
              </svg>
              <span>
                <span className={styles.key}>Service Time</span>
                {church.serviceTime}
              </span>
            </div>
          )}
          <div className={styles.spacer} />
          <span className={styles.mapBtn} role="link" aria-disabled="true">
            View on Maps
          </span>
        </div>
        )}

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.icoWrap}>
              <svg className={styles.ico}>
                <use href="#ic-mail" />
              </svg>
            </span>
            <h3 className={styles.cardTitle}>Get in Touch</h3>
          </div>
          {phone && (
            <div className={styles.row}>
              <svg className={styles.rowIco}>
                <use href="#ic-phone" />
              </svg>
              <span>
                <span className={styles.key}>Phone</span>
                {phone}
              </span>
            </div>
          )}
          {emails.map((email, i) => (
            <div className={styles.row} key={email}>
              <svg className={styles.rowIco}>
                <use href="#ic-mail" />
              </svg>
              <span>
                <span className={styles.key}>
                  {emails.length > 1 ? `Email ${i + 1}` : "Email"}
                </span>
                <a href={`mailto:${email}`} className={styles.link}>
                  {email}
                </a>
              </span>
            </div>
          ))}
          {secretary && (
            <div className={styles.row}>
              <svg className={styles.rowIco}>
                <use href="#ic-user" />
              </svg>
              <span>
                <span className={styles.key}>Secretary</span>
                {secretary}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
