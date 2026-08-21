import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Medallion from "@/components/shared/Medallion";
import { campsContent, youthWorkContent, socialActionContent } from "@/data/outreachContent";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Outreach — UAECNE",
};

// Only 3 sections, each genuinely different — a small hardcoded array,
// same reasoning as the Higher Education index.
const cards = [
  {
    id: campsContent.slug,
    slug: campsContent.slug,
    name: campsContent.title,
    photo: campsContent.heroPhoto,
  },
  {
    id: youthWorkContent.slug,
    slug: youthWorkContent.slug,
    name: youthWorkContent.title,
    photo: youthWorkContent.heroPhoto,
  },
  {
    id: socialActionContent.slug,
    slug: socialActionContent.slug,
    name: socialActionContent.title,
    photo: socialActionContent.heroPhoto,
  },
];

export default function OutreachIndexPage() {
  return (
    <>
      <section className={styles.hero}>
        <Medallion size={220} className={`${styles.med} ${styles.medLeft}`} />
        <Medallion size={220} className={`${styles.med} ${styles.medRight}`} />
        <div className={styles.heroInner}>
          <h1 className={styles.heroHeading}>Outreach</h1>
          <p className={styles.heroSub}>
            Camps, youth work, and social action — the UAECNE&rsquo;s ministry beyond the
            church walls, serving young people and the most vulnerable alike.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {cards.map((card) => (
            <Link key={card.id} href={`/outreach/${card.slug}`} className={styles.card}>
              <div className={styles.pic}>
                {card.photo ? (
                  <Image src={card.photo.src} alt={card.photo.alt} fill className={styles.photo} />
                ) : (
                  <span className={styles.glyph}>
                    <svg className={styles.glyphIcon}>
                      <use href="#ic-edu" />
                    </svg>
                    <span className={styles.glyphCaption}>Photo pending</span>
                  </span>
                )}
              </div>
              <div className={styles.label}>
                <b className={styles.cardName}>{card.name}</b>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
