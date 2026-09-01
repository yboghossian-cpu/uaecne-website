import styles from "./CouncilHero.module.css";

type CouncilHeroProps = {
  heading: string;
  subheading: string;
};

// Dignified governing-body hero band — burgundy, a decorative seal icon
// (no logo file exists for the Council — see OPEN_QUESTIONS), no building
// photo. Distinct from the institution masthead used by Haigazian/NEST,
// since the Council isn't a campus.
//
// Breadcrumb: reads "Ministries › Schools" — this page now lives at
// /schools/education-council-lebanon, per the Educational Councils move
// (see OPEN_QUESTIONS). Previously read "Ministries › Higher Education"
// while the page lived under /higher-education/educational-council.
export default function CouncilHero({ heading, subheading }: CouncilHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.crumb}>Ministries › Schools</div>
      <div className={styles.seal}>
        <svg className={styles.sealIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M12 4L2 9l10 5 8-4v6" strokeLinejoin="round" />
          <path d="M6 12v4c0 1 3 3 6 3s6-2 6-3v-4" />
        </svg>
      </div>
      <h1 className={styles.heading}>{heading}</h1>
      <div className={styles.sub}>{subheading}</div>
      <div className={styles.flourish}>
        <span className={styles.ln} />
        <span className={styles.dia} />
        <span className={styles.ln} />
      </div>
    </section>
  );
}
