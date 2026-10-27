import { getL } from "@/lib/i18n/server";
import { historyContent as historyContent__en } from "@/data/historyContent";
import Reveal from "./Reveal";
import styles from "./HistoryOpening.module.css";

// Illuminated drop-cap opening narrative, matching the mockup's .opening.
export default async function HistoryOpening() {
  const L = await getL();
  const historyContent = L(historyContent__en);
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
