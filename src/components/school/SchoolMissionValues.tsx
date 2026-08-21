import type { SchoolContent } from "@/data/schoolContent";
import styles from "./SchoolMissionValues.module.css";

type SchoolMissionValuesProps = {
  missionValues: SchoolContent["missionValues"];
};

// AESSA's own "Our Mission & Philosophy" shape — centered intro quote + 4
// icon-less red-gradient value cards, per
// design-reference/uaecne-school-anjar-template.html's .mission/.val-grid.
// Deliberately a separate component from SchoolMission (AEC's 3 icon-arch
// principle cards) — see the missionValues type comment in schoolContent.ts.
// Null for AEC and Shamlian-Tatikian.
export default function SchoolMissionValues({ missionValues }: SchoolMissionValuesProps) {
  if (!missionValues) return null;

  const dashIndex = missionValues.quote.indexOf(" — ");
  const boldPart = dashIndex === -1 ? missionValues.quote : missionValues.quote.slice(0, dashIndex);
  const restPart = dashIndex === -1 ? "" : missionValues.quote.slice(dashIndex);

  return (
    <section className={`${styles.mission} wash-band`}>
      <div className={styles.panel}>
        <div className={styles.centerHead}>
          <div className={styles.eb}>{missionValues.eyebrow}</div>
          <h2 className={styles.heading}>{missionValues.heading}</h2>
        </div>
        <p className={styles.quote}>
          <b className={styles.quoteBold}>{boldPart}</b>
          {restPart}
        </p>
        <div className={styles.grid}>
          {missionValues.values.map((value, i) => (
            <div className={styles.card} key={i}>
              <b className={styles.cardTitle}>{value.title}</b>
              <p className={styles.cardBody}>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
