import styles from "./HigherEdBreadcrumb.module.css";

// "Ministries › Higher Education" — 2 levels, unlike ChurchBreadcrumb's 3
// (no country/grouping level here — all 3 institutions sit directly under
// Higher Education). Matches all three mockups' own crumb exactly.
export default function HigherEdBreadcrumb() {
  return (
    <div className={styles.crumb}>
      <span>Ministries</span>
      <span className={styles.sep} aria-hidden="true">
        ›
      </span>
      <span>Higher Education</span>
    </div>
  );
}
