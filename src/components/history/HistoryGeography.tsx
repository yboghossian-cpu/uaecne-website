import { getL } from "@/lib/i18n/server";
import Image from "next/image";
import { historyContent as historyContent__en } from "@/data/historyContent";
import Reveal from "./Reveal";
import styles from "./HistoryGeography.module.css";

// "Across the Near East & Beyond" — real map + country-name pills,
// matching the mockup's .geo section.
export default async function HistoryGeography() {
  const L = await getL();
  const historyContent = L(historyContent__en);
  const { eyebrow, heading, intro, map, countries } = historyContent.geography;

  return (
    <section className={`${styles.section} ${styles.wash}`}>
      <Reveal>
        <div className={styles.centerHead}>
          <div className={styles.eyebrow}>{eyebrow}</div>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.intro}>{intro}</p>
        </div>
        <div className={styles.mapframe}>
          <Image src={map.src} alt={map.alt} width={980} height={503} className={styles.mapImg} />
        </div>
        <div className={styles.geoNames}>
          {countries.map((country) => (
            <span key={country}>{country}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
