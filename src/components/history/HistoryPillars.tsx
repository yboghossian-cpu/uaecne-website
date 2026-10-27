import { getT, getL } from "@/lib/i18n/server";
import Link from "next/link";
import { historyContent as historyContent__en } from "@/data/historyContent";
import Reveal from "./Reveal";
import styles from "./HistoryPillars.module.css";

// Four thematic pillars (Education, Compassion, Social Outreach,
// Children & Youth), alternating arched photo-pending slots — matches the
// mockup's .pillars, each .prow individually revealed.
export default async function HistoryPillars() {
  const L = await getL();
  const historyContent = L(historyContent__en);
  const tx = await getT();
  const { eyebrow, heading } = historyContent.pillarsHead;
  const { pillars } = historyContent;

  return (
    <section className={styles.section}>
      <Reveal className={styles.centerHead}>
        <div className={styles.eyebrow}>{eyebrow}</div>
        <h2 className={styles.heading}>{heading}</h2>
        <div className={styles.flourish}>
          <span className={styles.ln} />
          <span className={styles.dia} />
          <span className={styles.ln} />
        </div>
      </Reveal>

      <div className={styles.pillars}>
        {pillars.map((pillar, i) => (
          <Reveal
            key={pillar.kick}
            className={`${styles.prow} ${i % 2 === 1 ? styles.rev : ""}`}
          >
            <div className={styles.pic}>
              <div className={styles.ph}>
                <svg className={styles.phIcon} viewBox="0 0 24 24" aria-hidden="true">
                  <use href={`#${pillar.icon}`} />
                </svg>
                <span>{tx("Archival photo pending")}</span>
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.kick}>{pillar.kick}</div>
              <h3 className={styles.title}>{pillar.title}</h3>
              {pillar.paragraphs.map((paragraph, pi) => (
                <p key={pi}>{paragraph}</p>
              ))}
              {pillar.ties.length > 0 && (
                <div className={styles.ties}>
                  {pillar.ties.map((tie) => (
                    <Link key={tie.href} className={styles.tie} href={tie.href}>
                      {tie.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
