"use client";

import Image from "next/image";
import { useScrollReveal } from "./useScrollReveal";
import styles from "./MinistriesGrid.module.css";

const ministries = [
  {
    title: "Churches & Missions",
    description:
      "Feeding the spiritual life of Armenian Evangelicals across the Near East",
    photo: "/ministry-churches.jpeg",
  },
  {
    title: "Youth & Camp Ministries",
    description:
      "Empowering generations with faith-based leadership, and retreats across the region.",
    photo: "/ministry-youth.jpg",
  },
  {
    title: "Education & Schools",
    description: "Upholding a legacy of excellence and Christian values",
    photo: "/ministry-education.jpg",
  },
  {
    title: "Cultural & Heritage",
    description: "Stewardship of the Armenian language and traditions",
    photo: null,
  },
  {
    title: "Social & Medical Care",
    description:
      "Providing healthcare to the vulnerable, embodying the healing touch of the Gospel.",
    photo: null,
  },
  {
    title: "Publications & Media",
    description:
      "Spreading the message of faith through magazine, radio broadcasts, and digital outreach.",
    photo: null,
  },
];

export default function MinistriesGrid() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} data-visible={visible} className={styles.section}>
      <h2 className={styles.heading}>Our Enduring Ministries</h2>
      <div className={styles.grid}>
        {ministries.map((ministry) => (
          <div key={ministry.title} className={styles.card}>
            <div className={styles.media}>
              {ministry.photo ? (
                <Image
                  src={ministry.photo}
                  alt={ministry.title}
                  fill
                  className={styles.photo}
                />
              ) : (
                <div className={styles.placeholder}>
                  <Image
                    src="/logo.svg"
                    alt=""
                    width={48}
                    height={48}
                    className={styles.placeholderSeal}
                  />
                  <span className={styles.placeholderCaption}>
                    Photo pending
                  </span>
                </div>
              )}
            </div>
            <div className={styles.content}>
              <h3 className={styles.cardTitle}>{ministry.title}</h3>
              <p className={styles.cardDescription}>{ministry.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
