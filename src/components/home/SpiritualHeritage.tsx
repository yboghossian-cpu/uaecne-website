"use client";


import { useT } from "@/lib/i18n/client";
import Image from "next/image";
import Link from "next/link";
import ArchFrame from "@/components/shared/ArchFrame";
import { useScrollReveal } from "./useScrollReveal";
import styles from "./SpiritualHeritage.module.css";

// "Our Spiritual Heritage" — redesigned as a History-gateway, matching
// design-reference/uaecne-homepage-second-half-enhanced.html's `.heritage`.
// Intentionally replaces the earlier duplicated heritage paragraph; links
// to the real built History of the UAECNE page (the mockup's own href,
// "/resource-center/history-of-the-uaecne", is a wrong placeholder guess —
// corrected here to "/resource-center/history").
export default function SpiritualHeritage() {
  const tx = useT();
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-visible={visible}
      className={`${styles.section} scroll-reveal`}
    >
      <svg className={styles.wm} viewBox="0 0 48 48" aria-hidden="true">
        <use href="#ic-hp-quat" />
      </svg>
      <div className={styles.heritage}>
        <div className={styles.glass}>
          <ArchFrame
            aspectRatio="3 / 4"
            photoSrc="/spiritual-heritage-sanctuary.jpg"
            photoAlt={tx("Sanctuary interior during a General Assembly session")}
          />
          <div className={styles.verse}>
            {tx("“For where two or three gather in my name, there am I with them.”")}
            <span className={styles.verseCite}>{tx("Matthew 18:20")}</span>
          </div>
        </div>
        <div className={styles.hcopy}>
          <div className={styles.seal}>
            <Image src="/logo.svg" alt="" width={30} height={30} />
          </div>
          <div className={styles.eyb}>{tx("Since 1846")}</div>
          <h2 className={styles.heading}>
            {tx("Our Spiritual ")}<em className={styles.em}>{tx("Heritage")}</em>
          </h2>
          <p className={styles.paragraph}>
            {tx("Born in the Ottoman era as a movement of reform and renewal, the Union of the Armenian Evangelical Churches has been carried through generations of exile, endurance, and rebuilding — and lives today as a communion of faith across nine nations of the Near East.")}
          </p>
          <p className={styles.invite}>{tx("Nearly two centuries of that story await.")}</p>
          <Link href="/resource-center/history" className={styles.cta}>
            {tx("Read the Full History")}
            <svg className={styles.ctaIcon} viewBox="0 0 24 24" aria-hidden="true">
              <use href="#ic-arrow" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
