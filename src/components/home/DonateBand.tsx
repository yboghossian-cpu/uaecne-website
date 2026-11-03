"use client";


import { useT } from "@/lib/i18n/client";
import { useScrollReveal } from "./useScrollReveal";
import styles from "./DonateBand.module.css";

export default function DonateBand({ donateUrl }: { donateUrl?: string }) {
  const tx = useT();
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-visible={visible}
      className={`${styles.band} scroll-reveal`}
    >
      <h2 className={styles.heading}>{tx("Support our Mission")}</h2>
      <p className={styles.subtext}>
        {tx("Your dedication and generosity empower the UAECNE to continue its vital work in spiritual growth, education, and compassionate outreach across the Near East. Join us in sustaining a heritage of faith since 1846.")}
      </p>
      {donateUrl ? (
        <a href={donateUrl} className={styles.cta} target="_blank" rel="noopener noreferrer">
          {tx("Donate Now")}
        </a>
      ) : (
        <span
          role="button"
          aria-disabled="true"
          className={styles.cta}
        >
          {tx("Donate Now")}
        </span>
      )}
    </section>
  );
}
