import Image from "next/image";
import Link from "next/link";
import type { SyriaEducationalCouncilContent } from "@/data/higherEdContent";
import styles from "./SyriaCouncilSchools.module.css";

type SyriaCouncilSchoolsProps = {
  schools: SyriaEducationalCouncilContent["schools"];
};

// Six-schools card grid on the mockup's own red band background — no
// existing "internal link card grid" primitive exists anywhere in the
// codebase to reuse (the churches/schools index pages each have their own
// one-off inline grid, not an importable component). Each card links to
// one of the 6 already-live school routes — hrefs are the real, built
// paths, not invented.
export default function SyriaCouncilSchools({ schools }: SyriaCouncilSchoolsProps) {
  return (
    <section className={styles.wrap}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{schools.eyebrow}</div>
        <h2 className={styles.heading}>{schools.heading}</h2>
      </div>
      <div className={styles.grid}>
        {schools.items.map((school, i) => (
          <Link href={school.href} className={styles.school} key={i}>
            {school.crest && (
              <div className={styles.crest}>
                <Image src={school.crest.src} alt="" width={64} height={64} className={styles.crestImg} />
              </div>
            )}
            <div>
              <div className={styles.city}>{school.city}</div>
              <div className={styles.name}>{school.name}</div>
            </div>
            <div className={styles.go}>
              View school
              <svg className={styles.goIco} aria-hidden="true">
                <use href="#ic-arrow" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
