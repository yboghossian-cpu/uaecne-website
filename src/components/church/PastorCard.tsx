import Image from "next/image";
import styles from "./PastorCard.module.css";

type Photo = { src: string; alt: string };

type PastorCardProps = {
  name: string;
  role: string;
  // Nullable — no verified photo yet renders the same "Photo pending"
  // treatment as LeadershipGrid, so every church keeps the same About layout.
  photo: Photo | null;
};

// Small photo+name+role card, shown beside the About text.
export default function PastorCard({ name, role, photo }: PastorCardProps) {
  return (
    <div className={styles.card}>
      <div className={photo ? styles.picWrap : `${styles.picWrap} ${styles.picPending}`}>
        {photo ? (
          <Image src={photo.src} alt={photo.alt} fill className={styles.pic} />
        ) : (
          <span className={styles.glyph}>
            <svg className={styles.glyphIcon} aria-hidden="true">
              <use href="#ic-user" />
            </svg>
            <span className={styles.glyphCaption}>Photo pending</span>
          </span>
        )}
      </div>
      <div className={styles.info}>
        <b className={styles.name}>{name}</b>
        <span className={styles.role}>{role}</span>
      </div>
    </div>
  );
}
