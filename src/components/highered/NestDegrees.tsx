import type { NestContent } from "@/data/higherEdContent";
import styles from "./NestDegrees.module.css";

type NestDegreesProps = {
  degrees: NestContent["degrees"];
};

// Degrees & Programs — abbreviation + full name rows, plus the
// Haigazian-cooperation footnote. Different shape from Haigazian's own
// degree-pill strip.
export default function NestDegrees({ degrees }: NestDegreesProps) {
  return (
    <section className={`${styles.wrap} wash-band`}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{degrees.eyebrow}</div>
        <h2 className={styles.heading}>{degrees.heading}</h2>
        <div className={styles.flourish}>
          <span className={styles.ln} />
          <span className={styles.dia} />
          <span className={styles.ln} />
        </div>
      </div>
      <div className={styles.list}>
        {degrees.items.map((item, i) => (
          <div className={styles.item} key={i}>
            <span className={styles.abbr}>{item.abbr}</span>
            <span className={styles.name}>{item.name}</span>
          </div>
        ))}
      </div>
      <p className={styles.footnote}>{degrees.footnote}</p>
    </section>
  );
}
