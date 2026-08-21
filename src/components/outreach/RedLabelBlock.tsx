import styles from "./RedLabelBlock.module.css";

type RedLabelBlockProps = {
  label: string;
  paragraphs: string[];
  // Camps' "KCHAG Campsites" sits on plain ivory; Youth Work's "Christian
  // Endeavour Union" sits on the wash band (matching each mockup exactly).
  wash?: boolean;
};

// Red-gradient label cell + ivory paragraph body — the shared shape behind
// Camps' "KCHAG Campsites" and Youth Work's "Christian Endeavour Union"
// blocks (identical CSS in both mockups).
export default function RedLabelBlock({ label, paragraphs, wash }: RedLabelBlockProps) {
  return (
    <section className={wash ? `${styles.wrap} ${styles.wash} wash-band` : styles.wrap}>
      <div className={styles.block}>
        <div className={styles.label}>{label}</div>
        <div className={styles.body}>
          {paragraphs.map((paragraph, i) => (
            <p className={styles.paragraph} key={i}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
