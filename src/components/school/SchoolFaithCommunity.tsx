import Image from "next/image";
import type { SchoolContent } from "@/data/schoolContent";
import styles from "./SchoolFaithCommunity.module.css";

type SchoolFaithCommunityProps = {
  faithCommunity: SchoolContent["faithCommunity"];
};

// "Faith & Community" — 4 cards, each with an independently nullable
// photo. No real photo exists yet for any of the 4 scenes, so all four
// currently render the "photo pending" fallback — same visual language as
// every other unverified photo slot on the site. Null for AEC and
// Shamlian.
export default function SchoolFaithCommunity({ faithCommunity }: SchoolFaithCommunityProps) {
  if (!faithCommunity) return null;

  return (
    <section className={`${styles.faith} wash-band`}>
      <div className={styles.centerHead}>
        <h2 className={styles.heading}>{faithCommunity.heading}</h2>
        <div className={styles.flourish}>
          <span className={styles.ln} />
          <svg className={styles.med} aria-hidden="true">
            <use href="#med" />
          </svg>
          <span className={styles.ln} />
        </div>
      </div>
      <div className={styles.grid}>
        {faithCommunity.items.map((item, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.body}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.description}</p>
            </div>
            <div className={styles.pic}>
              {item.photo ? (
                <Image
                  src={item.photo.src}
                  alt={item.photo.alt}
                  fill
                  className={styles.picPhoto}
                />
              ) : (
                <span className={styles.phTag}>Photo pending</span>
              )}
            </div>
          </div>
        ))}
      </div>
      {faithCommunity.closingNote && (
        <p className={styles.closingNote}>{faithCommunity.closingNote}</p>
      )}
    </section>
  );
}
