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
  // Which side-art vector to draw when `sideArt` is set. "medallion" (the
  // default) keeps AESSA/Anjar's existing crest exactly as before;
  // "scripture" is Shamlian-Tatikian's own mockup art (arched manuscript
  // window + rays + cross + open Bible), copied verbatim from
  // design-reference/uaecne-school-shamlian-tatikian.html.
  artVariant?: "medallion" | "scripture";
};

// Geometry copied verbatim from the Shamlian-Tatikian mockup's Academic Life
// figure. Literal hex values kept as authored; they are the same values the
// design tokens carry (#C5A059 gold, #D4AF37 gold-bright, #8B0000 red).
// Shares crestSideSvg's sizing with the medallion variant.
const scriptureArt = (
  <svg
    className={styles.crestSideSvg}
    viewBox="0 0 300 400"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
  >
    <path d="M46 372 V148 a104 104 0 0 1 208 0 V372" fill="none" stroke="#C5A059" strokeWidth="3" />
    <path d="M58 366 V150 a92 92 0 0 1 184 0 V366" fill="none" stroke="#C5A059" strokeWidth="1" opacity=".55" />
    <g transform="translate(150,58)" fill="none" stroke="#C5A059" strokeWidth="2">
      <circle cx="0" cy="-6" r="6" />
      <circle cx="0" cy="6" r="6" />
      <circle cx="-6" cy="0" r="6" />
      <circle cx="6" cy="0" r="6" />
    </g>
    <g stroke="#D4AF37" strokeWidth="2" opacity=".5" strokeLinecap="round">
      <line x1="150" y1="150" x2="150" y2="120" />
      <line x1="122" y1="156" x2="108" y2="132" />
      <line x1="178" y1="156" x2="192" y2="132" />
      <line x1="102" y1="172" x2="82" y2="156" />
      <line x1="198" y1="172" x2="218" y2="156" />
    </g>
    <g fill="#8B0000">
      <rect x="144" y="150" width="12" height="150" rx="2" />
      <rect x="118" y="182" width="64" height="12" rx="2" />
    </g>
    <g>
      <path d="M150 300 C122 288 92 292 68 304 L68 344 C92 332 122 328 150 340 Z" fill="#fffdf6" stroke="#C5A059" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M150 300 C178 288 208 292 232 304 L232 344 C208 332 178 328 150 340 Z" fill="#fffdf6" stroke="#C5A059" strokeWidth="2.6" strokeLinejoin="round" />
      <g stroke="#C5A059" strokeWidth="1.1" opacity=".45">
        <path d="M82 308 C104 300 126 300 142 308" />
        <path d="M82 320 C104 312 126 312 142 320" />
        <path d="M158 308 C174 300 196 300 218 308" />
        <path d="M158 320 C174 312 196 312 218 320" />
      </g>
    </g>
  </svg>
);

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
export default function SchoolAcademics({
  academicHeritage,
  sideArt,
  artVariant = "medallion",
}: SchoolAcademicsProps) {
  if (!academicHeritage) return null;

  return (
    <section className={styles.academics}>
      <div className={styles.eyebrow}>{academicHeritage.eyebrow}</div>
      <h2 className={styles.heading}>{academicHeritage.heading}</h2>
      {sideArt ? (
        <div className={styles.wrap}>
          <div className={styles.art}>
            <div className={styles.crestSide}>
              {artVariant === "scripture" ? (
                scriptureArt
              ) : (
                // Geometry copied verbatim from
                // design-reference/uaecne-school-anjar-template.html's
                // .academic .art .crest-side svg.
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
              )}
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
