import type { SchoolContent } from "@/data/schoolContent";
import styles from "./SchoolPullQuoteBand.module.css";

type SchoolPullQuoteBandProps = {
  pullQuoteBand: SchoolContent["pullQuoteBand"];
};

// A standalone centered wash-band quote with a small-caps attribution
// line below it — distinct from `SchoolAbout`'s `about.pullQuote` (which
// renders inline within the About text column, no section break, no
// attribution). Renders nothing when null. First used by Aleppo College
// for Girls, whose mockup gives the pull-quote its own full wash section
// between the About/Intro row and the History section, not tucked inside
// About.
export default function SchoolPullQuoteBand({ pullQuoteBand }: SchoolPullQuoteBandProps) {
  if (!pullQuoteBand) return null;

  return (
    <section className={`${styles.wrap} wash-band`}>
      <div className={styles.inner}>
        <p className={styles.quote}>&ldquo;{pullQuoteBand.quote}&rdquo;</p>
        <div className={styles.by}>{pullQuoteBand.attribution}</div>
      </div>
    </section>
  );
}
