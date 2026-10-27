import { getT, getL } from "@/lib/i18n/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Medallion from "@/components/shared/Medallion";
import { haigazianContent as haigazianContent__en, nestContent as nestContent__en } from "@/data/higherEdContent";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Higher Education — UAECNE",
};

// Only 2 institutions now — the Lebanon and Syria Educational Councils
// moved to the Schools index (see /schools/education-council-lebanon and
// /schools/education-council-syria) as part of the Educational Councils
// move; this hardcoded array reads more honestly than forcing a
// directory+content-record split like churches/schools for just 2 entries.
const cardsEn = [
  {
    id: "haigazian-university",
    slug: haigazianContent__en.slug,
    name: haigazianContent__en.masthead.heading,
    treatment: "photo" as "photo" | "seal",
    photo: haigazianContent__en.heroPhoto,
    emblem: haigazianContent__en.logo,
  },
  {
    id: "near-east-school-of-theology",
    slug: nestContent__en.slug,
    name: nestContent__en.masthead.heading,
    treatment: "photo" as const,
    photo: nestContent__en.heroPhoto,
    emblem: nestContent__en.logo,
  },
];

export default async function HigherEducationIndexPage() {
  const L = await getL();
  const cards = L(cardsEn);
  const tx = await getT();
  return (
    <>
      <section className={styles.hero}>
        <Medallion size={220} className={`${styles.med} ${styles.medLeft}`} />
        <Medallion size={220} className={`${styles.med} ${styles.medRight}`} />
        <div className={styles.heroInner}>
          <h1 className={styles.heroHeading}>{tx("Higher Education")}</h1>
          <p className={styles.heroSub}>
            {tx("The UAECNE sustains and partners with institutions of higher learning — a governing council and two academic institutions rooted in the Armenian Evangelical heritage.")}
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {cards.map((card) => (
            <Link key={card.id} href={`/higher-education/${card.slug}`} className={styles.card}>
              <div className={card.treatment === "seal" ? `${styles.pic} ${styles.picSeal}` : styles.pic}>
                {card.treatment === "seal" ? (
                  <svg className={styles.picSealIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                    <path d="M12 4L2 9l10 5 8-4v6" strokeLinejoin="round" />
                    <path d="M6 12v4c0 1 3 3 6 3s6-2 6-3v-4" />
                  </svg>
                ) : card.photo ? (
                  <Image src={card.photo.src} alt={card.photo.alt} fill className={styles.photo} />
                ) : null}
              </div>
              <div className={styles.label}>
                {card.emblem ? (
                  <Image
                    src={card.emblem.src}
                    alt=""
                    width={42}
                    height={42}
                    className={styles.labelEmblem}
                  />
                ) : (
                  <svg className={styles.labelSeal}>
                    <use href="#seal-light" />
                  </svg>
                )}
                <b className={styles.cardName}>{card.name}</b>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
