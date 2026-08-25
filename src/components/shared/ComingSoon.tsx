import Medallion from "./Medallion";
import styles from "./ComingSoon.module.css";

type ComingSoonProps = {
  // The page's real, verified name — verbatim from the nav source list,
  // including any qualifier ("— Lebanon, Syria," "— 2 branches," etc.).
  // Never reworded or expanded.
  name: string;
};

// Shared placeholder for the 21 nav-listed pages with no verified content
// yet. Deliberately minimal: the site's seal/masthead treatment, the page
// name, and a gold/burgundy "Coming Soon" banner — nothing else. No
// invented description, history, leadership, or contact details; that
// would be fabrication, and the entire point of this component is that we
// have none of that yet for these pages.
export default function ComingSoon({ name }: ComingSoonProps) {
  return (
    <section className={styles.wrap}>
      <Medallion size={220} className={`${styles.med} ${styles.medLeft}`} />
      <Medallion size={220} className={`${styles.med} ${styles.medRight}`} />
      <div className={styles.inner}>
        <Medallion size={48} className={styles.seal} />
        <h1 className={styles.heading}>{name}</h1>
        <div className={styles.banner}>Coming Soon</div>
        <p className={styles.note}>This page is coming soon.</p>
      </div>
    </section>
  );
}
