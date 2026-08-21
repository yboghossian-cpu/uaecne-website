import Image from "next/image";
import type { YouthWorkContent } from "@/data/outreachContent";
import styles from "./YouthWorkAbout.module.css";

type YouthWorkAboutProps = {
  about: YouthWorkContent["about"];
  director: YouthWorkContent["director"];
};

// Bolds the director's own name wherever it appears in a paragraph
// (matching the mockup's <b>Pastor Datev Basmajian</b> emphasis) via a
// plain string split — never dangerouslySetInnerHTML.
function renderParagraph(paragraph: string, boldName: string) {
  const idx = paragraph.indexOf(boldName);
  if (idx === -1) return paragraph;
  return (
    <>
      {paragraph.slice(0, idx)}
      <b>{boldName}</b>
      {paragraph.slice(idx + boldName.length)}
    </>
  );
}

// About text beside the director card — photo + name only, no title/role
// shown on the card (matching the mockup exactly; the director's role is
// described in the About prose instead).
export default function YouthWorkAbout({ about, director }: YouthWorkAboutProps) {
  return (
    <section className={styles.about}>
      <div className={styles.grid}>
        <div className={styles.card}>
          {director.photo ? (
            <div className={styles.picWrap}>
              <Image
                src={director.photo.src}
                alt={director.photo.alt}
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
            <b className={styles.cardName}>{director.name}</b>
          </div>
        </div>
        <div>
          <div className={styles.eyebrow}>{about.eyebrow}</div>
          <h2 className={styles.heading}>{about.heading}</h2>
          {about.paragraphs.map((paragraph, i) => (
            <p className={styles.paragraph} key={i}>
              {renderParagraph(paragraph, director.name)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
