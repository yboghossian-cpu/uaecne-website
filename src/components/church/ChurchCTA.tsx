import styles from "./ChurchCTA.module.css";

type ChurchCTAProps = {
  cta: {
    heading: string;
    headingHy: string | null;
    body: string;
    bodyHy: string | null;
  };
};

// Closing "Join Us in Worship" band; always rendered.
export default function ChurchCTA({ cta }: ChurchCTAProps) {
  return (
    <section className={styles.cta}>
      <div className={styles.rule} />
      <h2 className={styles.heading}>{cta.heading}</h2>
      <p className={styles.body}>{cta.body}</p>
    </section>
  );
}
