import Image from "next/image";
import type { ChurchContent } from "@/data/churchContent";
import styles from "./AnniversaryBand.module.css";

type AnniversaryBandProps = {
  anniversary: ChurchContent["anniversary"];
};

// Renders the approved Variant D mockup (design-reference/uaecne-ashrafieh-
// anniversary-final.html): a CONTAINED card (side padding, max-width 1180px,
// rounded, gold-bordered) with a full-width banner kicker, then a 3-column
// row — seal in a gold roundel | numeral+word+years | verse+citation —
// collapsing to a single stacked column with horizontal dividers on mobile.
// Renders nothing when null (every church except Ashrafieh, currently).
// `years`/`kicker` are split at render time to drive the two-year/dot
// layout — the Anniversary type itself is unchanged, this is presentation
// only. `logo` stays optional: if a future church has no seal image, the
// seal cell just renders empty rather than requiring one.
export default function AnniversaryBand({ anniversary }: AnniversaryBandProps) {
  if (!anniversary) return null;

  const [yearStart, yearEnd] = anniversary.years
    .split(/\s*[—–-]\s*/)
    .map((y) => y.trim());
  const [kickerStart, kickerEnd] = anniversary.kicker
    .split(" · ")
    .map((k) => k.trim());

  return (
    <section className={styles.annivSection}>
      <div className={styles.anniv}>
        <div className={styles.banner}>
          <div className={styles.kick}>
            {kickerEnd ? (
              <>
                {kickerStart}
                <span className={styles.dot}>·</span>
                {kickerEnd}
              </>
            ) : (
              anniversary.kicker
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={`${styles.cell} ${styles.cellSeal}`}>
            {anniversary.logo && (
              <div className={styles.seal}>
                <div className={styles.inner}>
                  <div className={styles.sealImgFrame}>
                    <Image
                      src={anniversary.logo.src}
                      alt={anniversary.logo.alt}
                      fill
                      className={styles.sealImg}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={`${styles.cell} ${styles.cellMark} ${styles.bordered}`}>
            <div className={styles.num}>{anniversary.numeral}</div>
            <div className={styles.word}>{anniversary.label}</div>
            {yearEnd ? (
              <div className={styles.years}>
                <span className={styles.rule} />
                <span className={styles.yr}>{yearStart}</span>
                <span className={styles.dia} />
                <span className={styles.yr}>{yearEnd}</span>
                <span className={`${styles.rule} ${styles.ruleR}`} />
              </div>
            ) : (
              <div className={styles.years}>
                <span className={styles.yr}>{anniversary.years}</span>
              </div>
            )}
          </div>

          <div className={`${styles.cell} ${styles.cellVerse} ${styles.bordered}`}>
            <p className={styles.verse}>
              <span className={styles.q}>&ldquo;</span>
              {anniversary.verse}
              <span className={styles.q}>&rdquo;</span>
            </p>
            <div className={styles.ref}>
              {anniversary.verseRef}
              <span className={styles.sep}>·</span>
              {anniversary.verseLabel}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
