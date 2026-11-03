import Image from "next/image";
import styles from "./SchoolAbout.module.css";

type Photo = { src: string; alt: string };

type SchoolAboutProps = {
  about: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    paragraphs: string[];
    paragraphsHy: string[] | null;
    pullQuote: string | null;
    pullQuoteHy: string | null;
    // Optional sub-headed prose blocks (Shamlian-Tatikian's "A Brief
    // History"). Absent for every other school.
    subsections?: {
      heading: string;
      headingHy: string | null;
      paragraphs: string[];
      paragraphsHy: string[] | null;
    }[] | null;
  };
  principalCard: {
    name: string | null;
    nameHy: string | null;
    role: string;
    roleHy: string | null;
    photo: Photo | null;
  } | null;
};

// Eyebrow/heading/drop-cap paragraphs with an optional nullable pull-quote,
// and an optional principal card beside it (generalized from PastorCard —
// its photo is independently nullable so a verified name with no verified
// photo still renders honestly, as an arched placeholder, rather than
// falling back to no card at all).
export default function SchoolAbout({ about, principalCard }: SchoolAboutProps) {
  const text = (
    <>
      {about.paragraphs.map((paragraph, i) =>
        // A drop cap on an opening quotation mark looks broken — skip it.
        i === 0 && !/^[“"«‘']/.test(paragraph) ? (
          <p className={`${styles.paragraph} ${styles.lead}`} key={i}>
            <span className={styles.dropcap}>{paragraph.charAt(0)}</span>
            {paragraph.slice(1)}
          </p>
        ) : (
          <p className={i === 0 ? `${styles.paragraph} ${styles.lead}` : styles.paragraph} key={i}>
            {paragraph}
          </p>
        ),
      )}
      {about.pullQuote && (
        <div className={styles.pullquote}>
          <p className={styles.pullquoteText}>
            <span className={styles.q}>&ldquo;</span>
            {about.pullQuote}
            <span className={styles.q}>&rdquo;</span>
          </p>
        </div>
      )}
      {/* Opt-in sub-headed prose blocks (Shamlian-Tatikian's "A Brief
          History"). Absent for every other school. */}
      {about.subsections?.map((sub, i) => (
        <div className={styles.subsection} key={i}>
          <h3 className={styles.subheading}>{sub.heading}</h3>
          {sub.paragraphs.map((paragraph, j) => (
            <p className={styles.paragraph} key={j}>
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </>
  );

  const head = (
    <>
      <div className={styles.eyebrow}>{about.eyebrow}</div>
      <h2 className={styles.heading}>{about.heading}</h2>
    </>
  );

  // Editorial split: heading column on the left, the text on the right —
  // both edges on the page's one container.
  if (!principalCard) {
    return (
      <section className={styles.about}>
        <div className={styles.split}>
          <div className={styles.splitHead}>
            {head}
            <span className={styles.rule} aria-hidden="true" />
          </div>
          <div className={styles.splitBody}>{text}</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.about}>
      <div className={styles.grid}>
        <div className={styles.principalCard}>
          {principalCard.photo ? (
            <div className={styles.picWrap}>
              <Image
                src={principalCard.photo.src}
                alt={principalCard.photo.alt}
                fill
                className={styles.pic}
              />
            </div>
          ) : (
            <div className={styles.picPending}>
              <span className={styles.picPendingArch}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#ic-user" />
                </svg>
              </span>
            </div>
          )}
          <div className={styles.principalInfo}>
            <b className={styles.principalName}>{principalCard.name ?? "Name pending"}</b>
            <span className={styles.principalRole}>{principalCard.role}</span>
          </div>
        </div>
        <div>
          {head}
          {text}
        </div>
      </div>
    </section>
  );
}
