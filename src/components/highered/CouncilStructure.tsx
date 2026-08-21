import type { EducationCouncilContent } from "@/data/higherEdContent";
import styles from "./CouncilStructure.module.css";

type CouncilStructureProps = {
  structure: EducationCouncilContent["structure"];
};

// "How the Council Is Formed" — 3 stat/fact cards, no equivalent
// elsewhere on the site (the closest analog, AnniversaryBand's numeral
// cell, is a different shape entirely).
export default function CouncilStructure({ structure }: CouncilStructureProps) {
  return (
    <section className={`${styles.structure} wash-band`}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{structure.eyebrow}</div>
        <h2 className={styles.heading}>{structure.heading}</h2>
      </div>
      <div className={styles.grid}>
        {structure.cards.map((card, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.number}>{card.number}</div>
            <div className={styles.title}>{card.title}</div>
            <p className={styles.desc}>{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
