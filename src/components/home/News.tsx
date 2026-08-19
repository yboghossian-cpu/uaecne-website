"use client";

import Image from "next/image";
import { useScrollReveal } from "./useScrollReveal";
import styles from "./News.module.css";

export default function News() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-visible={visible}
      className={`${styles.section} scroll-reveal`}
    >
      <h2 className={styles.heading}>
        <span className={styles.latestMark}>Latest</span> Updates
      </h2>
      <div className={styles.newsFeat}>
        <div className={styles.newsArt}>
          <Image
            src="/news-general-assembly.jpg"
            alt="Delegates of the 79th General Assembly gathered at the First Armenian Evangelical Church"
            fill
            className={styles.photo}
          />
        </div>
        <div className={styles.newsCard}>
          <span className={styles.date}>June 2026</span>
          <h3 className={styles.headline}>General Assembly</h3>
          <p className={styles.excerpt}>
            Held on June 21–22, 2026, in Beirut, the 79th General Assembly of
            the UAECNE marked the church&apos;s 180th anniversary under the
            theme &ldquo;Freedom of Conscience and Responsible Faith.&rdquo;
            40 voting members convened in person and online to review reports
            showcasing the resilience of the Union&apos;s ministries, schools,
            and finances. The event concluded with committee elections, a
            memorial for past leaders, and a Holy Communion service that
            closed with hopes for a fully in-person gathering next year.
          </p>
          <span role="link" aria-disabled="true" className={styles.readMore}>
            Read more
            <svg className={styles.readMoreIcon}>
              <use href="#ic-arrow" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
