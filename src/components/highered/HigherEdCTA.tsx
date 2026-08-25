import type { HigherEdCTA as HigherEdCTAType } from "@/data/higherEdContent";
import styles from "./HigherEdCTA.module.css";

type HigherEdCTAProps = {
  cta: HigherEdCTAType;
};

// Closing band with a real link button — unlike ChurchCTA (heading+body
// only), every Higher Education mockup has one. External domains open in
// a new tab; the Council's internal /schools link stays same-tab.
export default function HigherEdCTA({ cta }: HigherEdCTAProps) {
  const isExternal = cta.buttonHref?.startsWith("http") ?? false;

  return (
    <section className={styles.cta}>
      <div className={styles.rule} />
      <h2 className={styles.heading}>{cta.heading}</h2>
      <p className={styles.body}>{cta.body}</p>
      {cta.buttonHref && cta.buttonLabel && (
        <a
          className={styles.btn}
          href={cta.buttonHref}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {cta.buttonLabel} →
        </a>
      )}
    </section>
  );
}
