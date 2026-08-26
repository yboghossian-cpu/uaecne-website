"use client";

import Link from "next/link";
import ArchFrame from "@/components/shared/ArchFrame";
import Medallion from "@/components/shared/Medallion";
import { useScrollReveal } from "./useScrollReveal";
import styles from "./MinistriesGrid.module.css";

// "Ministries Across the Near East" — 4 arched cards linking to the site's
// real section-index routes, each filled with its real Homepage-folder
// photo (see OPEN_QUESTIONS for the sourcing/reuse notes). Replaces the
// earlier 6-card "Our Enduring Ministries" ministry-type grid entirely,
// per Yeghia's ruling, 2026-08-22 — ministered-TYPE framing/AI iconography
// is gone; this section now exists purely to route visitors into the 4
// built sections (Churches/Schools/Higher Education/Outreach).
const ministries = [
  {
    title: "Churches",
    description: "30+ congregations of worship across nine nations.",
    photo: "/ministry-churches.jpeg",
    icon: "ic-hp-church",
    href: "/churches",
  },
  {
    title: "Schools",
    description: "Armenian Evangelical education from kindergarten to secondary.",
    photo: "/school-armenian-evangelical-college.jpeg",
    icon: "ic-hp-book",
    href: "/schools",
  },
  {
    title: "Higher Education",
    description: "Haigazian University, NEST & the Educational Council.",
    photo: "/higher-ed-haigazian-hero.jpeg",
    icon: "ic-hp-cap",
    href: "/higher-education",
  },
  {
    title: "Outreach",
    description: "Camps, youth work & social action for the community.",
    photo: "/ministry-outreach.jpg",
    icon: "ic-hp-hands",
    href: "/outreach",
  },
];

export default function MinistriesGrid() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <>
      <div className={styles.divider}>
        <span className={styles.ln} />
        <span className={styles.dia} />
        <Medallion size={34} className={styles.dividerMedallion} />
        <span className={styles.dia} />
        <span className={styles.ln} />
      </div>

      <section
        ref={ref}
        data-visible={visible}
        className={`${styles.section} scroll-reveal`}
      >
        <div className={styles.secHead}>
          <div className={styles.eyebrow}>What We Do</div>
          <h2 className={styles.heading}>
            Ministries Across the <em className={styles.em}>Near East</em>
          </h2>
          <div className={styles.flourish}>
            <span className={styles.fln} />
            <Medallion size={26} className={styles.flMed} />
            <span className={styles.fln} />
          </div>
          <p className={styles.intro}>
            From congregations of worship to schools, universities, and works of compassion — the
            Union serves communities across nine nations. Explore the ministries that carry its
            mission forward.
          </p>
        </div>
        <div className={styles.grid}>
          {ministries.map((ministry) => (
            <Link key={ministry.title} href={ministry.href} className={styles.card}>
              <ArchFrame aspectRatio="3 / 4" photoSrc={ministry.photo} photoAlt={ministry.title}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <use href={`#${ministry.icon}`} />
                </svg>
              </ArchFrame>
              <div className={styles.cap}>
                <h3 className={styles.cardTitle}>{ministry.title}</h3>
                <p className={styles.cardDescription}>{ministry.description}</p>
                <span className={styles.go}>
                  Explore
                  <svg className={styles.goIcon} viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#ic-arrow" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
