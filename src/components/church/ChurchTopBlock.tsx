import Image from "next/image";
import type { Church } from "@/data/churches";
import ChurchFactsBar from "./ChurchFactsBar";
import styles from "./ChurchTopBlock.module.css";

type Photo = { src: string; alt: string };
type Fact = { label: string; labelHy: string | null; sub: string; subHy: string | null };
type Masthead = {
  locationLine: string;
  locationLineHy: string | null;
  established: string;
  establishedHy: string | null;
};

type ChurchTopBlockProps = {
  church: Church;
  masthead: Masthead;
  logo: Photo | null;
  heroPhoto: Photo;
  factsBar: Fact[];
};

// Masthead: optional circular logo, h1 church name, meta line (location ·
// established year — from ChurchContent's own `masthead` field, carrying the
// reference file's verified wording verbatim; NOT derived from churches.ts,
// since that directory data can disagree with the verified reference on
// facts like neighborhood name or founding year — see the note on
// ChurchContent.masthead in churchContent.ts), the wide hero photo, and the
// red facts strip.
export default function ChurchTopBlock({
  church,
  masthead,
  logo,
  heroPhoto,
  factsBar,
}: ChurchTopBlockProps) {
  return (
    <section className={styles.top}>
      <div className={styles.titleRow}>
        {logo && (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={96}
            height={96}
            className={styles.logo}
          />
        )}
        <div>
          <h1 className={styles.heading}>{church.name}</h1>
          <div className={styles.meta}>
            {masthead.locationLine}
            {" · Established "}
            <b className={styles.estYear}>{masthead.established}</b>
          </div>
        </div>
      </div>

      <div className={styles.hero}>
        <Image src={heroPhoto.src} alt={heroPhoto.alt} fill className={styles.heroImg} />
      </div>

      <ChurchFactsBar facts={factsBar} />
    </section>
  );
}
