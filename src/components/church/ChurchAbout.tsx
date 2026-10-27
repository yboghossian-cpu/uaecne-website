import PastorCard from "./PastorCard";
import styles from "./ChurchAbout.module.css";

type Photo = { src: string; alt: string };

type ChurchAboutProps = {
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    // Small italic pill (e.g. "The church's pulpit is currently vacant.") —
    // a verified fact from the church's own text, shown after the prose.
    vacancyNote: string | null;
    // Directory-only churches: no verified prose yet.
    pending: boolean;
  };
  pastorCard: { name: string; role: string; photo: Photo | null };
};

// Locked template: pastor card on the left, About text on the right, first
// paragraph with the gold drop cap. Same layout for every church — a missing
// photo or name shows as pending inside the card, never a different layout.
export default function ChurchAbout({ about, pastorCard }: ChurchAboutProps) {
  return (
    <section className={styles.about}>
      <div className={styles.grid}>
        <PastorCard name={pastorCard.name} role={pastorCard.role} photo={pastorCard.photo} />
        <div>
          <div className={styles.eyebrow}>{about.eyebrow}</div>
          <h2 className={styles.heading}>{about.heading}</h2>
          {about.pending ? (
            <p className={styles.pendingNote}>
              The full profile of this church — its history, ministries and leadership — is being
              prepared. Contact details below are current.
            </p>
          ) : (
            about.paragraphs.map((paragraph, i) =>
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
            )
          )}
          {about.vacancyNote && <span className={styles.vacancy}>{about.vacancyNote}</span>}
        </div>
      </div>
    </section>
  );
}
