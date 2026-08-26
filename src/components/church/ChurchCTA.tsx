import styles from "./ChurchCTA.module.css";

type ChurchCTAProps = {
  // Nullable, additive — every church still sets a real cta (unaffected).
  // First null caller is a school: Shamlian-Tatikian's approved mockup has
  // no CTA band at all, so its cta is null rather than carrying invented
  // house-style copy.
  cta: {
    heading: string;
    headingHy: string | null;
    body: string;
    bodyHy: string | null;
  } | null;
};

// Closing "Join Us in Worship" band. Renders nothing when cta is null,
// matching the site's established null-renders-nothing pattern.
export default function ChurchCTA({ cta }: ChurchCTAProps) {
  if (!cta) return null;

  return (
    <section className={styles.cta}>
      <div className={styles.rule} />
      <h2 className={styles.heading}>{cta.heading}</h2>
      <p className={styles.body}>{cta.body}</p>
    </section>
  );
}
