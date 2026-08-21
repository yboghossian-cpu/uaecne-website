import Image from "next/image";
import type { NestContent } from "@/data/higherEdContent";
import styles from "./NestLeadershipPair.module.css";

type NestLeadershipPairProps = {
  leadership: NestContent["leadership"];
};

// "Office of the President" — two side-by-side cards (Accad + Nasrallah
// van Saane), real circular photos. A different shape from
// LeadershipGrid/SchoolLeadershipGrid (horizontal icon-then-text cards,
// not vertical photo-first cards) — NEST-only, no reuse target.
export default function NestLeadershipPair({ leadership }: NestLeadershipPairProps) {
  return (
    <section className={styles.wrap}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{leadership.eyebrow}</div>
        <h2 className={styles.heading}>{leadership.heading}</h2>
      </div>
      <div className={styles.grid}>
        {leadership.people.map((person, i) => (
          <div className={styles.card} key={i}>
            {person.photo ? (
              <div className={styles.picWrap}>
                <Image
                  src={person.photo.src}
                  alt={person.photo.alt}
                  fill
                  className={styles.pic}
                />
              </div>
            ) : (
              <div className={styles.picWrap}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#ic-user" />
                </svg>
              </div>
            )}
            <div>
              <b className={styles.name}>{person.name}</b>
              <span className={styles.role}>{person.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
