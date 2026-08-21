import type { CampsContent } from "@/data/outreachContent";
import StatCardsRow from "./StatCardsRow";
import styles from "./CampsHistory.module.css";

type CampsHistoryProps = {
  history: CampsContent["history"];
};

// Drop-cap narrative + the 3 milestone stat cards — Camps-only (its own
// specific content shape, though it reuses StatCardsRow for the cards).
export default function CampsHistory({ history }: CampsHistoryProps) {
  return (
    <section className={`${styles.wrap} wash-band`}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{history.eyebrow}</div>
        <h2 className={styles.heading}>{history.heading}</h2>
      </div>
      <div className={styles.body}>
        {history.paragraphs.map((paragraph, i) =>
          i === 0 ? (
            <p className={styles.paragraph} key={i}>
              <span className={styles.dropcap}>{paragraph.charAt(0)}</span>
              {paragraph.slice(1)}
            </p>
          ) : (
            <p className={styles.paragraph} key={i}>
              {paragraph}
            </p>
          ),
        )}
        <StatCardsRow cards={history.milestones} />
      </div>
    </section>
  );
}
