import Image from "next/image";
import type { ChurchContent } from "@/data/churchContent";
import styles from "./ChurchHistory.module.css";

type ChurchHistoryProps = {
  history: ChurchContent["history"];
};

// Renders `history.sections` as repeating heading+paragraphs; renders
// nothing when null. A section renders no <h3> when its own `heading` is
// null (its content sits directly under the top-level history heading — the
// reference files' pattern for an unheaded founding narrative, e.g.
// Emmanuel). A section with a non-null `image` renders as a 2-column
// .hsplit (paragraphs left, image right at >=720px, stacked on mobile) —
// the reference files' side-photo history treatment.
export default function ChurchHistory({ history }: ChurchHistoryProps) {
  if (!history) return null;

  return (
    <section className={styles.history}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>{history.eyebrow}</div>
        <h2 className={styles.heading}>{history.heading}</h2>
        {history.sections.map((section, i) =>
          section.image ? (
            <div key={i} className={styles.hsplit}>
              <div className={styles.hsplitText}>
                {section.heading && (
                  <h3 className={styles.subheading}>{section.heading}</h3>
                )}
                {section.paragraphs.map((paragraph, j) => (
                  <p className={styles.paragraph} key={j}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <figure className={styles.himg}>
                <div className={styles.himgFrame}>
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    className={styles.himgPhoto}
                  />
                </div>
              </figure>
            </div>
          ) : (
            <div key={i}>
              {section.heading && (
                <h3 className={styles.subheading}>{section.heading}</h3>
              )}
              {section.paragraphs.map((paragraph, j) => (
                <p className={styles.paragraph} key={j}>
                  {paragraph}
                </p>
              ))}
            </div>
          ),
        )}
      </div>
    </section>
  );
}
