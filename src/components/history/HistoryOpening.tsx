import { historyContent } from "@/data/historyContent";
import Reveal from "./Reveal";
import styles from "./HistoryOpening.module.css";

// Illuminated drop-cap opening narrative, matching the mockup's .opening.
export default function HistoryOpening() {
  const { eyebrow, lead, paragraphs } = historyContent.opening;

  return (
    <section className={styles.section}>
      <Reveal className={styles.opening}>
        <div className={styles.eyebrow}>{eyebrow}</div>
        <p className={styles.lead}>{lead}</p>
        {paragraphs.map((paragraph, i) => (
          <p key={i} className={i === 0 ? styles.dc : undefined}>
            {paragraph}
          </p>
        ))}
      </Reveal>
    </section>
  );
}
