import { getT } from "@/lib/i18n/server";
import type { Church } from "@/data/churches";
import type { ChurchContent } from "@/data/churchContent";
import SocialLinks from "@/components/shared/SocialLinks";
import { hasSocial } from "@/lib/social";
import styles from "./ChurchContactSection.module.css";

// Derived from ChurchContent so the two never drift apart (see
// churchContent.ts's own field comment for the full render-rule
// explanation: string = override, null = suppress, absent = fall through).
type ContactOverride = ChurchContent["contactOverride"];

type ChurchContactSectionProps = {
  church: Church;
  contactOverride: ContactOverride;
  // From the locked template (src/lib/churchTemplate.ts): formatted service
  // time, or where the congregation now worships. null = "Pending" — the row
  // always shows, so every church's location card has the same rows.
  serviceTime: string | null;
  // English name + address for the Google Maps search (works in both languages).
  mapsQuery?: string;
};

// Icon keyed by social row label, mirroring SchoolContactSection's ROW_ICON.
// Facebook is listed for completeness even though its row is rendered
// separately from its own typed field.
const SOCIAL_ICON: Record<string, string> = {
  Facebook: "#ic-fb",
  Instagram: "#ic-ig",
  YouTube: "#ic-yt",
  Website: "#ic-globe",
};

