import styles from "./ChurchPrograms.module.css";

type ChurchProgramsProps = {
  programs: {
    eyebrow: string | null;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    items: string[];
    itemsHy: string[] | null;
  } | null;
};

// Renders `programs.items` as a list; renders nothing when null (e.g. FAEC).
export default function ChurchPrograms({ programs }: ChurchProgramsProps) {
  if (!programs) return null;

  return (
    <section className={styles.programs}>
      <div className={styles.wrap}>
        {programs.eyebrow && <div className={styles.eyebrow}>{programs.eyebrow}</div>}
        <h2 className={styles.heading}>{programs.heading}</h2>
        <div className={styles.grid}>
          {programs.items.map((item, i) => (
            <div className={styles.item} key={i}>
              <svg className={styles.dot}>
                <use href="#ic-dot" />
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
