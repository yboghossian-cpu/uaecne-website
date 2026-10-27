import { getT } from "@/lib/i18n/server";
import Link from "next/link";
import Medallion from "@/components/shared/Medallion";
import styles from "@/components/shared/ComingSoon.module.css";
import notFoundStyles from "./not-found.module.css";

// Branded 404 — same burgundy/gold treatment as the ComingSoon placeholder,
// so a mistyped or outdated link (e.g. an old uaecne.org URL) lands on the
// site's own design instead of Next's default black-and-white page.
export default async function NotFound() {
  const tx = await getT();
  return (
    <section className={styles.wrap}>
      <Medallion size={220} className={`${styles.med} ${styles.medLeft}`} />
      <Medallion size={220} className={`${styles.med} ${styles.medRight}`} />
      <div className={styles.inner}>
        <Medallion size={48} className={styles.seal} />
        <h1 className={styles.heading}>{tx("Page not found")}</h1>
        <p className={styles.note}>{tx("The page you are looking for may have moved or no longer exists.")}</p>
        <nav className={notFoundStyles.links} aria-label={tx("Helpful links")}>
          <Link href="/">{tx("Home")}</Link>
          <Link href="/churches">{tx("Churches")}</Link>
          <Link href="/schools">{tx("Schools")}</Link>
        </nav>
      </div>
    </section>
  );
}
