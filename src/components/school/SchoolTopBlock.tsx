import Image from "next/image";
import type { School } from "@/data/schools";
import SchoolFactsBar from "./SchoolFactsBar";
import styles from "./SchoolTopBlock.module.css";

type Photo = { src: string; alt: string };
type Fact = { label: string; labelHy: string | null; sub: string; subHy: string | null };
type Masthead = {
  locationLine: string;
  locationLineHy: string | null;
  established: string;
  establishedHy: string | null;
};

type SchoolTopBlockProps = {
  school: School;
  masthead: Masthead;
  logo: Photo | null;
  heroPhoto: Photo;
  factsBar: Fact[];
};

// Masthead: circular seal, h1 school name, meta line (location · founded
// year, verbatim from SchoolContent.masthead — schools.ts carries no
// address/estYear fields to fall back to), the wide hero photo, and the
// red facts strip. Structurally identical to ChurchTopBlock.
export default function SchoolTopBlock({
  school,
  masthead,
  logo,
  heroPhoto,
  factsBar,
}: SchoolTopBlockProps) {
  return (
    <section className={styles.top}>
      <div className={styles.titleRow}>
        {logo && (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={80}
            height={80}
            className={styles.logo}
          />
        )}
        <div>
          <h1 className={styles.heading}>{school.name}</h1>
          <div className={styles.meta}>
            {masthead.locationLine}
            {" · Founded "}
            <b className={styles.estYear}>{masthead.established}</b>
          </div>
        </div>
      </div>

      <div className={styles.hero}>
        <Image src={heroPhoto.src} alt={heroPhoto.alt} fill className={styles.heroImg} />
      </div>

      <SchoolFactsBar facts={factsBar} />
    </section>
  );
}
