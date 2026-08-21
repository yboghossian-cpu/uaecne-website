import { historyContent } from "@/data/historyContent";
import Reveal from "./Reveal";
import styles from "./HistoryQuote.module.css";

// Gold-accented pull-quote band — the Union's mission statement, matching
// the mockup's .quote section.
export default function HistoryQuote() {
  const { text, source } = historyContent.quote;

  return (
    <section className={styles.quote}>
      <Reveal>
        <p className={styles.text}>{text}</p>
        <div className={styles.src}>{source}</div>
      </Reveal>
    </section>
  );
}
