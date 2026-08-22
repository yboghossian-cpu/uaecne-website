import Image from "next/image";
import styles from "./LeadershipGrid.module.css";

type Photo = { src: string; alt: string };

type LeaderEntry = {
  name: string;
  nameHy: string | null;
  role: string;
  roleHy: string | null;
  photo: Photo | null;
};

type LeadershipGridProps = {
  leaders: LeaderEntry[] | null;
  // Both additive/optional, defaulting to the original hardcoded text —
  // every church before the Syria unit relied on those defaults
  // unaffected. Bethel/Emmanuel's mockups both say "The Team," not "The
  // Ministry" (a mismatch missed during Bethel's own build, corrected here
  // for both — see OPEN_QUESTIONS).
  eyebrow?: string;
  heading?: string;
  // Optional italic centered note below the grid (e.g. Syriac Aleppo's
  // "English spelling pending your confirmation. The church's pulpit is
  // currently vacant."). Null/omitted for every other church.
  note?: string | null;
};

// Renders `leadership` when non-null; renders nothing when null (e.g.
// Syriac). Any entry with no photo gets the medallion "photo pending"
// treatment, matching src/app/churches/page.module.css's .picPending/.glyph
// pattern (icon + caption on a warm gradient) rather than a bare rectangle.
export default function LeadershipGrid({
  leaders,
  eyebrow = "The Ministry",
  heading = "Leadership",
  note,
}: LeadershipGridProps) {
  if (!leaders) return null;

  return (
    <section className={styles.lead}>
      <div className={styles.eyebrow}>{eyebrow}</div>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.grid}>
        {leaders.map((leader, i) => (
          <div className={styles.person} key={i}>
            <div className={leader.photo ? styles.pic : `${styles.pic} ${styles.picPending}`}>
              {leader.photo ? (
                <Image
                  src={leader.photo.src}
                  alt={leader.photo.alt}
                  fill
                  className={styles.photo}
                />
              ) : (
                <span className={styles.glyph}>
                  <svg className={styles.glyphIcon}>
                    <use href="#ic-user" />
                  </svg>
                  <span className={styles.glyphCaption}>Photo pending</span>
                </span>
              )}
            </div>
            <div className={styles.info}>
              <b className={styles.name}>{leader.name}</b>
              <span className={styles.role}>{leader.role}</span>
            </div>
          </div>
        ))}
      </div>
      {note && <p className={styles.note}>{note}</p>}
    </section>
  );
}
