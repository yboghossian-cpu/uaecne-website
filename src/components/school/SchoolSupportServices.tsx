import Image from "next/image";
import type { SchoolContent } from "@/data/schoolContent";
import styles from "./SchoolSupportServices.module.css";

type SchoolSupportServicesProps = {
  supportServices: SchoolContent["supportServices"];
};

// "Inclusive Support Services" — 3 icon-badge cards, no church/AEC
// equivalent. Each item uses its real program logo when one exists
// (Healing Harbour); otherwise a generic IconSymbols icon (Boarding
// Shelter, PEP) — never a fabricated logo. Null for AEC and Shamlian.
export default function SchoolSupportServices({
  supportServices,
}: SchoolSupportServicesProps) {
  if (!supportServices) return null;

  return (
    <section className={`${styles.support} wash-band`}>
      <div className={styles.centerHead}>
        <h2 className={styles.heading}>{supportServices.heading}</h2>
        <div className={styles.flourish}>
          <span className={styles.ln} />
          <svg className={styles.med} aria-hidden="true">
            <use href="#med" />
          </svg>
          <span className={styles.ln} />
        </div>
      </div>
      <div className={styles.grid}>
        {supportServices.items.map((item, i) => (
          <div className={styles.item} key={i}>
            <div className={styles.badge}>
              {item.logo ? (
                <Image
                  src={item.logo.src}
                  alt={item.logo.alt}
                  fill
                  className={styles.badgeLogo}
                />
              ) : (
                <svg className={styles.badgeIcon} aria-hidden="true">
                  <use href={`#${item.icon}`} />
                </svg>
              )}
            </div>
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <p className={styles.itemBody}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
