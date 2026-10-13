import type { BoardingHomeContent } from "@/data/outreachContent";
import styles from "./BoardingHomeMission.module.css";

type BoardingHomeMissionProps = {
  mission: BoardingHomeContent["mission"];
};

// Intro line (bold clause split into 3 parts, no dangerouslySetInnerHTML)
// + 3 icon-badge commitment cards, matching the mockup's .mission-intro /
// .commit-grid. Distinct from schoolContent.ts's `mission`/`missionValues`
// fields (no intro line on either; missionValues is explicitly icon-less).
export default function BoardingHomeMission({ mission }: BoardingHomeMissionProps) {
  return (
    <section className={`${styles.section} wash-band`}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{mission.eyebrow}</div>
        <h2 className={styles.heading}>{mission.heading}</h2>
        <div className={styles.flourish}>
          <span className={styles.ln} />
          <svg className={styles.med} viewBox="0 0 100 100" aria-hidden="true">
            <use href="#med" />
          </svg>
          <span className={styles.ln} />
        </div>
      </div>
      <p className={styles.intro}>
        {mission.introPrefix}
        <b>{mission.introBold}</b>
        {mission.introSuffix}
      </p>
      <div className={styles.grid}>
        {mission.commitments.map((commitment) => (
          <div key={commitment.title} className={styles.commit}>
            <div className={styles.emb}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <use href={`#${commitment.icon}`} />
              </svg>
            </div>
            <h4>{commitment.title}</h4>
            <p>{commitment.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
