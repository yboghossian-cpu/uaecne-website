import Image from "next/image";
import type { ChurchContent } from "@/data/churchContent";
import styles from "./WhiteChurchFeature.module.css";

type WhiteChurchFeatureProps = {
  feature: ChurchContent["feature"];
  // Both additive/optional, defaulting to Holy Trinity's own original
  // values/behavior unaffected. `photoWidth`/`photoHeight` are the real
  // source photo's own pixel dimensions (never invented/approximated) —
  // needed because this component is now reused across photos of very
  // different aspect ratios (first cross-imported into Schools for Aleppo
  // College for Girls's 5 magazine-style "split" rows, mostly landscape
  // DSLR photos, unlike Holy Trinity's one portrait composite); the
  // default (2478×3275) is Holy Trinity's own photo, preserving its exact
  // prior rendering when the two props are omitted. `reverse` swaps the
  // grid to photo-right/text-left at ≥820px (ACG's mockup alternates
  // rows); `dropcapFirst` applies a first-letter drop cap to the first
  // paragraph (ACG's own About/Intro row only, per its mockup's
  // `.dropcap` class — none of its other 4 split rows have one, and
  // neither does Holy Trinity's).
  photoWidth?: number;
  photoHeight?: number;
  reverse?: boolean;
  dropcapFirst?: boolean;
};

// Standalone 2-column "then and now" feature — own eyebrow + full h2 +
// paragraphs, photo on the other column at >=820px, stacked on mobile.
// Distinct from `ChurchHistory`'s `.hsplit` image sections (which share
// History's own top-level eyebrow/heading, not a section of their own).
// Renders a plain static image, not wired into a lightbox. Renders nothing
// when null. First used by Holy Trinity's "The White Church" story; now
// also cross-imported into Schools (same reuse pattern already
// established for ChurchCTA/SuccessionList/ChurchBreadcrumb) for Aleppo
// College for Girls's magazine-style woven photo/text rows.
export default function WhiteChurchFeature({
  feature,
  photoWidth = 2478,
  photoHeight = 3275,
  reverse = false,
  dropcapFirst = false,
}: WhiteChurchFeatureProps) {
  if (!feature) return null;

  return (
    <section className={styles.wrap}>
      <div className={reverse ? `${styles.grid} ${styles.reverse}` : styles.grid}>
        <div className={styles.photoFrame}>
          <Image
            src={feature.photo.src}
            alt={feature.photo.alt}
            width={photoWidth}
            height={photoHeight}
            className={styles.photo}
          />
        </div>
        <div>
          <div className={styles.eyebrow}>{feature.eyebrow}</div>
          <h2 className={styles.heading}>{feature.heading}</h2>
          {feature.paragraphs.map((paragraph, i) =>
            dropcapFirst && i === 0 ? (
              <p className={styles.paragraph} key={i}>
                <span className={styles.dropcap}>{paragraph.charAt(0)}</span>
                {paragraph.slice(1)}
              </p>
            ) : (
              <p className={styles.paragraph} key={i}>
                {paragraph}
              </p>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
