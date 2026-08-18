"use client";

import Image from "next/image";
import { useScrollReveal } from "./useScrollReveal";
import styles from "./Hero.module.css";

export default function Hero() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-visible={visible}
      className={`${styles.hero} scroll-reveal`}
    >
      <Image
        src="/hero-general-assembly.jpg"
        alt=""
        fill
        priority
        className={styles.photo}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.headline}>Faith, Unity &amp; Enduring Service</h1>
        <hr className={styles.rule} />
        <p className={styles.subtext}>
          The Union of the Armenian Evangelical Churches in the Near East
        </p>
      </div>
    </section>
  );
}
