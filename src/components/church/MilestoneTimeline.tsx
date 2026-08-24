import type { ChurchContent } from "@/data/churchContent";
import styles from "./MilestoneTimeline.module.css";

type MilestoneTimelineProps = {
  timeline: ChurchContent["timeline"];
};

// A vertical list of dated eras (year + one short paragraph each) — a
// centered eyebrow/heading pair above a dot-marked list. Distinct from
// `MilestoneBand` (one single dated event, red-gradient band) and
// `SuccessionList` (named people, not dated eras). Renders nothing when
// null. First used by Holy Trinity's "A Timeline of Faith" (1846–2003).
export default function MilestoneTimeline({ timeline }: MilestoneTimelineProps) {
  if (!timeline) return null;

  return (
    <section className={styles.wrap}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{timeline.eyebrow}</div>
        <h2 className={styles.heading}>{timeline.heading}</h2>
      </div>
      <div className={styles.eras}>
        {timeline.eras.map((era, i) => (
          <div className={styles.era} key={i}>
            <div className={styles.yr}>
              <span className={styles.dot} />
              <b>{era.year}</b>
            </div>
            <p>{era.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
