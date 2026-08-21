import Link from "next/link";
import type { OutreachCTA as OutreachCTAType } from "@/data/outreachContent";
import styles from "./OutreachCTA.module.css";

type OutreachCTAProps = {
  cta: OutreachCTAType;
};

// Closing band with an optional real link button — Youth Work cross-links
// internally to /outreach/camps (a real, already-built route); Camps and
// SAC have no button at all.
export default function OutreachCTA({ cta }: OutreachCTAProps) {
  return (
    <section className={styles.cta}>
      <div className={styles.rule} />
      <h2 className={styles.heading}>{cta.heading}</h2>
      <p className={styles.body}>{cta.body}</p>
      {cta.buttonLabel && cta.buttonHref && (
        <Link className={styles.btn} href={cta.buttonHref}>
          {cta.buttonLabel} →
        </Link>
      )}
    </section>
  );
}
