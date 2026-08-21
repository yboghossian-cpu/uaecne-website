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
  const hasCard = principalCard && principalCard.name;

  return (
    <section className={styles.about}>
      <div className={hasCard ? styles.grid : `${styles.grid} ${styles.solo}`}>
        {hasCard && (
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
              <b className={styles.principalName}>{principalCard.name}</b>
              <span className={styles.principalRole}>{principalCard.role}</span>
            </div>
          </div>
        )}
        <div>
          <div className={styles.eyebrow}>{about.eyebrow}</div>
          <h2 className={styles.heading}>{about.heading}</h2>
          {about.paragraphs.map((paragraph, i) =>
            i === 0 ? (
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
          {about.pullQuote && (
            <div className={styles.pullquote}>
              <p className={styles.pullquoteText}>
                <span className={styles.q}>&ldquo;</span>
                {about.pullQuote}
                <span className={styles.q}>&rdquo;</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
