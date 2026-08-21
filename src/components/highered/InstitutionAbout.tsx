import Image from "next/image";
import styles from "./InstitutionAbout.module.css";

type Photo = { src: string; alt: string };

type InstitutionAboutProps = {
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    pullQuote: string | null;
  };
  president: {
    name: string;
    role: string;
    photo: Photo | null;
  };
};

// About text (drop-cap first paragraph, optional pull-quote) beside the
// president/leader card — mirrors SchoolAbout's shape, with "president"
// generalized instead of "principal." Photo independently nullable (falls
// back to a plain icon placeholder, no invented photo).
export default function InstitutionAbout({ about, president }: InstitutionAboutProps) {
  return (
    <section className={styles.about}>
      <div className={styles.grid}>
        <div className={styles.card}>
          {president.photo ? (
            <div className={styles.picWrap}>
              <Image
                src={president.photo.src}
                alt={president.photo.alt}
                fill
                className={styles.pic}
              />
            </div>
          ) : (
            <div className={styles.picPending}>
              <svg className={styles.picPendingIcon} viewBox="0 0 24 24" aria-hidden="true">
                <use href="#ic-user" />
              </svg>
            </div>
          )}
          <div className={styles.cardInfo}>
            <b className={styles.cardName}>{president.name}</b>
            <span className={styles.cardRole}>{president.role}</span>
          </div>
        </div>
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
              <p className={styles.pullquoteText}>{about.pullQuote}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
