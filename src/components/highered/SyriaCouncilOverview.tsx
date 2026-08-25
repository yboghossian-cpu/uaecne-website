import type { SyriaEducationalCouncilContent } from "@/data/higherEdContent";
import SchoolFactsBar from "@/components/school/SchoolFactsBar";
import styles from "./SyriaCouncilOverview.module.css";

type SyriaCouncilOverviewProps = {
  overview: SyriaEducationalCouncilContent["overview"];
  factsBar: SyriaEducationalCouncilContent["factsBar"];
};

// Centered eyebrow/heading/flourish + dropcap lede paragraph, matching
// every Syria-school "Our History"-style section's own established
// convention (SchoolVintageBand, SchoolEvents, etc.) — checked
// `CouncilAbout` (the Lebanon Council's own About block) first and ruled
// it out: that component is left-aligned with a boxed/bordered dropcap,
// a different, Lebanon-specific style, while this mockup's own `.lede`
// is centered with a plain floated dropcap, the same convention already
// used by every Syria unit this project has built. The 4-cell facts bar
// (via the cross-imported `SchoolFactsBar`) sits inside this same section,
// directly after the paragraph, matching the mockup's own DOM nesting —
// not a separate section.
export default function SyriaCouncilOverview({ overview, factsBar }: SyriaCouncilOverviewProps) {
  const lead = overview.paragraphs[0] ?? "";

  return (
    <section className={styles.section}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{overview.eyebrow}</div>
        <h2 className={styles.heading}>{overview.heading}</h2>
      </div>
      <div className={styles.lede}>
        <p className={styles.paragraph}>
          <span className={styles.dropcap}>{lead.charAt(0)}</span>
          {lead.slice(1)}
        </p>
        {overview.paragraphs.slice(1).map((paragraph, i) => (
          <p className={styles.paragraph} key={i}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className={styles.factsWrap}>
        <SchoolFactsBar facts={factsBar} />
      </div>
    </section>
  );
}
