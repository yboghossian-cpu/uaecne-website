import Medallion from "@/components/shared/Medallion";
import styles from "./PageHero.module.css";

// Burgundy index-page hero (same treatment as /churches and /schools).
export default function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className={styles.hero}>
      <Medallion size={220} className={`${styles.med} ${styles.medLeft}`} />
      <Medallion size={220} className={`${styles.med} ${styles.medRight}`} />
      <div className={styles.heroInner}>
        <h1 className={styles.heroHeading}>{title}</h1>
        {subtitle && <p className={styles.heroSub}>{subtitle}</p>}
      </div>
    </section>
  );
}
