import type { ChurchContent } from "@/data/churchContent";
import styles from "./SuccessionList.module.css";

type SuccessionListProps = {
  succession: ChurchContent["succession"];
};

// Renders `succession.entries`, highlighting the `isCurrent` entry; renders
// nothing when null (e.g. Syriac). When an entry's `name` (English) is
// null, falls back to `nameHy` (verified Armenian, rendered in the Armenian
// typeface) — a real, source-accurate name shown in its original script,
// not a placeholder.
export default function SuccessionList({ succession }: SuccessionListProps) {
  if (!succession) return null;

  return (
    <section className={styles.succession}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>{succession.eyebrow}</div>
        <h2 className={styles.heading}>{succession.heading}</h2>
        {(succession.note || succession.noteHy) && (
          <p
            className={
              succession.note ? styles.note : `${styles.note} ${styles.noteHy}`
            }
          >
            {succession.note ?? succession.noteHy}
          </p>
        )}
        {succession.entries.map((entry, i) => (
          <div
            className={
              entry.isCurrent ? `${styles.entry} ${styles.current}` : styles.entry
            }
            key={i}
          >
            <span
              className={entry.name ? styles.name : `${styles.name} ${styles.nameHy}`}
            >
              {entry.name ?? entry.nameHy}
              {entry.note && <em className={styles.entryNote}> {entry.note}</em>}
            </span>
            <span className={styles.years}>{entry.years}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
