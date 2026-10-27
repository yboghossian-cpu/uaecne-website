import { getL } from "@/lib/i18n/server";
import { historyContent as historyContent__en } from "@/data/historyContent";
import Reveal from "./Reveal";
import styles from "./HistoryQuote.module.css";

// Gold-accented pull-quote band — the Union's mission statement, matching
// the mockup's .quote section.
export default async function HistoryQuote() {
  const L = await getL();
  const historyContent = L(historyContent__en);
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
