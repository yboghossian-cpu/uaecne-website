import styles from "./ChurchBreadcrumb.module.css";

type ChurchBreadcrumbProps = {
  country: string;
  // Reused as-is by the schools detail route (section="Schools") — the
  // markup and styling are identical, only this middle crumb word differs.
  section?: string;
  // Additive — a 4th crumb segment for a named area within `country` (e.g.
  // "Kessab" within Syria, per the Kessab churches' own mockups: "Ministries
  // › Churches › Syria › Kessab"). Omitted/null for every church without
  // one, unaffected. First used by Karaduran/Kaladouran.
  subregion?: string | null;
};

// "Ministries › {section} › {country}[ › {subregion}]" — country comes
// straight from the directory's own `country` field, no new content needed.
export default function ChurchBreadcrumb({
  country,
  section = "Churches",
  subregion,
}: ChurchBreadcrumbProps) {
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
      {subregion && (
        <>
          <span className={styles.sep} aria-hidden="true">
            ›
          </span>
          <span>{subregion}</span>
        </>
      )}
    </div>
  );
}
