import type { SchoolContent } from "@/data/schoolContent";
import styles from "./SchoolMission.module.css";

type SchoolMissionProps = {
  mission: SchoolContent["mission"];
};

// Icon per principle slot, in reference order (person / star / cross) — not
// meaningful per-school content, just the fixed 3-slot visual pattern.
const PRINCIPLE_ICONS = ["#ic-mission-person", "#ic-mission-star", "#ic-mission-cross"];

// School-specific: 3 principles as arched icon cards, no church equivalent.
// Null for schools with no verified mission-statement content (Shamlian).
export default function SchoolMission({ mission }: SchoolMissionProps) {
  if (!mission) return null;

  return (
    <section className={`${styles.mission} wash-band`}>
      <div className={styles.eyebrow}>{mission.eyebrow}</div>
      <h2 className={styles.heading}>{mission.heading}</h2>
      <div className={styles.grid}>
        {mission.principles.map((principle, i) => (
          <div className={styles.principle} key={i}>
            <span className={styles.arch}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <use href={PRINCIPLE_ICONS[i] ?? "#ic-mission-person"} />
              </svg>
            </span>
            <h3 className={styles.principleHeading}>{principle.title}</h3>
            <p className={styles.principleBody}>{principle.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
