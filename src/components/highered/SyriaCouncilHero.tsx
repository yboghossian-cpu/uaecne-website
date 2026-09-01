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
// "Ministries › Schools") and SchoolTopBlock/ChurchTopBlock family
// components generally — rather than extending the shared, no-props
// `HigherEdBreadcrumb`, which the two remaining Higher Education pages
// (Haigazian, NEST) still use unmodified.
//
// Breadcrumb: reads "Ministries › Schools › Syria", matching the mockup's
// own crumb text verbatim — this page now lives at
// /schools/education-council-syria, per the Educational Councils move
// (see OPEN_QUESTIONS). Previously read "Ministries › Higher Education ›
// Syria" as a deliberate deviation while the page lived under
// /higher-education/syria-educational-council.
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
        <span>Schools</span>
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
