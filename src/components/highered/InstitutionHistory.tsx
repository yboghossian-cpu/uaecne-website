import type { HistoryEntry } from "@/data/higherEdContent";
import styles from "./InstitutionHistory.module.css";

type InstitutionHistoryProps = {
  history: {
    eyebrow: string;
    heading: string;
    entries: HistoryEntry[];
  };
};

// Year + paragraph timeline rows, on the wash band. Shared by Haigazian
// and NEST.
export default function InstitutionHistory({ history }: InstitutionHistoryProps) {
  return (
    <section className={`${styles.history} wash-band`}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{history.eyebrow}</div>
        <h2 className={styles.heading}>{history.heading}</h2>
      </div>
      <div className={styles.list}>
        {history.entries.map((entry, i) => (
          <div className={styles.row} key={i}>
            <div className={styles.year}>{entry.period}</div>
            <p className={styles.desc}>{entry.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
