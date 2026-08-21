import type { HaigazianContent } from "@/data/higherEdContent";
import styles from "./HaigazianFaculties.module.css";

type HaigazianFacultiesProps = {
  faculties: HaigazianContent["faculties"];
};

// Schools & Faculties list + degree pills — Haigazian-only, no equivalent
// elsewhere (NEST's "Degrees & Programs" is a different shape, see
// NestDegrees).
export default function HaigazianFaculties({ faculties }: HaigazianFacultiesProps) {
  return (
    <section className={`${styles.wrap} wash-band`}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{faculties.eyebrow}</div>
        <h2 className={styles.heading}>{faculties.heading}</h2>
        <div className={styles.flourish}>
          <span className={styles.ln} />
          <span className={styles.dia} />
          <span className={styles.ln} />
        </div>
      </div>
      <div className={styles.grid}>
        {faculties.schools.map((school, i) => (
          <div className={styles.school} key={i}>
            <h3 className={styles.schoolName}>{school.name}</h3>
            <ul className={styles.list}>
              {school.items.map((item, j) => (
                <li className={styles.item} key={j}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.degrees}>
        {faculties.degrees.map((deg, i) => (
          <span className={styles.deg} key={i}>
            {deg}
          </span>
        ))}
      </div>
    </section>
  );
}
