import type { BoardingHomeContent } from "@/data/outreachContent";
import styles from "./BoardingHomeFacts.module.css";

type BoardingHomeFactsProps = {
  factsBar: BoardingHomeContent["factsBar"];
};

// 4-cell red-gradient facts row, matching the mockup's .facts.
export default function BoardingHomeFacts({ factsBar }: BoardingHomeFactsProps) {
  return (
    <div className={styles.facts}>
      {factsBar.map((fact) => (
        <div key={fact.sub} className={styles.f}>
          <div className={styles.l}>{fact.label}</div>
          <div className={styles.s}>{fact.sub}</div>
        </div>
      ))}
    </div>
  );
}
