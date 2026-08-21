import Image from "next/image";
import type { SchoolContent } from "@/data/schoolContent";
import styles from "./SchoolInquiry.module.css";

type Photo = { src: string; alt: string };

type SchoolInquiryProps = {
  inquiry: SchoolContent["inquiry"];
  heroPhoto: Photo | null;
  schoolName: string;
};

// Mailto-only inquiry card (PROJECT_BRIEF.md rule 7 — no backend/paid
// form). Watermark is the school's own hero photo at ~7% opacity behind
// the wash; falls back to a plain wash when no photo exists. Null when no
// verified school email exists at all (Shamlian-Tatikian) — never invented.
export default function SchoolInquiry({ inquiry, heroPhoto, schoolName }: SchoolInquiryProps) {
  if (!inquiry) return null;

  const mailHref = `mailto:${inquiry.email}?subject=${encodeURIComponent(`Inquiry — ${schoolName}`)}`;

  return (
    <section className={`${styles.inquiry} wash-band`}>
      {heroPhoto && (
        <Image
          src={heroPhoto.src}
          alt=""
          fill
          aria-hidden="true"
          className={styles.watermark}
        />
      )}
      <div className={styles.card}>
        <div className={styles.eyebrow}>{inquiry.eyebrow}</div>
        <h2 className={styles.heading}>{inquiry.heading}</h2>
        <p className={styles.body}>{inquiry.body}</p>
        <a className={styles.btn} href={mailHref}>
          {inquiry.buttonLabel} →
        </a>
      </div>
    </section>
  );
}
