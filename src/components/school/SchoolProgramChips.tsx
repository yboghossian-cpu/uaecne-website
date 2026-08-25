import type { SchoolContent } from "@/data/schoolContent";
import styles from "./SchoolProgramChips.module.css";

type SchoolProgramChipsProps = {
  programChips: SchoolContent["programChips"];
};

// Centered eyebrow/heading (self-contained, matching `SchoolEvents`'s own
// pattern) above a wrapping row of red-left-accent pill tags (e.g.
// "Robotics," "Magic Math," "Science Fair"). ACG's mockup has this exact
// `.chips`/`.chip` CSS class too, but never references it in its markup —
// confirmed dead styling there, so it wasn't reused from anywhere; this is
// the first mockup that actually uses it. Renders nothing when null. First
// used by Bethel Secondary School's "Beyond the Curriculum."
export default function SchoolProgramChips({ programChips }: SchoolProgramChipsProps) {
  if (!programChips) return null;

  return (
    <section className={`${styles.wrap} wash-band`}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{programChips.eyebrow}</div>
        <h2 className={styles.heading}>{programChips.heading}</h2>
      </div>
      <div className={styles.row}>
        {programChips.items.map((chip, i) => (
          <div className={styles.chip} key={i}>
            {chip}
          </div>
        ))}
      </div>
    </section>
  );
}
