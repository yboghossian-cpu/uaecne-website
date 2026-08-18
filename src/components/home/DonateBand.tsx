"use client";

import { useScrollReveal } from "./useScrollReveal";
import styles from "./DonateBand.module.css";

export default function DonateBand() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-visible={visible}
      className={`${styles.band} scroll-reveal`}
    >
      <h2 className={styles.heading}>Support our Mission</h2>
      <p className={styles.subtext}>
        Your dedication and generosity empower the UAECNE to continue its
        vital work in spiritual growth, education, and compassionate outreach
        across the Near East. Join us in sustaining a heritage of faith since
        1846.
      </p>
      <span
        role="button"
        aria-disabled="true"
        className={styles.cta}
      >
        Donate Now
      </span>
    </section>
  );
}
