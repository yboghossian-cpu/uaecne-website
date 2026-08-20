import Image from "next/image";
import styles from "./PastorCard.module.css";

type Photo = { src: string; alt: string };

type PastorCardProps = {
  name: string;
  role: string;
  photo: Photo;
};

// Small photo+name+role card, shown beside the About text.
export default function PastorCard({ name, role, photo }: PastorCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.picWrap}>
        <Image src={photo.src} alt={photo.alt} fill className={styles.pic} />
      </div>
      <div className={styles.info}>
        <b className={styles.name}>{name}</b>
        <span className={styles.role}>{role}</span>
      </div>
    </div>
  );
}
