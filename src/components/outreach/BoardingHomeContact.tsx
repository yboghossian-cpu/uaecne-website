import { getT } from "@/lib/i18n/server";
import type { BoardingHomeContent } from "@/data/outreachContent";
import SocialLinks from "@/components/shared/SocialLinks";
import styles from "./BoardingHomeContact.module.css";

type BoardingHomeContactProps = {
  contact: BoardingHomeContent["contact"];
};

// Honest compact contact block — Location (real) + Office (Director real,
// Phone/Email genuinely pending, never a fabricated value or a dead link),
// matching the mockup's .contact-wrap exactly (including its own
// "Location"/"Office" heading text — built fresh, not routed through
// SchoolContactSection's hardcoded "Our Location"/"Get in Touch" labels).
export default async function BoardingHomeContact({ contact }: BoardingHomeContactProps) {
  const tx = await getT();
  return (
    <section className={`${styles.section} wash-band`}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{contact.eyebrow}</div>
        <h2 className={styles.heading}>{contact.heading}</h2>
      </div>
      <div className={styles.wrap}>
        <div className={styles.grid}>
          <div className={styles.blk}>
            <h4>{tx("Location")}</h4>
            <div className={styles.crow}>
              <span className={styles.v}>{contact.location}</span>
            </div>
            <SocialLinks social={contact.social} name={tx("Armenian Evangelical Boarding Home of Anjar")} />
          </div>
          <div className={styles.blk}>
            <h4>{tx("Office")}</h4>
            <div className={styles.crow}>
              <span className={styles.k}>{contact.directorLabel}</span>
              <span className={styles.v}>{contact.director}</span>
            </div>
            <div className={styles.crow}>
              <span className={styles.k}>{tx("Phone:")}</span>
              <span className={styles.pend}>{tx("Pending")}</span>
            </div>
            <div className={styles.crow}>
              <span className={styles.k}>{tx("Email:")}</span>
              <span className={styles.pend}>{tx("Pending")}</span>
            </div>
          </div>
        </div>
        <div className={styles.note}>{contact.note}</div>
      </div>
    </section>
  );
}
