import Image from "next/image";
import type { SchoolContent } from "@/data/schoolContent";
import styles from "./SchoolSignaturePrograms.module.css";

type SchoolSignatureProgramsProps = {
  signaturePrograms: SchoolContent["signaturePrograms"];
};

// "Signature Programs" — name (+ optional gold suffix note) + description
// rows, no pill badge (unlike SchoolAcademics' date-range pills). Real
// program logo shown where one exists (WeNEEDle); generic icon otherwise
// (Seeds of Hope, Student Life & Clubs). Null for AEC and Shamlian.
export default function SchoolSignaturePrograms({
  signaturePrograms,
}: SchoolSignatureProgramsProps) {
  if (!signaturePrograms) return null;

  return (
    <section className={styles.programs}>
      <div className={styles.centerHead}>
        <svg className={styles.icon} aria-hidden="true">
          <use href="#ic-leaf" />
        </svg>
        <h2 className={styles.heading}>{signaturePrograms.heading}</h2>
      </div>
      <div className={styles.list}>
        {signaturePrograms.items.map((item, i) => (
          <div className={styles.row} key={i}>
            <div className={styles.nameRow}>
              {item.logo ? (
                <div className={styles.logoWrap}>
                  <Image
                    src={item.logo.src}
                    alt={item.logo.alt}
                    fill
                    className={styles.logoImg}
                  />
                </div>
              ) : (
                <svg className={styles.iconWrap} aria-hidden="true">
                  <use href={`#${item.icon}`} />
                </svg>
              )}
              <div className={styles.name}>
                <span className={styles.nameBold}>{item.name}</span>{" "}
                {item.note && <span className={styles.nameNote}>{item.note}</span>}
              </div>
            </div>
            <p className={styles.rowBody}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
