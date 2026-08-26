"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "./useScrollReveal";
import styles from "./News.module.css";

// "Latest Updates" — redesigned full-width GA feature, matching
// design-reference/uaecne-homepage-second-half-enhanced.html's `.feature`.
// Links to the real built 79th General Assembly article route (the
// mockup's own href, "/resource-center/general-assembly-2026", is a wrong
// placeholder guess — corrected here). The mockup's `.arch-note` caption
// ("Photo slot holds the existing General Assembly photograph already on
// the site.") is a build instruction to whoever implements this, not real
// page copy — intentionally not rendered.
export default function News() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-visible={visible}
      className={`${styles.section} scroll-reveal`}
    >
      <div className={styles.secHead}>
        <div className={styles.eyebrow}>From the Union</div>
        <h2 className={styles.heading}>Latest Updates</h2>
        <div className={styles.flourish}>
          <span className={styles.fln} />
          <svg className={styles.flMed} viewBox="0 0 24 24" aria-hidden="true">
            <use href="#med" />
          </svg>
          <span className={styles.fln} />
        </div>
      </div>
      <div className={styles.feature}>
        <div className={styles.ph}>
          <Image
            src="/news-general-assembly.jpg"
            alt="Delegates of the 79th General Assembly gathered at the First Armenian Evangelical Church"
            fill
            className={styles.photo}
          />
          <span className={styles.tag}>General Assembly · Beirut</span>
        </div>
        <div className={styles.bd}>
          <svg className={styles.sealWm} viewBox="0 0 48 48" aria-hidden="true">
            <use href="#ic-hp-quat" />
          </svg>
          <div className={styles.kick}>June 2026 · 79th General Assembly</div>
          <h3 className={styles.headline}>A Milestone Gathering in Beirut</h3>
          <p className={styles.excerpt}>
            Held on June 21–22, 2026, in Beirut, the 79th General Assembly of the UAECNE marked
            the church&rsquo;s 180th anniversary under the theme &ldquo;Freedom of Conscience and
            Responsible Faith.&rdquo; Forty voting members convened in person and online to
            review reports on the resilience of the Union&rsquo;s ministries, schools, and
            finances — closing with committee elections, a memorial for past leaders, and a Holy
            Communion service.
          </p>
          <Link href="/resource-center/news/79th-general-assembly" className={styles.more}>
            Read the full story
            <svg className={styles.moreIcon} viewBox="0 0 24 24" aria-hidden="true">
              <use href="#ic-arrow" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
