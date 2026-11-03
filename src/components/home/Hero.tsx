"use client";


import { useT } from "@/lib/i18n/client";
import Image from "next/image";
import Link from "next/link";
import Medallion from "@/components/shared/Medallion";
import styles from "./Hero.module.css";

export default function Hero() {
  const tx = useT();

  return (
    <section className={styles.hero}>
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
          <div className={styles.actions}>
            <Link href="/resource-center/history" className={styles.btn}>
              {tx("Our History")}
            </Link>
            <Link href="/churches" className={styles.btnGhost}>
              {tx("Our Churches")}
            </Link>
          </div>
        </div>
        <div className={styles.art}>
          {/* Rounded rectangle with a soft red glow on every side. */}
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
