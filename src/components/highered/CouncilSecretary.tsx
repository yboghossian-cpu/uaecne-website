import Image from "next/image";
import type { EducationCouncilContent } from "@/data/higherEdContent";
import styles from "./CouncilSecretary.module.css";

type CouncilSecretaryProps = {
  secretary: EducationCouncilContent["secretary"];
};

// Secretary photo + contact card — phone and a real mailto, no address
// (the Council isn't a physical campus), so this deliberately doesn't
// reuse ChurchContactSection/SchoolContactSection's two-card location+
// contact shape.
export default function CouncilSecretary({ secretary }: CouncilSecretaryProps) {
  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.card}>
          {secretary.photo ? (
            <div className={styles.picWrap}>
              <Image
                src={secretary.photo.src}
                alt={secretary.photo.alt}
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
          <div className={styles.cardInfo}>
            <b className={styles.cardName}>{secretary.name}</b>
            <span className={styles.cardRole}>{secretary.role}</span>
          </div>
        </div>
        <div>
          <div className={styles.eyebrow}>Contact</div>
          <h3 className={styles.heading}>Get in Touch</h3>
          <div className={styles.row}>
            <svg className={styles.rowIco} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M6 3h3l2 5-2.5 1.5a11 11 0 005 5L21 15v3a2 2 0 01-2 2A16 16 0 014 5a2 2 0 012-2z" />
            </svg>
            <span>
              <span className={styles.key}>Phone</span>
              <span className={styles.value}>{secretary.phone}</span>
            </span>
          </div>
          <div className={styles.row}>
            <svg className={styles.rowIco} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M4 7l8 6 8-6" />
            </svg>
            <span>
              <span className={styles.key}>Email</span>
              <a href={`mailto:${secretary.email}`} className={`${styles.value} ${styles.link}`}>
                {secretary.email}
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
