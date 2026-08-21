import type { StatCard } from "@/data/outreachContent";
import StatCardsRow from "./StatCardsRow";
import styles from "./StatSection.module.css";

type StatSectionProps = {
  eyebrow?: string | null;
  heading?: string | null;
  cards: StatCard[];
  wash?: boolean;
};

// Wraps StatCardsRow in its own section, with an optional centered header
// — Youth Work's CE stats (no header, wash, sits directly below
// RedLabelBlock) and SAC's Impact band (with header, wash) both use this;
// Camps' milestones stay embedded inside CampsHistory instead.
export default function StatSection({ eyebrow, heading, cards, wash }: StatSectionProps) {
  return (
    <section className={wash ? `${styles.wrap} ${styles.wash} wash-band` : styles.wrap}>
      {(eyebrow || heading) && (
        <div className={styles.centerHead}>
          {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
          {heading && <h2 className={styles.heading}>{heading}</h2>}
        </div>
      )}
      <StatCardsRow cards={cards} />
    </section>
  );
}
