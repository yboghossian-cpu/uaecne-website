import { isSquareEmblem } from "@/lib/emblem";
import { getT } from "@/lib/i18n/server";
import Image from "next/image";
import type { School } from "@/data/schools";
import SchoolFactsBar from "./SchoolFactsBar";
import styles from "./SchoolTopBlock.module.css";

type Photo = { src: string; alt: string; position?: string };
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
  motto?: string | null;
  mottoHy?: string | null;
};

type SchoolTopBlockProps = {
  school: School;
  masthead: Masthead;
  logo: Photo | null;
  heroPhoto: Photo | null;
  factsBar: Fact[];
  accreditedBy?: string | null;
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
export default async function SchoolTopBlock({
  school,
  masthead,
  logo,
  heroPhoto,
  factsBar,
  accreditedBy = null,
}: SchoolTopBlockProps) {
  const tx = await getT();
  const crest = !heroPhoto && !!logo && !!(masthead.tagline || masthead.motto);
  return (
    <section className={styles.top}>
      <div className={styles.titleRow}>
        {logo && !crest && (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={96}
            height={96}
            className={isSquareEmblem(logo.src) ? `${styles.logo} ${styles.squareLogo}` : styles.logo}
          />
        )}
        <div>
          <h1 className={styles.heading}>{school.name}</h1>
          <div className={styles.meta}>
            {masthead.locationLine}
            {masthead.established && (
              <>
                {tx(" · Founded ")}
                <b className={styles.estYear}>{masthead.established}</b>
              </>
            )}
          </div>
          {accreditedBy && (
            <div className={styles.accredited}>
              <svg viewBox="0 0 24 24" className={styles.accreditedIcon} aria-hidden="true">
                <circle cx="12" cy="12" r="10" fill="currentColor" />
                <path d="M7.5 12.5l3 3 6-6.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {tx("Accredited")} · {tx(accreditedBy)}
            </div>
          )}
        </div>
      </div>

      {heroPhoto ? (
        <div className={styles.hero}>
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            fill
            className={styles.heroImg}
            style={heroPhoto.position ? { objectPosition: heroPhoto.position } : undefined}
            priority
          />
        </div>
      ) : crest && logo ? (
        // No building photo yet: a crest panel built only from the school's
        // own emblem, tagline and motto — no stand-in imagery.
        <div className={styles.crestHero}>
          <svg className={styles.crestWatermark} aria-hidden="true">
            <use href="#med" />
          </svg>
          <div className={styles.crestEmblem}>
            <Image src={logo.src} alt="" width={220} height={220} className={styles.crestEmblemImg} />
          </div>
          <div className={styles.crestText}>
            {masthead.tagline && <p className={styles.crestTagline}>{masthead.tagline}</p>}
            {masthead.motto && (
              <div className={styles.crestMotto}>
                <span className={styles.crestMottoLabel}>{tx("Motto")}</span>
                <p className={styles.crestMottoText}>{masthead.motto}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={`${styles.hero} ${styles.heroPending}`}>
          <span className={styles.heroGlyph}>
            <svg className={styles.heroGlyphIcon} aria-hidden="true">
              <use href="#ic-edu" />
            </svg>
            <span className={styles.heroGlyphCaption}>{tx("Photo pending")}</span>
          </span>
        </div>
      )}

      <SchoolFactsBar facts={factsBar} />
    </section>
  );
}
