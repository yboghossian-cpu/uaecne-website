import Image from "next/image";
import type { School } from "@/data/schools";
import SchoolFactsBar from "./SchoolFactsBar";
import styles from "./SchoolTopBlock.module.css";

type Photo = { src: string; alt: string };
type Fact = { label: string; labelHy: string | null; sub: string; subHy: string | null };
type Masthead = {
  locationLine: string;
  locationLineHy: string | null;
  // Nullable — Emmanuel al-Ressaleh's mockup has no founding year in the
  // masthead meta line at all (its own facts bar carries "Pending" for
  // Founding Year instead); null skips the " · Founded X" clause entirely
  // rather than rendering an odd "Founded Pending."
  established: string | null;
  establishedHy: string | null;
  // Optional italic tagline under the school name (Shamlian-Tatikian's own
  // mockup). Absent for every other school.
  tagline?: string | null;
  taglineHy?: string | null;
};

type SchoolTopBlockProps = {
  school: School;
  masthead: Masthead;
  logo: Photo | null;
  heroPhoto: Photo | null;
  factsBar: Fact[];
};

// Masthead: circular seal, h1 school name, meta line (location · founded
// year, verbatim from SchoolContent.masthead — schools.ts carries no
// address/estYear fields to fall back to), the wide hero photo, and the
// red facts strip. Structurally identical to ChurchTopBlock.
//
// heroPhoto is nullable (template amendment A, for AESSA and future
// photo-less schools): with no verified building photo, the hero keeps its
// normal rounded-rect shape but renders the same "photo pending" language
// as the schools index card's placeholder (diagonal-stripe wash + icon +
// caption) instead of a decorative crest graphic — never a bare gray box.
export default function SchoolTopBlock({
  school,
  masthead,
  logo,
  heroPhoto,
  factsBar,
}: SchoolTopBlockProps) {
  return (
    <section className={styles.top}>
      <div className={styles.titleRow}>
        {logo && (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={80}
            height={80}
            className={styles.logo}
          />
        )}
        <div>
          <h1 className={styles.heading}>{school.name}</h1>
          {/* Opt-in: only a school whose own mockup carries a tagline sets
              this. Absent for every other school, which render unchanged. */}
          {masthead.tagline && (
            <div className={styles.tagline}>{masthead.tagline}</div>
          )}
          <div className={styles.meta}>
            {masthead.locationLine}
            {masthead.established && (
              <>
                {" · Founded "}
                <b className={styles.estYear}>{masthead.established}</b>
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
            <svg className={styles.heroGlyphIcon} aria-hidden="true">
              <use href="#ic-edu" />
            </svg>
            <span className={styles.heroGlyphCaption}>Photo pending</span>
          </span>
        )}
      </div>

      <SchoolFactsBar facts={factsBar} />
    </section>
  );
}
