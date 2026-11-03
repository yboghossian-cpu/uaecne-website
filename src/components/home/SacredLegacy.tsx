"use client";


import { useT } from "@/lib/i18n/client";
import Link from "next/link";
import ArchFrame from "@/components/shared/ArchFrame";
import { useScrollReveal } from "./useScrollReveal";
import styles from "./SacredLegacy.module.css";

export default function SacredLegacy() {
  const tx = useT();
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-visible={visible}
      className={`${styles.section} scroll-reveal`}
    >
      <div className={styles.grid}>
        <div className={styles.art}>
          <ArchFrame
            aspectRatio="3 / 4"
            photoSrc="/sacred-legacy-faec-approved.jpeg"
            photoAlt={tx("First Armenian Evangelical Church, Beirut")}
          />
        </div>
        <div className={styles.content}>
          <h2 className={styles.heading}>{tx("A Sacred Legacy Since 1846")}</h2>
          <p className={styles.paragraph}>
            {(() => { const t = tx("Founded in the historic heart of the Ottoman Empire and headquartered in the vibrant city of Beirut, the Union of the Armenian Evangelical Churches in the Near East has been a steadfast pillar of faith, education, and social service for over 180 years. Our journey is one of resilience and spiritual devotion, dedicated to preserving our rich Armenian heritage while fostering a modern Christian witness across borders."); return <><span className={styles.dropcap}>{t.charAt(0)}</span>{t.slice(1)}</>; })()}
          </p>
          <p className={styles.quote}>
            {tx("“The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge.”")}{" "}
            <span className={styles.quoteRef}>{tx("— Psalm 18:2")}</span>
          </p>
          <nav className={styles.wayfinding} aria-label={tx("Explore the Union")}>
            <Link href="/resource-center/history" className={styles.wayLink}>
              {tx("Our History")}
            </Link>
            <Link href="/churches" className={styles.wayLink}>
              {tx("Our Churches")}
            </Link>
            <Link href="/schools" className={styles.wayLink}>
              {tx("Our Schools")}
            </Link>
          </nav>
        </div>
      </div>
    </section>
  );
}
