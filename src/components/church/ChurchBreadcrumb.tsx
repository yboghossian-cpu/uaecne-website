import styles from "./ChurchBreadcrumb.module.css";

type ChurchBreadcrumbProps = {
  country: string;
};

// "Ministries › Churches › {country}" — country comes straight from
// churches.ts's existing Church.country field, no new content needed.
export default function ChurchBreadcrumb({ country }: ChurchBreadcrumbProps) {
  return (
    <div className={styles.crumb}>
      <span>Ministries</span>
      <span className={styles.sep} aria-hidden="true">
        ›
      </span>
      <span>Churches</span>
      <span className={styles.sep} aria-hidden="true">
        ›
      </span>
      <span>{country}</span>
    </div>
  );
}
