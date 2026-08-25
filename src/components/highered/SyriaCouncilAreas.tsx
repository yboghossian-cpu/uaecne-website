import type { SyriaEducationalCouncilContent } from "@/data/higherEdContent";
import styles from "./SyriaCouncilAreas.module.css";

type SyriaCouncilAreasProps = {
  areas: SyriaEducationalCouncilContent["areas"];
};

// "Four Areas of Work" — icon+title+description cards, 1/2/4-column
// responsive grid per the mockup's own `.areas` breakpoints. Checked
// `SchoolEvents` first (same icon-badge-card shape) and ruled it out: its
// grid is fixed at 3-across (`repeat(3,1fr)`), which would leave an
// awkward 3-then-1 split for 4 items instead of the mockup's clean
// 4-across row at desktop width — a real, checkable layout mismatch, not
// a stylistic preference.
export default function SyriaCouncilAreas({ areas }: SyriaCouncilAreasProps) {
  return (
    <section className={styles.wrap}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{areas.eyebrow}</div>
        <h2 className={styles.heading}>{areas.heading}</h2>
      </div>
      <div className={styles.grid}>
        {areas.items.map((item, i) => (
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
