import styles from "./ChurchBreadcrumb.module.css";

type ChurchBreadcrumbProps = {
  country: string;
  // Reused as-is by the schools detail route (section="Schools") — the
  // markup and styling are identical, only this middle crumb word differs.
  section?: string;
};

// "Ministries › {section} › {country}" — country comes straight from the
// directory's own `country` field, no new content needed.
export default function ChurchBreadcrumb({ country, section = "Churches" }: ChurchBreadcrumbProps) {
  return (
    <div className={styles.crumb}>
      <span>Ministries</span>
      <span className={styles.sep} aria-hidden="true">
        ›
      </span>
      <span>{section}</span>
      <span className={styles.sep} aria-hidden="true">
        ›
      </span>
      <span>{country}</span>
    </div>
  );
}
