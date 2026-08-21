import type { NestContent } from "@/data/higherEdContent";
import styles from "./NestSponsors.module.css";

type NestSponsorsProps = {
  sponsors: NestContent["sponsors"];
};

// "Four Sponsoring Churches" — the distinctive NEST section, no equivalent
// anywhere else on the site. UAECNE's own entry is visually highlighted
// (red border/dot) among the four.
export default function NestSponsors({ sponsors }: NestSponsorsProps) {
  return (
    <section className={styles.wrap}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{sponsors.eyebrow}</div>
        <h2 className={styles.heading}>{sponsors.heading}</h2>
      </div>
      <p className={styles.intro}>{sponsors.intro}</p>
      <div className={styles.grid}>
        {sponsors.churches.map((church, i) => (
          <div
            className={church.highlighted ? `${styles.card} ${styles.highlighted}` : styles.card}
            key={i}
          >
            <span className={styles.dot} />
            <b className={styles.name}>{church.name}</b>
          </div>
        ))}
      </div>
      <div className={styles.note}>{sponsors.note}</div>
    </section>
  );
}
