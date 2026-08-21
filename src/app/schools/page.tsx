import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Medallion from "@/components/shared/Medallion";
import { schools } from "@/data/schools";
import { schoolContent } from "@/data/schoolContent";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Schools — UAECNE",
};

// Single source of truth: when a school has a SchoolContent detail-page
// entry, the index card derives its photo/emblem from that same content
// (heroPhoto/logo) rather than schools.ts's own fields — so the index and
// detail page can never show different images. Falls back to schools.ts
// for the 2 schools without a SchoolContent entry yet.
function cardPhoto(slug: string, fallback: string | null) {
  return schoolContent[slug]?.heroPhoto ?? (fallback ? { src: fallback, alt: "" } : null);
}
function cardEmblem(slug: string, fallback: string | null) {
  return schoolContent[slug]?.logo ?? (fallback ? { src: fallback, alt: "" } : null);
}

function groupByCountry() {
  const groups = new Map<string, typeof schools>();
  for (const school of schools) {
    const list = groups.get(school.country) ?? [];
    list.push(school);
    groups.set(school.country, list);
  }
  return [...groups.entries()];
}

export default function SchoolsIndexPage() {
  const groups = groupByCountry();

  return (
    <>
      <section className={styles.hero}>
        <Medallion size={220} className={`${styles.med} ${styles.medLeft}`} />
        <Medallion size={220} className={`${styles.med} ${styles.medRight}`} />
        <div className={styles.heroInner}>
          <h1 className={styles.heroHeading}>Schools</h1>
          <p className={styles.heroSub}>
            The UAECNE sustains a network of Armenian Evangelical schools
            carrying a legacy of education, faith, and Armenian heritage.
            Explore the schools below to learn about their history,
            programs, and community.
          </p>
        </div>
      </section>

      {groups.map(([country, list], index) => (
        <section
          key={country}
          className={
            index % 2 === 0
              ? `${styles.country} ${styles.countryWash}`
              : styles.country
          }
        >
          <div className={styles.countryHead}>
            <span className={styles.ln} />
            <h2 className={styles.countryHeading}>{country}</h2>
            <span className={`${styles.ln} ${styles.lnR}`} />
          </div>
          <div className={styles.grid}>
            {list.map((school) => {
              const photo = cardPhoto(school.slug, school.photo);
              const emblem = cardEmblem(school.slug, school.emblem);
              return (
                <Link
                  key={school.id}
                  href={`/schools/${school.slug}`}
                  className={styles.school}
                >
                  <div
                    className={
                      photo ? styles.pic : `${styles.pic} ${styles.picPending}`
                    }
                  >
                    {photo ? (
                      <Image
                        src={photo.src}
                        alt={photo.alt || school.name}
                        fill
                        className={styles.photo}
                      />
                    ) : (
                      <span className={styles.glyph}>
                        <svg className={styles.glyphIcon}>
                          <use href="#ic-edu" />
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
                    <b className={styles.schoolName}>{school.name}</b>
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
