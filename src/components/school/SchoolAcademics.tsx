import type { SchoolContent } from "@/data/schoolContent";
import styles from "./SchoolAcademics.module.css";

type SchoolAcademicsProps = {
  academicHeritage: SchoolContent["academicHeritage"];
  // Optional, opt-in only — AEC's call site omits this and renders exactly
  // as before (no wrapping element added to the DOM at all). AESSA passes
  // true to bring back the reference's decorative crest sidebar
  // (design-reference/uaecne-school-anjar-template.html's .art/.crest-side)
  // beside the pill+description list, a two-column layout at ≥720px.
  sideArt?: boolean;
};

const list = (academicHeritage: NonNullable<SchoolContent["academicHeritage"]>, listClassName: string) => (
  <div className={listClassName}>
    {academicHeritage.eras.map((era, i) => (
      <div className={styles.row} key={i}>
        <span className={styles.pill}>{era.period}</span>
        <p className={styles.rowBody}>{era.description}</p>
      </div>
    ))}
  </div>
);

// School-specific: pill (period) + description rows — NOT a flat bullet
// list like ChurchPrograms, no church equivalent. Null for schools with no
// verified era-by-era content (Shamlian's history is prose, already
// rendered in SchoolAbout instead).
export default function SchoolAcademics({ academicHeritage, sideArt }: SchoolAcademicsProps) {
  if (!academicHeritage) return null;

  return (
    <section className={styles.academics}>
      <div className={styles.eyebrow}>{academicHeritage.eyebrow}</div>
      <h2 className={styles.heading}>{academicHeritage.heading}</h2>
      {sideArt ? (
        <div className={styles.wrap}>
          <div className={styles.art}>
            <div className={styles.crestSide}>
              {/* Geometry copied verbatim from
                  design-reference/uaecne-school-anjar-template.html's
                  .academic .art .crest-side svg. */}
              <svg
                className={styles.crestSideSvg}
                viewBox="0 0 100 130"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <use href="#med" x="10" y="25" width="80" height="80" style={{ color: "var(--color-gold)", opacity: 0.16 }} />
                <g transform="translate(50 65)" style={{ color: "var(--color-gold)" }}>
                  <g stroke="currentColor" strokeWidth="1.4" opacity="0.5">
                    <line x1="0" y1="0" x2="0" y2="-40" />
                    <line x1="0" y1="0" x2="30" y2="-30" />
                    <line x1="0" y1="0" x2="-30" y2="-30" />
                    <line x1="0" y1="0" x2="40" y2="0" />
                    <line x1="0" y1="0" x2="-40" y2="0" />
                  </g>
                  <path d="M0 -20 V22 M-14 -4 H14" stroke="var(--color-red)" strokeWidth="5" strokeLinecap="round" />
                </g>
              </svg>
            </div>
          </div>
          {list(academicHeritage, styles.list)}
        </div>
      ) : (
        list(academicHeritage, styles.list)
      )}
    </section>
  );
}
