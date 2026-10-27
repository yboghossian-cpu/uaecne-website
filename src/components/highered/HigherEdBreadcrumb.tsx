import { getT } from "@/lib/i18n/server";
import styles from "./HigherEdBreadcrumb.module.css";

// "Ministries › Higher Education" — 2 levels, unlike ChurchBreadcrumb's 3
// (no country/grouping level here — all 3 institutions sit directly under
// Higher Education). Matches all three mockups' own crumb exactly.
export default async function HigherEdBreadcrumb() {
  const tx = await getT();
  return (
    <div className={styles.crumb}>
      <span>{tx("Ministries")}</span>
      <span className={styles.sep} aria-hidden="true">
        ›
      </span>
      <span>{tx("Higher Education")}</span>
    </div>
  );
}
