import { getT, getL } from "@/lib/i18n/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Medallion from "@/components/shared/Medallion";
import {
  campsContent as campsContent__en,
  youthWorkContent as youthWorkContent__en,
  socialActionContent as socialActionContent__en,
  boardingHomeContent as boardingHomeContent__en,
} from "@/data/outreachContent";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Outreach — UAECNE",
};

// 4 sections, each genuinely different — a small hardcoded array, same
// reasoning as the Higher Education index. Boarding Home added 2026-08-21,
// routed under Outreach per Yeghia's explicit ruling (its own mockup's
// crumb read "Ministries › Schools › Lebanon" — see OPEN_QUESTIONS).
const cardsEn = [
  {
    id: campsContent__en.slug,
    href: `/outreach/${campsContent__en.slug}`,
    name: campsContent__en.title,
    photo: campsContent__en.heroPhoto,
  },
  {
    id: youthWorkContent__en.slug,
    href: `/outreach/${youthWorkContent__en.slug}`,
    name: youthWorkContent__en.title,
    photo: youthWorkContent__en.heroPhoto,
  },
  {
    id: socialActionContent__en.slug,
    href: `/outreach/${socialActionContent__en.slug}`,
    name: socialActionContent__en.title,
    photo: socialActionContent__en.heroPhoto,
  },
  {
    id: boardingHomeContent__en.slug,
    href: `/outreach/${boardingHomeContent__en.slug}`,
    name: boardingHomeContent__en.title,
    photo: boardingHomeContent__en.heroPhoto,
  },
  {
    id: "syria-social-action-committee",
    href: "/ministries/syria/social-action-committee",
    name: "Social Action Committee — Syria",
    photo: null,
  },
  {
    id: "zvartnots",
    href: "/outreach/zvartnots",
    name: "Zvartnots",
    photo: null,
  },
];

export default async function OutreachIndexPage() {
  const L = await getL();
  const cards = L(cardsEn);
  const tx = await getT();
  return (
    <>
      <section className={styles.hero}>
        <Medallion size={220} className={`${styles.med} ${styles.medLeft}`} />
        <Medallion size={220} className={`${styles.med} ${styles.medRight}`} />
        <div className={styles.heroInner}>
          <h1 className={styles.heroHeading}>{tx("Outreach")}</h1>
          <p className={styles.heroSub}>
            {tx("Camps, youth work, and social action — the UAECNE’s ministry beyond the church walls, serving young people and the most vulnerable alike.")}
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {cards.map((card) => (
            <Link key={card.id} href={card.href} className={styles.card}>
              <div className={styles.pic}>
                {card.photo ? (
                  <Image src={card.photo.src} alt={card.photo.alt} fill className={styles.photo} />
                ) : (
                  <span className={styles.glyph}>
                    <svg className={styles.glyphIcon}>
                      <use href="#ic-edu" />
                    </svg>
                    <span className={styles.glyphCaption}>{tx("Photo pending")}</span>
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
