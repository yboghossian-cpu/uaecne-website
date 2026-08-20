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
    <section className={styles.project}>
      <Medallion size={200} className={styles.med} />
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>{specialProject.eyebrow}</div>
        <h2 className={styles.heading}>{specialProject.heading}</h2>
        {specialProject.since && (
          <div className={styles.since}>{specialProject.since}</div>
        )}
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
