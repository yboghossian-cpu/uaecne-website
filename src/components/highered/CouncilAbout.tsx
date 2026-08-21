import styles from "./CouncilAbout.module.css";

type CouncilAboutProps = {
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
};

// Solo About text, no photo card (the Council has no single "leader" photo
// slot the way an institution has a president) — centered, dropcap first
// paragraph.
export default function CouncilAbout({ about }: CouncilAboutProps) {
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
      </div>
    </section>
  );
}
