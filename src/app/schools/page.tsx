import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Medallion from "@/components/shared/Medallion";
import { schools } from "@/data/schools";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Schools — UAECNE",
};

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
            {list.map((school) => (
              <Link
                key={school.id}
                href={`/schools/${school.slug}`}
                className={styles.school}
              >
                <div
                  className={
                    school.photo
                      ? styles.pic
                      : `${styles.pic} ${styles.picPending}`
                  }
                >
                  {school.photo ? (
                    <Image
                      src={school.photo}
                      alt={school.name}
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
                  {school.emblem ? (
                    <Image
                      src={school.emblem}
                      alt=""
                      width={34}
                      height={34}
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
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
