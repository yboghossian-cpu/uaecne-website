import styles from "./SuccessionList.module.css";

type SuccessionEntry = {
  name: string;
  nameHy: string | null;
  years: string;
  note: string | null;
  noteHy: string | null;
  isCurrent: boolean;
};

type SuccessionListProps = {
  succession: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    note: string | null;
    noteHy: string | null;
    entries: SuccessionEntry[];
  } | null;
};

// Renders `succession.entries`, highlighting the `isCurrent` entry; renders
// nothing when null (e.g. Syriac).
export default function SuccessionList({ succession }: SuccessionListProps) {
  if (!succession) return null;

  return (
    <section className={styles.succession}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>{succession.eyebrow}</div>
        <h2 className={styles.heading}>{succession.heading}</h2>
        {succession.note && <p className={styles.note}>{succession.note}</p>}
        {succession.entries.map((entry, i) => (
          <div
            className={
              entry.isCurrent ? `${styles.entry} ${styles.current}` : styles.entry
            }
            key={i}
          >
            <span className={styles.name}>
              {entry.name}
              {entry.note && <em className={styles.entryNote}> {entry.note}</em>}
            </span>
            <span className={styles.years}>{entry.years}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
