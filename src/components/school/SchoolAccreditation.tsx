import { getT } from "@/lib/i18n/server";
import type { SchoolContent } from "@/data/schoolContent";
import styles from "./SchoolAccreditation.module.css";

type SchoolAccreditationProps = {
  accreditation: SchoolContent["accreditation"];
  schoolName: string;
};

// Formal accreditation band — a red panel with a gold seal, the accrediting
// body, and the dates from its directory entry. Renders nothing when the
// school has no accreditation on record.
export default async function SchoolAccreditation({ accreditation, schoolName }: SchoolAccreditationProps) {
  const tx = await getT();
  if (!accreditation) return null;
  const a = accreditation;

  return (
    <section className={styles.wrap}>
      <div className={styles.panel}>
        <svg className={styles.watermark} aria-hidden="true">
          <use href="#med" />
        </svg>

        <div className={styles.seal} aria-hidden="true">
          <svg viewBox="0 0 120 120" className={styles.sealSvg}>
            <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
            <circle cx="60" cy="60" r="48" fill="none" stroke="currentColor" strokeWidth="2.5" />
            {Array.from({ length: 24 }).map((_, i) => {
              const ang = (i / 24) * Math.PI * 2;
              return (
                <circle
                  key={i}
                  cx={60 + Math.cos(ang) * 52}
                  cy={60 + Math.sin(ang) * 52}
                  r="1.3"
                  fill="currentColor"
                  opacity="0.8"
                />
              );
            })}
            <path
              d="M40 61 L54 75 L82 45"
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className={styles.body}>
          <div className={styles.eyebrow}>{tx("Accreditation")}</div>
          <h2 className={styles.heading}>{tx("Accredited by the Middle States Association")}</h2>
          <p className={styles.lead}>
            {tx("{school} holds accreditation from the Middle States Association Commissions on Elementary and Secondary Schools (MSA-CESS), covering Kindergarten through Grade 12.").replace("{school}", schoolName)}
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{tx(a.firstAccredited)}</span>
              <span className={styles.statLabel}>{tx("First accredited")}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{tx(a.accreditedThrough)}</span>
              <span className={styles.statLabel}>{tx("Accredited through")}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{tx(a.grades)}</span>
              <span className={styles.statLabel}>{tx("Grades covered")}</span>
            </div>
          </div>

          <a className={styles.verify} href={a.verifyUrl} target="_blank" rel="noopener noreferrer">
            {tx("Middle States Association")} — msa-cess.org →
          </a>
        </div>
      </div>
    </section>
  );
}
