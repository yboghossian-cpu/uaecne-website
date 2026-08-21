import Image from "next/image";
import type { HaigazianContent } from "@/data/higherEdContent";
import styles from "./HaigazianClassBand.module.css";

type HaigazianClassBandProps = {
  classBand: HaigazianContent["classBand"];
};

// Real Class of 2026 graduation photo — Haigazian-only.
export default function HaigazianClassBand({ classBand }: HaigazianClassBandProps) {
  return (
    <section className={styles.band}>
      <div className={styles.cap}>
        <span className={styles.kicker}>{classBand.kicker}</span>
        <h2 className={styles.heading}>{classBand.heading}</h2>
      </div>
      <div className={styles.photoWrap}>
        <Image
          src={classBand.photo.src}
          alt={classBand.photo.alt}
          fill
          className={styles.photo}
        />
      </div>
    </section>
  );
}
