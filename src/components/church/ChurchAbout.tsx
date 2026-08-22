import PastorCard from "./PastorCard";
import styles from "./ChurchAbout.module.css";

type Photo = { src: string; alt: string };

type ChurchAboutProps = {
  about: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    paragraphs: string[];
    paragraphsHy: string[] | null;
  };
  pastorCard: {
    name: string;
    nameHy: string | null;
    role: string;
    roleHy: string | null;
    photo: Photo;
  } | null;
  // Both additive/optional — FAEC and Syriac (the only churches built
  // before the Syria unit) don't set either, so both default to their
  // existing behavior unaffected.
  dropcap?: boolean; // default true, matching FAEC/Syriac's own reference
  pullQuote?: string | null; // default null — an italic gold-rule pull-line beneath the prose (Bethel's mockup .pullquote)
  // Optional small solid-border italic pill (e.g. "The church's pulpit is
  // currently vacant.") rendered after the paragraphs, before pullQuote —
  // Syriac Aleppo's mockup .vacancy badge. Null/omitted for every church
  // without one.
  vacancyNote?: string | null;
};

// Eyebrow/heading/drop-cap paragraphs, with an optional PastorCard beside it.
// Single-column layout when pastorCard is null — not exercised by FAEC or
// Syriac (both have one), but the component must support the null case for
// future churches.
export default function ChurchAbout({
  about,
  pastorCard,
  dropcap = true,
  pullQuote,
  vacancyNote,
}: ChurchAboutProps) {
  return (
    <section className={styles.about}>
      <div className={pastorCard ? styles.grid : `${styles.grid} ${styles.solo}`}>
        {pastorCard && (
          <PastorCard name={pastorCard.name} role={pastorCard.role} photo={pastorCard.photo} />
        )}
        <div>
          <div className={styles.eyebrow}>{about.eyebrow}</div>
          <h2 className={styles.heading}>{about.heading}</h2>
          {about.paragraphs.map((paragraph, i) =>
            dropcap && i === 0 ? (
              <p className={styles.paragraph} key={i}>
                <span className={styles.dropcap}>{paragraph.charAt(0)}</span>
                {paragraph.slice(1)}
              </p>
            ) : (
              <p className={styles.paragraph} key={i}>
                {paragraph}
              </p>
            ),
          )}
          {vacancyNote && <span className={styles.vacancy}>{vacancyNote}</span>}
          {pullQuote && (
            <div className={styles.pullQuote}>
              <p>{pullQuote}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
