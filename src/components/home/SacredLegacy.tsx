"use client";

import Image from "next/image";
import { useScrollReveal } from "./useScrollReveal";
import styles from "./SacredLegacy.module.css";

export default function SacredLegacy() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-visible={visible}
      className={`${styles.section} scroll-reveal`}
    >
      <div className={styles.grid}>
        <div className={styles.media}>
          <Image
            src="/sacred-legacy-building.jpeg"
            alt="UAECNE headquarters building"
            fill
            className={styles.photo}
          />
        </div>
        <div className={styles.content}>
          <h2 className={styles.heading}>A Sacred Legacy Since 1846</h2>
          <p className={styles.paragraph}>
            Founded in the historic heart of the Ottoman Empire and
            headquartered in the vibrant city of Beirut, the Union of the
            Armenian Evangelical Churches in the Near East has been a
            steadfast pillar of faith, education, and social service for over
            180 years. Our journey is one of resilience and spiritual
            devotion, dedicated to preserving our rich Armenian heritage
            while fostering a modern Christian witness across borders.
          </p>
          <p className={styles.quote}>
            &ldquo;The Lord is my rock, my fortress and my deliverer; my God
            is my rock, in whom I take refuge.&rdquo;{" "}
            <span className={styles.quoteRef}>— Psalm 18:2</span>
          </p>
        </div>
      </div>
    </section>
  );
}
