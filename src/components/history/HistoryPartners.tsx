import { historyContent } from "@/data/historyContent";
import Reveal from "./Reveal";
import styles from "./HistoryPartners.module.css";

// Partners & Memberships grid (AMAA/AEWC/WCC/WCRC/MECC/FMEEC), matching
// the mockup's .mem-grid.
export default function HistoryPartners() {
  const { eyebrow, heading, intro } = historyContent.partnersHead;
  const { partners } = historyContent;

  return (
    <section className={styles.section}>
      <Reveal>
        <div className={styles.centerHead}>
          <div className={styles.eyebrow}>{eyebrow}</div>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.intro}>{intro}</p>
        </div>
        <div className={styles.memGrid}>
          {partners.map((partner) => (
            <div key={partner.ab} className={styles.mem}>
              <span className={styles.ab}>{partner.ab}</span>
              <span className={styles.memText}>
                <b>{partner.name}</b>
                <span>{partner.blurb}</span>
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
