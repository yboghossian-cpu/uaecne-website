import type { SchoolContent } from "@/data/schoolContent";
import styles from "./SchoolVisionMission.module.css";

type SchoolVisionMissionProps = {
  visionMission: SchoolContent["visionMission"];
};

// Plain 2-card row (Vision / Mission), each a top-red-border ivory card
// with a heading and one paragraph — no icons, no quote, no wash
// background. Distinct from `SchoolMissionValues` (AESSA's shape: a
// centered intro quote plus a red-gradient wash-band grid, checked first
// and ruled out — see that component's own comment) and from `SchoolMission`
// (AEC's 3 icon-arch principle cards). Renders nothing when null. First
// used by Bethel Secondary School's "Vision & Mission."
export default function SchoolVisionMission({ visionMission }: SchoolVisionMissionProps) {
  if (!visionMission) return null;

  return (
    <section className={styles.section}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{visionMission.eyebrow}</div>
        <h2 className={styles.heading}>{visionMission.heading}</h2>
      </div>
      <div className={styles.grid}>
        {visionMission.cards.map((card, i) => (
          <div className={styles.card} key={i}>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardBody}>{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
