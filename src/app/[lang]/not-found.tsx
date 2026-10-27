import Link from "next/link";
import Medallion from "@/components/shared/Medallion";
import styles from "@/components/shared/ComingSoon.module.css";
import notFoundStyles from "./not-found.module.css";

// Branded 404 — same burgundy/gold treatment as the ComingSoon placeholder,
// so a mistyped or outdated link (e.g. an old uaecne.org URL) lands on the
// site's own design instead of Next's default black-and-white page.
export default function NotFound() {
  return (
    <section className={styles.wrap}>
      <Medallion size={220} className={`${styles.med} ${styles.medLeft}`} />
      <Medallion size={220} className={`${styles.med} ${styles.medRight}`} />
      <div className={styles.inner}>
        <Medallion size={48} className={styles.seal} />
        <h1 className={styles.heading}>Page not found</h1>
        <p className={styles.note}>The page you are looking for may have moved or no longer exists.</p>
        <nav className={notFoundStyles.links} aria-label="Helpful links">
          <Link href="/">Home</Link>
          <Link href="/churches">Churches</Link>
          <Link href="/schools">Schools</Link>
        </nav>
      </div>
    </section>
  );
}
