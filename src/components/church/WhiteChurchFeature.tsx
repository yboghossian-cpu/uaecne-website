import Image from "next/image";
import type { ChurchContent } from "@/data/churchContent";
import styles from "./WhiteChurchFeature.module.css";

type WhiteChurchFeatureProps = {
  feature: ChurchContent["feature"];
};

// Standalone 2-column "then and now" feature — own eyebrow + full h2 +
// paragraphs, photo on the other column at >=820px, stacked on mobile.
// Distinct from `ChurchHistory`'s `.hsplit` image sections (which share
// History's own top-level eyebrow/heading, not a section of their own).
// Renders a plain static image, not wired into a lightbox. Renders nothing
// when null. First used by Holy Trinity's "The White Church" story.
export default function WhiteChurchFeature({ feature }: WhiteChurchFeatureProps) {
  if (!feature) return null;

  return (
    <section className={styles.wrap}>
      <div className={styles.grid}>
        <div className={styles.photoFrame}>
          <Image
            src={feature.photo.src}
            alt={feature.photo.alt}
            width={2478}
            height={3275}
            className={styles.photo}
          />
        </div>
        <div>
          <div className={styles.eyebrow}>{feature.eyebrow}</div>
          <h2 className={styles.heading}>{feature.heading}</h2>
          {feature.paragraphs.map((paragraph, i) => (
            <p className={styles.paragraph} key={i}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
