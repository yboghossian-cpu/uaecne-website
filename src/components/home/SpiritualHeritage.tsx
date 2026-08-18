"use client";

import Image from "next/image";
import ArchFrame from "@/components/shared/ArchFrame";
import Medallion from "@/components/shared/Medallion";
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
      <div className={styles.heritage}>
        <div className={styles.art}>
          <ArchFrame aspectRatio="4 / 5" label="Photo pending — Sanctuary">
            <Medallion />
          </ArchFrame>
          <div className={styles.quoteRibbon}>
            &ldquo;For where two or three gather in my name, there am I with
            them.&rdquo;
            <cite className={styles.quoteCite}>Matthew 18:20</cite>
          </div>
        </div>
        <div className={styles.txt}>
          <Image
            src="/logo.svg"
            alt=""
            width={88}
            height={88}
            className={styles.sealBig}
          />
          <h2 className={styles.heading}>Our Spiritual Heritage</h2>
          <p className={styles.paragraph}>
            Founded in 1846, the Union of the Armenian Evangelical Churches in
            the Near East (UAECNE) stands as a beacon of reform and spiritual
            dedication. Headquartered in Beirut, Lebanon, we nurture a vibrant
            community of faith across nine nations, illuminating the path of
            Christian Armenian heritage for future generations.
          </p>
          <span role="link" aria-disabled="true" className={styles.link}>
            Explore our Legacy
          </span>
        </div>
      </div>
    </section>
  );
}
