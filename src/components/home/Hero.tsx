"use client";


import { useT } from "@/lib/i18n/client";
import Image from "next/image";
import Medallion from "@/components/shared/Medallion";
import { useScrollReveal } from "./useScrollReveal";
import styles from "./Hero.module.css";

export default function Hero() {
  const tx = useT();
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-visible={visible}
      className={`${styles.hero} scroll-reveal`}
    >
      <Medallion size={230} className={styles.heroMedallion} />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>{tx("Est. 1846")}</span>
          <h1 className={styles.headline}>
            {tx("Faith, Unity &")}
            <br />
            <em className={styles.headlineEm}>{tx("Enduring Service")}</em>
          </h1>
          <p className={styles.sub}>
            {tx("The Union of the Armenian Evangelical Churches in the Near East")}
          </p>
        </div>
        <div className={styles.art}>
          {/* Rounded rectangle rather than the shared arched ArchFrame — the
              hero is deliberately de-arched; every other photo slot on the
              site keeps the arch. */}
          <div className={styles.artFrame}>
            <Image
              src="/hero-general-assembly.jpg"
              alt={tx("UAECNE General Assembly gathering")}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className={styles.artPhoto}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
