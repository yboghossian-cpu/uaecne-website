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
      <h2 className={styles.heading}>Latest Updates</h2>
      <article className={styles.card}>
        <div className={styles.logoWrap}>
          <Image
            src="/general-assembly-180.jpg"
            alt="180th Anniversary commemorative logo"
            width={96}
            height={96}
            className={styles.logo}
          />
          <span className={styles.logoCaption}>Anniversary logo</span>
        </div>
        <div>
          <p className={styles.date}>June 2026</p>
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
          </span>
        </div>
      </article>
    </section>
  );
}
