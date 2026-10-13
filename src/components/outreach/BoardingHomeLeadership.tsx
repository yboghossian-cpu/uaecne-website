import type { BoardingHomeContent } from "@/data/outreachContent";
import styles from "./BoardingHomeLeadership.module.css";

type BoardingHomeLeadershipProps = {
  leadership: BoardingHomeContent["leadership"];
};

// 3 narrative cards (Founder / Handover / Today) — distinct from
// schoolContent.ts's `leadership` field, which is a fixed role+photo grid,
// not prose. Matches the mockup's .lead-narr.
export default function BoardingHomeLeadership({ leadership }: BoardingHomeLeadershipProps) {
  return (
    <section className={styles.section}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{leadership.eyebrow}</div>
        <h2 className={styles.heading}>{leadership.heading}</h2>
      </div>
      <p className={styles.intro}>{leadership.intro}</p>
      <div className={styles.grid}>
        {leadership.cards.map((card) => (
          <div
            key={card.tag}
            className={card.current ? `${styles.card} ${styles.current}` : styles.card}
          >
            <span className={styles.tag}>{card.tag}</span>
            <h4>{card.heading}</h4>
            <p>{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
