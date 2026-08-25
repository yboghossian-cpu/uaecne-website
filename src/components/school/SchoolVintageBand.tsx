import Image from "next/image";
import type { SchoolContent } from "@/data/schoolContent";
import styles from "./SchoolVintageBand.module.css";

type SchoolVintageBandProps = {
  vintageBand: SchoolContent["vintageBand"];
  // Additive, defaults to true (ACG's original behavior unaffected). Bethel
  // Secondary School's own vintage-band photo has no sepia filter in its
  // mockup CSS (`.vintage-band .ph img` — no `filter` property at all,
  // unlike ACG's `filter:sepia(.12)`) — a real per-mockup difference, not
  // an oversight, so this is a toggle rather than a fixed style.
  sepia?: boolean;
};

// "Our History" with an archival photo — a centered eyebrow/heading, a
// drop-cap lead paragraph, then a 2-column band (sepia-toned real photo +
// caption on one side, paragraphs on the other). Distinct from
// `WhiteChurchFeature` (no lead paragraph, no photo caption, no sepia
// treatment) and from `ChurchHistory`'s `.hsplit` (which has no lead
// paragraph before the split, and no sepia/caption). Renders nothing when
// null. First used by Aleppo College for Girls's "From the Central Turkey
// College" history section.
export default function SchoolVintageBand({ vintageBand, sepia = true }: SchoolVintageBandProps) {
  if (!vintageBand) return null;

  return (
    <section className={styles.wrap}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{vintageBand.eyebrow}</div>
        <h2 className={styles.heading}>{vintageBand.heading}</h2>
      </div>
      <div className={styles.hist}>
        <p className={styles.leadP}>
          <span className={styles.dropcap}>{vintageBand.leadParagraph.charAt(0)}</span>
          {vintageBand.leadParagraph.slice(1)}
        </p>
        <div className={styles.band}>
          <div>
            <div className={styles.photoFrame}>
              <Image
                src={vintageBand.photo.src}
                alt={vintageBand.photo.alt}
                width={vintageBand.photo.width}
                height={vintageBand.photo.height}
                className={sepia ? styles.photo : `${styles.photo} ${styles.noSepia}`}
              />
            </div>
            {vintageBand.photoCaption && (
              <div className={styles.cap}>{vintageBand.photoCaption}</div>
            )}
          </div>
          <div>
            {vintageBand.paragraphs.map((paragraph, i) => (
              <p className={styles.paragraph} key={i}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
