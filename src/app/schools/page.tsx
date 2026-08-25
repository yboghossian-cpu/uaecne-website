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
// only for schools with no SchoolContent entry at all. Checks entry
// existence directly (not `??`) so an entry's own explicit `heroPhoto:
// null` (AESSA — verified no building photo exists) renders the
// photo-pending placeholder instead of incorrectly falling through to
// schools.ts's fallback field.
function cardPhoto(slug: string, fallback: string | null) {
  const entry = schoolContent[slug];
  if (entry) return entry.heroPhoto;
  return fallback ? { src: fallback, alt: "" } : null;
}
function cardEmblem(slug: string, fallback: string | null) {
  const entry = schoolContent[slug];
  if (entry) return entry.logo;
  return fallback ? { src: fallback, alt: "" } : null;
}

// Display grouping only — the underlying data keeps each school's real
// `country` value ("Syria" vs "Syria (Kessab)") untouched. Mirrors
// churches/page.tsx's own `countryDisplayLabel` exactly (same rationale:
// Kessab shows under the single "Syria" section, Aleppo/Damascus schools
// first, matching directory order — Kessab Martyrs is appended last).
const countryDisplayLabel: Record<string, string> = {
  Lebanon: "Lebanon",
  Syria: "Syria",
  "Syria (Kessab)": "Syria",
};

function groupByCountry() {
  const groups = new Map<string, typeof schools>();
  for (const school of schools) {
    const label = countryDisplayLabel[school.country] ?? school.country;
    const list = groups.get(label) ?? [];
    list.push(school);
    groups.set(label, list);
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
