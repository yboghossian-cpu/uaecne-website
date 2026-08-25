import type { SchoolContent } from "@/data/schoolContent";
import styles from "./SchoolEvents.module.css";

type SchoolEventsProps = {
  events: SchoolContent["events"];
};

// Icon-badge card grid ("Science Exhibition," "Kermesse," etc.) — a
// centered eyebrow/heading above up to 3 cards, each a circular icon +
// title + one-line description. No prior equivalent existed anywhere in
// the codebase (confirmed by recon before this unit — church/school
// primitives have nothing icon+title+description shaped at card scale).
// Renders nothing when null. First used by Aleppo College for Girls's
// "Life at the College" section.
export default function SchoolEvents({ events }: SchoolEventsProps) {
  if (!events) return null;

  return (
    <section className={styles.wrap}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{events.eyebrow}</div>
        <h2 className={styles.heading}>{events.heading}</h2>
      </div>
      <div className={styles.grid}>
        {events.items.map((item, i) => (
          <div className={styles.card} key={i}>
            <span className={styles.icoWrap}>
              <svg className={styles.ico} aria-hidden="true">
                <use href={item.icon} />
              </svg>
            </span>
            <b className={styles.title}>{item.title}</b>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
