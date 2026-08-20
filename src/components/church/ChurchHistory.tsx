import styles from "./ChurchHistory.module.css";

type HistorySection = {
  heading: string;
  headingHy: string | null;
  paragraphs: string[];
  paragraphsHy: string[] | null;
  image: { src: string; alt: string } | null;
};

type ChurchHistoryProps = {
  history: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    sections: HistorySection[];
  } | null;
};

// Renders `history.sections` as repeating heading+paragraphs; renders
// nothing when null. `section.image` is carried in the data (for Emmanuel's
// future .hsplit side-photo module) but not rendered here — not exercised
// by FAEC or Syriac this unit.
export default function ChurchHistory({ history }: ChurchHistoryProps) {
  if (!history) return null;

  return (
    <section className={styles.history}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>{history.eyebrow}</div>
        <h2 className={styles.heading}>{history.heading}</h2>
        {history.sections.map((section, i) => (
          <div key={i}>
            <h3 className={styles.subheading}>{section.heading}</h3>
            {section.paragraphs.map((paragraph, j) => (
              <p className={styles.paragraph} key={j}>
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