// Two cards ("Our Location" / "Get in Touch") built from churches.ts's
// directory fields (address, phone, secretary, serviceTime). `contactOverride`
// patches specific fields when a reference file's own supplied contact data
// conflicts with churches.ts (see OPEN_QUESTIONS.md #30 for email, #31 for
// address) — start from churches.ts, then spread the override on top; only
// its set keys change. An explicit `email: null` suppresses the email row
// entirely (see OPEN_QUESTIONS.md #34, Nor Marash).
export default async function ChurchContactSection({
  church,
  contactOverride,
  serviceTime,
  mapsQuery,
}: ChurchContactSectionProps) {
  const tx = await getT();
  const phonePending = contactOverride?.phonePending ?? false;
  const emailPending = contactOverride?.emailPending ?? false;
  const phone = contactOverride?.phone ?? church.phone;
  const secretary = contactOverride?.secretary ?? church.secretary;
  const secretaryLabel = contactOverride?.secretaryLabel ?? "Secretary";
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
  const note = contactOverride?.note;
  // Real, functional address-search link — not a pin/coordinate (never
  // invented). Query is the church's own real name + its first address
  // line, exactly the pattern the Aleppo College for Girls mockup already
  // uses for its own Google Maps button. Exact per-unit Maps links (a
  // curated place link, not a generic address search) are pending from
  // Yeghia in a single later sweep — see OPEN_QUESTIONS.
  const mapsUrl =
    contactOverride?.mapsUrl ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      mapsQuery ?? `${church.name} ${addressLines[0] ?? ""}`,
    )}`;
  const otherServices = contactOverride?.otherServices ?? [];
  const emailLabels = contactOverride?.emailLabels ?? [];
  const fax = contactOverride?.fax;
  // Verified social accounts live on the directory entry and are shown
  // under "Our Location"; the older per-page Facebook/social rows in
  // "Get in Touch" are then not repeated.
  const social = hasSocial(church.social) ? church.social : null;

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
            <h3 className={styles.cardTitle}>{tx("Our Location")}</h3>
          </div>
          <div className={styles.row}>
            <svg className={styles.rowIco}>
              <use href="#ic-pin" />
            </svg>
            <span>
              <span className={styles.key}>{tx("Address")}</span>
              {addressLines.map((line, i) => (
                <span key={i} className={styles.addressLine}>
                  {line}
                </span>
              ))}
            </span>
          </div>
          <div className={styles.row}>
            <svg className={styles.rowIco}>
              <use href="#ic-dot" />
            </svg>
            <span>
              <span className={styles.key}>{tx("Service Time")}</span>
              {serviceTime ?? <span className={styles.pending}>{tx("Pending")}</span>}
            </span>
          </div>
          {otherServices.length > 0 && (
            <div className={styles.row}>
              <svg className={styles.rowIco}>
                <use href="#ic-dot" />
              </svg>
              <span>
                <span className={styles.key}>{tx("Other Services")}</span>
                {otherServices.map((line) => (
                  <span key={line} className={styles.addressLine}>
                    {line}
                  </span>
                ))}
              </span>
            </div>
          )}
          <SocialLinks social={social} name={church.name} />
          <div className={styles.spacer} />
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.mapBtn}>
            <svg className={styles.mapBtnIcon}>
              <use href="#ic-pin" />
            </svg>
            {tx("View on Maps")}
          </a>
        </div>
        )}

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.icoWrap}>
              <svg className={styles.ico}>
                <use href="#ic-mail" />
              </svg>
            </span>
            <h3 className={styles.cardTitle}>{tx("Get in Touch")}</h3>
          </div>
          {phonePending ? (
            <div className={styles.row}>
              <svg className={styles.rowIco}>
                <use href="#ic-phone" />
              </svg>
              <span>
                <span className={styles.key}>{tx("Phone")}</span>
                <span className={styles.pending}>{tx("Pending")}</span>
              </span>
            </div>
          ) : (
            phone && (
              <div className={styles.row}>
                <svg className={styles.rowIco}>
                  <use href="#ic-phone" />
                </svg>
                <span>
                  <span className={styles.key}>{tx("Phone")}</span>
                  {phone}
                </span>
              </div>
            )
          )}
          {fax && (
            <div className={styles.row}>
              <svg className={styles.rowIco}>
                <use href="#ic-phone" />
              </svg>
              <span>
                <span className={styles.key}>{tx("Fax")}</span>
                {fax}
              </span>
            </div>
          )}
          {emailPending ? (
            <div className={styles.row}>
              <svg className={styles.rowIco}>
                <use href="#ic-mail" />
              </svg>
              <span>
                <span className={styles.key}>{tx("Email")}</span>
                <span className={styles.pending}>{tx("Pending")}</span>
              </span>
            </div>
          ) : (
            emails.map((email, i) => (
              <div className={styles.row} key={email}>
                <svg className={styles.rowIco}>
                  <use href="#ic-mail" />
                </svg>
                <span>
                  <span className={styles.key}>
                    {emailLabels[i]
                      ? `${tx("Email")} · ${tx(emailLabels[i])}`
                      : emails.length > 1
                        ? `${tx("Email")} ${i + 1}`
                        : tx("Email")}
                  </span>
                  <a href={`mailto:${email}`} className={styles.link}>
                    {email}
                  </a>
                </span>
              </div>
            ))
          )}
          {secretary && (
            <div className={styles.row}>
              <svg className={styles.rowIco}>
                <use href="#ic-user" />
              </svg>
              <span>
                <span className={styles.key}>{tx(secretaryLabel)}</span>
                {secretary}
              </span>
            </div>
          )}
          {!social && contactOverride?.facebook && (
            <div className={styles.row}>
              <svg className={styles.rowIco}>
                <use href="#ic-fb" />
              </svg>
              <span>
                <span className={styles.key}>{tx("Facebook")}</span>
                <a
                  href={contactOverride.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {contactOverride.facebook.label}
                </a>
              </span>
            </div>
          )}
          {!social &&
            contactOverride?.socials?.map((s) => (
              <div className={styles.row} key={s.key}>
                <svg className={styles.rowIco}>
                  <use href={SOCIAL_ICON[s.key]} />
                </svg>
                <span>
                  <span className={styles.key}>{tx(s.key)}</span>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {s.label}
                  </a>
                </span>
              </div>
            ))}
          {!showLocationCard && <SocialLinks social={social} name={church.name} />}
          {note && <div className={styles.note}>{note}</div>}
        </div>
      </div>
    </section>
  );
}
