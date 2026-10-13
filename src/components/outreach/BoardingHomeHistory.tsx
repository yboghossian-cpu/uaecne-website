import type { BoardingHomeContent } from "@/data/outreachContent";
import styles from "./BoardingHomeHistory.module.css";

type BoardingHomeHistoryProps = {
  history: BoardingHomeContent["history"];
};

// Named era timeline (title + date-range + description), matching the
// mockup's .eras — a shape distinct from schoolContent.ts's
// academicHeritage.eras (bare period string, no separate name), which is
// why this page carries its own type rather than reusing that one.
export default function BoardingHomeHistory({ history }: BoardingHomeHistoryProps) {
  return (
    <section className={`${styles.section} wash-band`}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{history.eyebrow}</div>
        <h2 className={styles.heading}>{history.heading}</h2>
        <div className={styles.flourish}>
          <span className={styles.ln} />
          <svg className={styles.med} viewBox="0 0 100 100" aria-hidden="true">
            <use href="#med" />
          </svg>
          <span className={styles.ln} />
        </div>
      </div>
      <p className={styles.intro}>{history.intro}</p>
      <div className={styles.eras}>
        {history.eras.map((era) => (
          <div key={era.title} className={styles.era}>
            <div className={styles.yr}>
              <span className={styles.dot} />
              <div>
                <b>{era.title}</b>
                <span className={styles.rng}>{era.range}</span>
              </div>
            </div>
            <p>{era.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
