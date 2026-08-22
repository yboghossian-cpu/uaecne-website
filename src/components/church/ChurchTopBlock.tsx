import Image from "next/image";
import type { Church } from "@/data/churches";
import ChurchFactsBar from "./ChurchFactsBar";
import styles from "./ChurchTopBlock.module.css";

type Photo = { src: string; alt: string };
type Fact = { label: string; labelHy: string | null; sub: string; subHy: string | null };
type Masthead = {
  locationLine: string;
  locationLineHy: string | null;
  established: string;
  establishedHy: string | null;
  establishedLabel?: string;
  secondDate?: { label: string; value: string } | null;
};

type ChurchTopBlockProps = {
  church: Church;
  masthead: Masthead;
  logo: Photo | null;
  // Nullable — a church with no confirmed hero photo falls back to the
  // same arched "photo pending" treatment used elsewhere (Schools/
  // Outreach), rather than requiring every church to have a real photo.
  heroPhoto: Photo | null;
  factsBar: Fact[];
};

// Masthead: optional circular logo, h1 church name, meta line (location ·
// established year — from ChurchContent's own `masthead` field, carrying the
// reference file's verified wording verbatim; NOT derived from churches.ts,
// since that directory data can disagree with the verified reference on
// facts like neighborhood name or founding year — see the note on
// ChurchContent.masthead in churchContent.ts), the wide hero photo, and the
// red facts strip.
export default function ChurchTopBlock({
  church,
  masthead,
  logo,
  heroPhoto,
  factsBar,
}: ChurchTopBlockProps) {
  return (
    <section className={styles.top}>
      <div className={styles.titleRow}>
        {logo && (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={96}
            height={96}
            className={styles.logo}
          />
        )}
        <div>
          <h1 className={styles.heading}>{church.name}</h1>
          <div className={styles.meta}>
            {masthead.locationLine}
            {` · ${masthead.establishedLabel ?? "Established"} `}
            <b className={styles.estYear}>{masthead.established}</b>
            {masthead.secondDate && (
              <>
                {` · ${masthead.secondDate.label} `}
                <b className={styles.estYear}>{masthead.secondDate.value}</b>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={heroPhoto ? styles.hero : `${styles.hero} ${styles.heroPending}`}>
        {heroPhoto ? (
          <Image src={heroPhoto.src} alt={heroPhoto.alt} fill className={styles.heroImg} />
        ) : (
          <span className={styles.heroGlyph}>
            <svg className={styles.heroGlyphIcon} viewBox="0 0 24 24" aria-hidden="true">
              <use href="#ic-church" />
            </svg>
            <span className={styles.heroGlyphCaption}>Photo pending</span>
          </span>
        )}
      </div>

      <ChurchFactsBar facts={factsBar} />
    </section>
  );
}
