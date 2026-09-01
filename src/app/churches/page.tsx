import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Medallion from "@/components/shared/Medallion";
import { churches } from "@/data/churches";
import { churchContent } from "@/data/churchContent";
import styles from "./page.module.css";

// Card photo/emblem derive from the detail page's own content when one
// exists — single source of truth, so the index card and the detail-page
// hero/logo can never diverge (this is what fixed Anjar showing its logo
// as the card photo). churches.ts stays the fallback for the 19 churches
// without a ChurchContent entry yet.
function cardPhoto(slug: string, fallback: string | null) {
  return churchContent[slug]?.heroPhoto ?? (fallback ? { src: fallback, alt: "" } : null);
}

function cardEmblem(slug: string, fallback: string | null) {
  return churchContent[slug]?.logo ?? (fallback ? { src: fallback, alt: "" } : null);
}

export const metadata: Metadata = {
  title: "Churches — UAECNE",
};

// Display grouping only — the underlying data keeps each church's real
// country value ("Syria" vs "Syria (Kessab)") untouched. Yeghia's decision,
// 2026-08-19: show Aleppo and Kessab together under one "Syria" section,
// Aleppo churches first (matches directory order).
const countryDisplayLabel: Record<string, string> = {
  Lebanon: "Lebanon",
  Syria: "Syria",
  "Syria (Kessab)": "Syria",
  Turkey: "Turkey",
  Iran: "Iran",
  Greece: "Greece",
  Australia: "Australia",
};

function groupByCountry() {
  const groups = new Map<string, typeof churches>();
  for (const church of churches) {
    const label = countryDisplayLabel[church.country] ?? church.country;
    const list = groups.get(label) ?? [];
    list.push(church);
    groups.set(label, list);
  }
  return [...groups.entries()];
}

export default function ChurchesIndexPage() {
  const groups = groupByCountry();

  return (
    <>
      <section className={styles.hero}>
        <Medallion size={220} className={`${styles.med} ${styles.medLeft}`} />
        <Medallion size={220} className={`${styles.med} ${styles.medRight}`} />
        <div className={styles.heroInner}>
          <h1 className={styles.heroHeading}>Churches</h1>
          <p className={styles.heroSub}>
            The UAECNE oversees Armenian and Syriac Evangelical churches
            across Lebanon, Syria, and seven other nations. Explore the
            churches below to learn about their history, leadership, and
            worship life.
          </p>
        </div>
      </section>

      {groups.map(([countryLabel, list], index) => (
        <section
          key={countryLabel}
          className={
            index % 2 === 0
              ? `${styles.country} ${styles.countryWash}`
              : styles.country
          }
        >
          <div className={styles.countryHead}>
            <span className={styles.ln} />
            <h2 className={styles.countryHeading}>{countryLabel}</h2>
            <span className={`${styles.ln} ${styles.lnR}`} />
          </div>
          <div className={styles.grid}>
            {list.map((church) => {
              const photo = cardPhoto(church.slug, church.photo);
              const emblem = cardEmblem(church.slug, church.emblem);
              return (
              <Link
                key={church.id}
                href={`/churches/${church.slug}`}
                className={styles.church}
              >
                {church.isNew && (
                  <span className={styles.newTag}>New</span>
                )}
                <div
                  className={
                    photo
                      ? styles.pic
                      : `${styles.pic} ${styles.picPending}`
                  }
                >
                  {photo ? (
                    <Image
                      src={photo.src}
                      alt={photo.alt || church.name}
                      fill
                      className={styles.photo}
                    />
                  ) : (
                    <span className={styles.glyph}>
                      <svg className={styles.glyphIcon}>
                        <use href="#ic-church" />
                      </svg>
                      <span className={styles.glyphCaption}>
                        Photo pending
                      </span>
                    </span>
                  )}
                </div>
                <div className={styles.label}>
                  {emblem ? (
                    <Image
                      src={emblem.src}
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
                  <b className={styles.churchName}>{church.name}</b>
                </div>
              </Link>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}
