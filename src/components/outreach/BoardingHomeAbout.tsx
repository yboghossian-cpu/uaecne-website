import Image from "next/image";
import type { BoardingHomeContent } from "@/data/outreachContent";
import styles from "./BoardingHomeAbout.module.css";

type BoardingHomeAboutProps = {
  about: BoardingHomeContent["about"];
  director: BoardingHomeContent["director"];
};

// About text + director card (photo pending -> user-icon glyph) + the
// gold-rule display-line, matching the mockup's .about-grid.
export default function BoardingHomeAbout({ about, director }: BoardingHomeAboutProps) {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.pcard}>
          <div className={styles.ph}>
            {director.photo ? (
              <Image src={director.photo.src} alt={director.photo.alt} fill className={styles.photo} />
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <use href="#ic-user" />
              </svg>
            )}
          </div>
          <div className={styles.c}>
            <b>{director.name}</b>
            <span>{director.role}</span>
          </div>
        </div>
        <div className={styles.about}>
          <div className={styles.eyebrow}>{about.eyebrow}</div>
          <h2 className={styles.heading}>{about.heading}</h2>
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          {about.displayLine && (
            <div className={styles.displayLine}>
              <p>{about.displayLine}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
