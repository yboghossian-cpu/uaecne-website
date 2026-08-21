import Image from "next/image";
import styles from "./OutreachTopBlock.module.css";

type Photo = { src: string; alt: string };

type OutreachTopBlockProps = {
  crumbLabel: string;
  title: string;
  subtitlePlain: string;
  subtitleBold: string;
  heroPhoto: Photo | null;
  // "wide" = 2:1 (Camps, Youth Work); "tall" = 21:9 (Social Action
  // Committee, per its mockup's taller hero). Both collapse to 3:2 below
  // 640px, matching every mockup's own mobile override — a CSS class per
  // variant (not an inline style) so the media query can actually win.
  heroVariant: "wide" | "tall";
  heroIcon: string; // IconSymbols id for the photo-pending state, e.g. "ic-people"
};

// Crumb + title + subtitle, then the hero (real photo or the shared
// "photo pending" fallback) at a configurable aspect ratio. Shared by all
// 3 Outreach pages.
export default function OutreachTopBlock({
  crumbLabel,
  title,
  subtitlePlain,
  subtitleBold,
  heroPhoto,
  heroVariant,
  heroIcon,
}: OutreachTopBlockProps) {
  const variantClass = heroVariant === "tall" ? styles.heroTall : styles.heroWide;
  return (
    <section className={styles.top}>
      <div className={styles.inner}>
        <div className={styles.crumb}>Outreach › {crumbLabel}</div>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.subtitle}>
          {subtitlePlain}
          <b className={styles.subtitleBold}>{subtitleBold}</b>
        </div>
      </div>

      <div
        className={
          heroPhoto
            ? `${styles.hero} ${variantClass}`
            : `${styles.hero} ${variantClass} ${styles.heroPending}`
        }
      >
        {heroPhoto ? (
          <Image src={heroPhoto.src} alt={heroPhoto.alt} fill className={styles.heroImg} />
        ) : (
          <span className={styles.heroGlyph}>
            <svg className={styles.heroGlyphIcon} viewBox="0 0 24 24" aria-hidden="true">
              <use href={`#${heroIcon}`} />
            </svg>
            <span className={styles.heroGlyphCaption}>Photo pending</span>
          </span>
        )}
      </div>
    </section>
  );
}
