import Image from "next/image";
import type { SyriaEducationalCouncilContent } from "@/data/higherEdContent";
import styles from "./SyriaCouncilHero.module.css";

type SyriaCouncilHeroProps = {
  heading: string;
  headingHy: string | null;
  subheading: string;
  metaLine: string;
  logo: SyriaEducationalCouncilContent["logo"];
};

// Masthead for the Syria Educational Council hub — real crest, h1,
// sub-label, and meta line, per the mockup's own `.masthead` (a genuine
// seal/facts-bar shape unlike the Lebanon Council's plain icon hero, which
// has neither). Bakes its own 3-segment breadcrumb directly, matching the
// established convention already used by CouncilHero (2-segment,
// "Ministries › Higher Education") and SchoolTopBlock/ChurchTopBlock
// family components generally — rather than extending the shared,
// no-props `HigherEdBreadcrumb`, which every other Higher Education page
// uses unmodified.
//
// Breadcrumb note: the mockup's own crumb literally reads "Ministries ›
// Schools › Syria" — but this page lives at
// /higher-education/syria-educational-council, not under /schools, per
// Yeghia's explicit routing decision (this is a governance/institutional
// page, not a school-detail page — see the recon report). Matching the
// mockup's literal text here would point to the wrong section entirely,
// so the crumb instead reads "Ministries › Higher Education › Syria" —
// correct for the real route, flagged as a deliberate deviation from the
// mockup's own (inconsistent) crumb text rather than copied blindly.
export default function SyriaCouncilHero({
  heading,
  subheading,
  metaLine,
  logo,
}: SyriaCouncilHeroProps) {
  return (
    <section className={styles.top}>
      <div className={styles.crumb}>
        <span>Ministries</span>
        <span className={styles.sep} aria-hidden="true">
          ›
        </span>
        <span>Higher Education</span>
        <span className={styles.sep} aria-hidden="true">
          ›
        </span>
        <span>Syria</span>
      </div>
      <div className={styles.masthead}>
        {logo && (
          <div className={styles.seal}>
            <Image src={logo.src} alt={logo.alt} width={98} height={98} className={styles.sealImg} />
          </div>
        )}
        <div>
          <h1 className={styles.heading}>{heading}</h1>
          <div className={styles.sub}>{subheading}</div>
          <div className={styles.meta}>{metaLine}</div>
        </div>
      </div>
    </section>
  );
}
