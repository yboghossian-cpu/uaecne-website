import type { HaigazianContent } from "@/data/higherEdContent";
import styles from "./HaigazianMotto.module.css";

type HaigazianMottoProps = {
  motto: HaigazianContent["motto"];
};

// "Truth, Freedom, Service" motto band — Haigazian-only, no equivalent
// anywhere else on the site (NEST's mockup has no motto section at all).
export default function HaigazianMotto({ motto }: HaigazianMottoProps) {
  return (
    <section className={styles.motto}>
      <div className={styles.eyebrow}>{motto.eyebrow}</div>
      {/* A soft light sweeps across the three words every few seconds. */}
      <div className={styles.words}>
        <span className={`${styles.word} ${styles.w1}`}>{motto.plain1}</span>
        <span className={`${styles.word} ${styles.highlight} ${styles.w2}`}>{motto.highlighted}</span>
        <span className={`${styles.word} ${styles.w3}`}>{motto.plain2}</span>
      </div>
      <div className={styles.sub}>{motto.sub}</div>
    </section>
  );
}
