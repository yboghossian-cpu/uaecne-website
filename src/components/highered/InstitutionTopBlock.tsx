import Image from "next/image";
import styles from "./InstitutionTopBlock.module.css";

type Photo = { src: string; alt: string };
type Fact = { label: string; labelHy: string | null; sub: string; subHy: string | null };

type InstitutionTopBlockProps = {
  heading: string;
  locationLine: string;
  established: string;
  logo: Photo | null;
  heroPhoto: Photo | null;
  factsBar: Fact[];
};

// Masthead (seal + name + location/founded meta), hero (photo or the
// shared "photo pending" fallback, same language as the schools index
// card / SchoolTopBlock), and the red facts strip. Shared by Haigazian and
// NEST — both real institutions with the same top-of-page shape.
export default function InstitutionTopBlock({
  heading,
  locationLine,
  established,
  logo,
  heroPhoto,
  factsBar,
}: InstitutionTopBlockProps) {
  return (
    <section className={styles.top}>
      <div className={styles.titleRow}>
        {logo && (
          <Image src={logo.src} alt={logo.alt} width={96} height={96} className={styles.logo} />
        )}
        <div>
          <h1 className={styles.heading}>{heading}</h1>
          <div className={styles.meta}>
            {locationLine}
            {" · Founded "}
            <b className={styles.estYear}>{established}</b>
          </div>
        </div>
      </div>

      <div className={heroPhoto ? styles.hero : `${styles.hero} ${styles.heroPending}`}>
        {heroPhoto ? (
          <Image src={heroPhoto.src} alt={heroPhoto.alt} fill className={styles.heroImg} />
        ) : (
          <span className={styles.heroGlyph}>
            <svg className={styles.heroGlyphIcon} aria-hidden="true">
              <use href="#ic-edu" />
            </svg>
            <span className={styles.heroGlyphCaption}>Photo pending</span>
          </span>
        )}
      </div>

      <div className={styles.facts}>
        {factsBar.map((fact, i) => (
          <div className={styles.fact} key={i}>
            <div className={styles.factLabel}>{fact.label}</div>
            <div className={styles.factSub}>{fact.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
