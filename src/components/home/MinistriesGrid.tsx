"use client";

import Image from "next/image";
import Medallion from "@/components/shared/Medallion";
import { useScrollReveal } from "./useScrollReveal";
import styles from "./MinistriesGrid.module.css";

const ministries = [
  {
    title: "Churches & Missions",
    description:
      "Feeding the spiritual life of Armenian Evangelicals across the Near East",
    photo: "/ministry-churches-faec.jpg",
    icon: "ic-church",
  },
  {
    title: "Youth & Camp Ministries",
    description:
      "Empowering generations with faith-based leadership, and retreats across the region.",
    photo: "/ministry-youth-camp.jpg",
    icon: "ic-youth",
  },
  {
    title: "Education & Schools",
    description: "Upholding a legacy of excellence and Christian values",
    photo: "/ministry-education.jpg",
    icon: "ic-edu",
  },
  {
    title: "Cultural & Heritage",
    description: "Stewardship of the Armenian language and traditions",
    photo: "/ministry-cultural-heritage.jpeg",
    icon: "ic-culture",
  },
  {
    title: "Social & Medical Care",
    description:
      "Providing healthcare to the vulnerable, embodying the healing touch of the Gospel.",
    photo: "/ministry-social-medical.jpeg",
    icon: "ic-care",
  },
  {
    title: "Publications & Media",
    description:
      "Spreading the message of faith through magazine, radio broadcasts, and digital outreach.",
    photo: null,
    icon: "ic-media",
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

      <section ref={ref} data-visible={visible} className={styles.section}>
        <div className={styles.secHead}>
          <div className={styles.rule} />
          <h2 className={styles.heading}>Our Enduring Ministries</h2>
          <p className={styles.intro}>
            Six spheres of service carried across nine nations, from the
            pulpit to the classroom to the bedside.
          </p>
        </div>
        <div className={styles.grid}>
          {ministries.map((ministry) => (
            <article key={ministry.title} className={styles.card}>
              <div className={styles.thumb}>
                {ministry.photo ? (
                  <Image
                    src={ministry.photo}
                    alt={ministry.title}
                    fill
                    className={styles.photo}
                  />
                ) : (
                  <>
                    <span className={styles.glyph}>
                      <svg>
                        <use href={`#${ministry.icon}`} />
                      </svg>
                    </span>
                    <span className={styles.phTag}>Photo pending</span>
                  </>
                )}
              </div>
              <div className={styles.body}>
                <svg className={styles.ic}>
                  <use href={`#${ministry.icon}`} />
                </svg>
                <h3 className={styles.cardTitle}>{ministry.title}</h3>
                <p className={styles.cardDescription}>
                  {ministry.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
