import Image from "next/image";
import type { ChurchContent } from "@/data/churchContent";
import styles from "./AnniversaryBand.module.css";

type AnniversaryBandProps = {
  anniversary: ChurchContent["anniversary"];
};

// Renders the reference files' "100th Anniversary" banner treatment —
// dedicated badge image, two-line numeral+word heading, a date range, and a
// scripture quote with its own citation + editorial label — joined with the
// reference's own " · " separator to match its rendered line exactly while
// keeping the two as separate, independently-translatable data fields.
// Renders nothing when null (every church except Ashrafieh, currently).
// When `logo` is null (Ashrafieh — its badge was identical to its masthead
// seal), renders text-only, centered in a constrained column at desktop
// instead of left-floating in an empty two-column grid.
export default function AnniversaryBand({ anniversary }: AnniversaryBandProps) {
  if (!anniversary) return null;

  return (
    <section className={styles.anniv}>
      <div className={anniversary.logo ? styles.wrap : `${styles.wrap} ${styles.wrapCentered}`}>
        {anniversary.logo && (
          <div className={styles.logoFrame}>
            <Image
              src={anniversary.logo.src}
              alt={anniversary.logo.alt}
              fill
              className={styles.logoImg}
            />
          </div>
        )}
        <div className={styles.txt}>
          <div className={styles.kick}>{anniversary.kicker}</div>
          <h2 className={styles.heading}>
            {anniversary.numeral}
            <em className={styles.label}>{anniversary.label}</em>
          </h2>
          <div className={styles.years}>{anniversary.years}</div>
          <p className={styles.verse}>
            &ldquo;{anniversary.verse}&rdquo;
            <span className={styles.ref}>
              {anniversary.verseRef} · {anniversary.verseLabel}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
