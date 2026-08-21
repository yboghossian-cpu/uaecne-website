import type { SocialActionContent } from "@/data/outreachContent";
import styles from "./SACAbout.module.css";

type SACAboutProps = {
  about: SocialActionContent["about"];
};

// Solo About text (no photo/president card) + pull-quote — SAC's own
// shape.
export default function SACAbout({ about }: SACAboutProps) {
  return (
    <section className={styles.about}>
      <div className={styles.inner}>
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
        <div className={styles.pullquote}>
          <p className={styles.pullquoteText}>{about.pullQuote}</p>
        </div>
      </div>
    </section>
  );
}
