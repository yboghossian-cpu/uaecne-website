import type { ChurchContent } from "@/data/churchContent";
import styles from "./VisionBand.module.css";

type VisionBandProps = {
  vision: ChurchContent["vision"];
};

// Closing "Our Vision" statement band — red-gradient, eyebrow + a single
// italic paragraph. Distinct from MilestoneBand (a dated event: year +
// heading + body) and ChurchCTA (always-present, heading + body, no
// eyebrow) — neither shape fits a vision statement without inventing a
// year or a heading the reference doesn't have. Renders nothing when null.
// First used by Damascus.
export default function VisionBand({ vision }: VisionBandProps) {
  if (!vision) return null;

  return (
    <section className={styles.vision}>
      <div className={styles.eyebrow}>{vision.eyebrow}</div>
      <p className={styles.body}>{vision.body}</p>
    </section>
  );
}
