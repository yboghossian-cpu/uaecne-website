import type { BoardingHomeContent } from "@/data/outreachContent";
import styles from "./BoardingHomeClosing.module.css";

type BoardingHomeClosingProps = {
  closing: BoardingHomeContent["closing"];
};

// 2-paragraph closing narrative, the second styled as an italic "lead"
// line, matching the mockup's .closing.
export default function BoardingHomeClosing({ closing }: BoardingHomeClosingProps) {
  const [first, second] = closing.paragraphs;
  return (
    <section className={styles.section}>
      <div className={styles.closing}>
        <p>{first}</p>
        <p className={styles.lead}>{second}</p>
      </div>
    </section>
  );
}
