import Image from "next/image";
import type { SocialActionContent } from "@/data/outreachContent";
import styles from "./ProgramPillar.module.css";

type ProgramPillarProps = {
  pillars: SocialActionContent["pillars"];
};

// "How We Serve" — 2 alternating photo+bullets rows (photo left/right by
// row), each with a real, verbatim bullet list. Both photos are currently
// photo-pending — SAC-only, no reuse target.
export default function ProgramPillar({ pillars }: ProgramPillarProps) {
  return (
    <section className={styles.wrap}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{pillars.eyebrow}</div>
        <h2 className={styles.heading}>{pillars.heading}</h2>
        <div className={styles.flourish}>
          <span className={styles.ln} />
          <span className={styles.dia} />
          <span className={styles.ln} />
        </div>
      </div>
      <div className={styles.pillar}>
        {pillars.rows.map((row, i) => (
          <div className={row.reversed ? `${styles.row} ${styles.reversed}` : styles.row} key={i}>
            <div className={styles.pic}>
              {row.photo ? (
                <Image src={row.photo.src} alt={row.photo.alt} fill className={styles.picPhoto} />
              ) : (
                <span className={styles.picGlyph}>
                  <svg className={styles.picGlyphIcon} viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#ic-photo" />
                  </svg>
                  <span className={styles.picGlyphCaption}>Photo pending</span>
                </span>
              )}
            </div>
            <div>
              <div className={styles.kicker}>{row.kicker}</div>
              <h3 className={styles.title}>{row.title}</h3>
              <p className={styles.body}>{row.body}</p>
              <ul className={styles.list}>
                {row.bullets.map((bullet, j) => (
                  <li className={styles.item} key={j}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
