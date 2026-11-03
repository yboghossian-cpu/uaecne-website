import { getT } from "@/lib/i18n/server";
import Image from "next/image";
import type { HaigazianContent } from "@/data/higherEdContent";
import styles from "./HaigazianFaculties.module.css";

type HaigazianFacultiesProps = {
  faculties: HaigazianContent["faculties"];
};

// Schools & Faculties — each faculty with its official haigazian.edu.lb
// icon — plus the degrees offered. Haigazian-only.
export default async function HaigazianFaculties({ faculties }: HaigazianFacultiesProps) {
  const tx = await getT();
  return (
    <section className={styles.wrap}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{faculties.eyebrow}</div>
        <h2 className={styles.heading}>{faculties.heading}</h2>
      </div>
      <div className={styles.grid}>
        {faculties.schools.map((school, i) => (
          <div className={styles.school} key={i}>
            <h3 className={styles.schoolName}>{school.name}</h3>
            <ul className={styles.list}>
              {school.items.map((item, j) => {
                const icon = school.icons?.[j] ?? null;
                return (
                  <li className={styles.item} key={j}>
                    <span className={styles.iconTile}>
                      {icon ? (
                        <Image src={icon} alt="" width={89} height={82} className={styles.icon} />
                      ) : (
                        <span className={styles.iconDot} />
                      )}
                    </span>
                    <span className={styles.itemName}>{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.degreesRow}>
        <span className={styles.degreesLabel}>{tx("Degrees offered")}</span>
        <div className={styles.degrees}>
          {faculties.degrees.map((deg, i) => (
            <span className={styles.deg} key={i}>
              {deg}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
