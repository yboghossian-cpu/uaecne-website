import Image from "next/image";
import type { SchoolLeaderEntry } from "@/data/schoolContent";
import styles from "./SchoolLeadershipGrid.module.css";

type SchoolLeadershipGridProps = {
  leaders: SchoolLeaderEntry[] | null;
};

// Fixed 3 cards: Principal / Vice-Chair of the Council / Secretary, per
// uaecne-school-aec-reference.html's .lead-grid. Two independent gaps,
// never invented:
//  - no photo -> arched placeholder icon (name still shown if verified)
//  - no name  -> italic-gold "Name pending" label (Anjar, Bethel)
export default function SchoolLeadershipGrid({ leaders }: SchoolLeadershipGridProps) {
  if (!leaders) return null;

  return (
    <section className={styles.lead}>
      <div className={styles.eyebrow}>The Team</div>
      <h2 className={styles.heading}>Leadership</h2>
      <div className={styles.grid}>
        {leaders.map((leader, i) => (
          <div className={styles.person} key={i}>
            {leader.photo ? (
              <div className={styles.pic}>
                <Image
                  src={leader.photo.src}
                  alt={leader.photo.alt}
                  fill
                  className={styles.photo}
                />
              </div>
            ) : (
              <div className={styles.picPending}>
                <span className={styles.arch}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#ic-user" />
                  </svg>
                </span>
              </div>
            )}
            <div className={styles.info}>
              {leader.name ? (
                <b className={styles.name}>{leader.name}</b>
              ) : (
                <b className={`${styles.name} ${styles.namePending}`}>Name pending</b>
              )}
              <span className={styles.role}>{leader.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
