import type { ChurchContent } from "@/data/churchContent";
import styles from "./MilestoneBand.module.css";

type MilestoneBandProps = {
  milestone: ChurchContent["milestone"];
};

// Red-gradient band for a single dated milestone (year + heading + one
// paragraph) — e.g. Bethel's 2021 renovation/rededication. Renders nothing
// when null.
export default function MilestoneBand({ milestone }: MilestoneBandProps) {
  if (!milestone) return null;

  return (
    <section className={styles.milestone}>
      <div className={styles.year}>{milestone.year}</div>
      <h2 className={styles.heading}>{milestone.heading}</h2>
      <p className={styles.body}>{milestone.body}</p>
    </section>
  );
}
