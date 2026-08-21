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
      <div className={styles.words}>
        {motto.plain1}
        <span className={styles.highlight}>{motto.highlighted}</span>
        {motto.plain2}
      </div>
      <div className={styles.sub}>{motto.sub}</div>
    </section>
  );
}
