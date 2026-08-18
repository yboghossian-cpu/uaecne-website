"use client";

import { useScrollReveal } from "./useScrollReveal";
import styles from "./SpiritualHeritage.module.css";

export default function SpiritualHeritage() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-visible={visible}
      className={`${styles.section} scroll-reveal`}
    >
      <div className={styles.inner}>
        <h2 className={styles.heading}>Our Spiritual Heritage</h2>
        <p className={styles.paragraph}>
          Founded in 1846, the Union of the Armenian Evangelical Churches in
          the Near East (UAECNE) stands as a beacon of reform and spiritual
          dedication. Headquartered in Beirut, Lebanon, we nurture a vibrant
          community of faith across nine nations, illuminating the path of
          Christian Armenian heritage for future generations.
        </p>
        <p className={styles.quote}>
          &ldquo;For where two or three gather in my name, there am I with
          them.&rdquo;{" "}
          <span className={styles.quoteRef}>— Matthew 18:20</span>
        </p>
        <span role="link" aria-disabled="true" className={styles.link}>
          Explore Our Legacy
        </span>
      </div>
    </section>
  );
}
