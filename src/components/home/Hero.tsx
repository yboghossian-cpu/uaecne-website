"use client";

import ArchFrame from "@/components/shared/ArchFrame";
import Medallion from "@/components/shared/Medallion";
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
      <Medallion size={230} className={styles.heroMedallion} />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Est. 1846 · Beirut</span>
          <h1 className={styles.headline}>
            Faith, Unity &amp;
            <br />
            <em className={styles.headlineEm}>Enduring Service</em>
          </h1>
          <p className={styles.sub}>
            The Union of the Armenian Evangelical Churches in the Near East
          </p>
        </div>
        <div className={styles.art}>
          <ArchFrame
            aspectRatio="4 / 3"
            photoSrc="/hero-general-assembly.jpg"
            photoAlt="UAECNE General Assembly gathering"
          />
        </div>
      </div>
    </section>
  );
}
