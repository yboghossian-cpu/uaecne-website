import Image from "next/image";
import Medallion from "@/components/shared/Medallion";
import type { ChurchContent } from "@/data/churchContent";
import styles from "./SpecialProjectBand.module.css";

type SpecialProjectBandProps = {
  specialProject: ChurchContent["specialProject"];
};

// Renders the reference files' special-initiative band (e.g. Anjar's
// "Hamegh" project) — red-gradient section, decorative Medallion watermark,
// an italic "since" line, and a grid of objective cards. Renders nothing
// when null (every church except Anjar, currently).
export default function SpecialProjectBand({
  specialProject,
}: SpecialProjectBandProps) {
  if (!specialProject) return null;

  return (
    <section className={styles.project} data-tone="dark">
      <Medallion size={200} className={styles.med} />
      <div className={styles.wrap}>
        <div className={styles.head}>
          {specialProject.logo && (
            <div className={styles.logo}>
              <Image
                src={specialProject.logo.src}
                alt={specialProject.logo.alt}
                width={520}
                height={520}
                sizes="(min-width: 720px) 132px, 96px"
              />
            </div>
          )}
          <div>
            <div className={styles.eyebrow}>{specialProject.eyebrow}</div>
            <h2 className={styles.heading}>{specialProject.heading}</h2>
            {specialProject.since && (
              <div className={styles.since}>{specialProject.since}</div>
            )}
          </div>
        </div>
        <div className={styles.obj}>
          {specialProject.objectives.map((objective, i) => (
            <div className={styles.o} key={i}>
              <b>{objective.title}</b>
              <span>{objective.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
