import { historyContent } from "@/data/historyContent";
import Reveal from "./Reveal";
import styles from "./HistoryGovernance.module.css";

// Governance close — President (1) / Central Committee (12), matching
// the mockup's .gov section.
export default function HistoryGovernance() {
  const { eyebrow, heading, intro, cards } = historyContent.governance;

  return (
    <section className={`${styles.section} ${styles.wash}`}>
      <Reveal className={styles.gov}>
        <div className={styles.eyebrow}>{eyebrow}</div>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.intro}>{intro}</p>
        <div className={styles.two}>
          {cards.map((card) => (
            <div key={card.t} className={styles.gc}>
              <div className={styles.n}>{card.n}</div>
              <div className={styles.t}>{card.t}</div>
              <p>{card.p}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
