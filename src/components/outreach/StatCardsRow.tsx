import type { StatCard } from "@/data/outreachContent";
import styles from "./StatCardsRow.module.css";

type StatCardsRowProps = {
  cards: StatCard[];
};

// Number + caption cards, 1-col mobile / 3-col desktop — shared shape
// behind Camps' milestones, Youth Work's CE stats, and SAC's impact band.
export default function StatCardsRow({ cards }: StatCardsRowProps) {
  return (
    <div className={styles.grid}>
      {cards.map((card, i) => (
        <div className={styles.card} key={i}>
          <div className={styles.number}>{card.number}</div>
          <div className={styles.caption}>{card.caption}</div>
        </div>
      ))}
    </div>
  );
}
