import Image from "next/image";
import type { SocialActionContent } from "@/data/outreachContent";
import styles from "./ChildProgramCards.module.css";

type ChildProgramCardsProps = {
  children: SocialActionContent["children"];
};

// "Children's Programs" — 3 cards (Afternoon Study Room / Playground /
// DVBS), each with a real schedule and description, currently all
// photo-pending. SAC-only.
export default function ChildProgramCards({ children }: ChildProgramCardsProps) {
  return (
    <section className={`${styles.wrap} wash-band`}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{children.eyebrow}</div>
        <h2 className={styles.heading}>{children.heading}</h2>
        <div className={styles.flourish}>
          <span className={styles.ln} />
          <span className={styles.dia} />
          <span className={styles.ln} />
        </div>
      </div>
      <p className={styles.intro}>{children.intro}</p>
      <div className={styles.grid}>
        {children.cards.map((card, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.pic}>
              {card.photo ? (
                <Image src={card.photo.src} alt={card.photo.alt} fill className={styles.picPhoto} />
              ) : (
                <span className={styles.picGlyph}>
                  <svg className={styles.picGlyphIcon} viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#ic-photo" />
                  </svg>
                </span>
              )}
            </div>
            <div className={styles.body}>
              <h3 className={styles.title}>{card.title}</h3>
              <div className={styles.when}>{card.schedule}</div>
              <p className={styles.desc}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
