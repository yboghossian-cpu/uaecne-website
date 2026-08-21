import type { SchoolContent } from "@/data/schoolContent";
import styles from "./SchoolAcademics.module.css";

type SchoolAcademicsProps = {
  academicHeritage: SchoolContent["academicHeritage"];
};

// School-specific: pill (period) + description rows — NOT a flat bullet
// list like ChurchPrograms, no church equivalent. Null for schools with no
// verified era-by-era content (Shamlian's history is prose, already
// rendered in SchoolAbout instead).
export default function SchoolAcademics({ academicHeritage }: SchoolAcademicsProps) {
  if (!academicHeritage) return null;

  return (
    <section className={styles.academics}>
      <div className={styles.eyebrow}>{academicHeritage.eyebrow}</div>
      <h2 className={styles.heading}>{academicHeritage.heading}</h2>
      <div className={styles.list}>
        {academicHeritage.eras.map((era, i) => (
          <div className={styles.row} key={i}>
            <span className={styles.pill}>{era.period}</span>
            <p className={styles.rowBody}>{era.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
