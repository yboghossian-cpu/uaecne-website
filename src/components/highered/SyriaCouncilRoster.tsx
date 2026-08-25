import Image from "next/image";
import type { SyriaEducationalCouncilContent } from "@/data/higherEdContent";
import styles from "./SyriaCouncilRoster.module.css";

type SyriaCouncilRosterProps = {
  roster: SyriaEducationalCouncilContent["roster"];
};

// Group photo + named 4-person roster — checked NEST's `NestLeadershipPair`
// (2-person, no group photo) and `SchoolLeadershipGrid` (1-3 individual
// photo cards, no group-photo-plus-roster combination) first; neither
// fits a single real group photo paired with a separately-listed roster,
// so this is new. The President's card is visually distinguished (a top
// accent + spans both columns on wider screens), matching the mockup's
// own `.mem.pres` treatment.
export default function SyriaCouncilRoster({ roster }: SyriaCouncilRosterProps) {
  return (
    <section className={styles.wrap}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{roster.eyebrow}</div>
        <h2 className={styles.heading}>{roster.heading}</h2>
      </div>
      {roster.photo && (
        <div className={styles.photoWrap}>
          <div className={styles.frame}>
            <Image
              src={roster.photo.src}
              alt={roster.photo.alt}
              width={1280}
              height={960}
              className={styles.photo}
            />
          </div>
          {roster.photoCaption && <div className={styles.caption}>{roster.photoCaption}</div>}
        </div>
      )}
      <div className={styles.roster}>
        {roster.people.map((person, i) => (
          <div className={i === 0 ? `${styles.mem} ${styles.pres}` : styles.mem} key={i}>
            <b className={styles.name}>{person.name}</b>
            <span className={styles.role}>{person.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
