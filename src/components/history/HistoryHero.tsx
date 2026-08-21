import Image from "next/image";
import { historyContent } from "@/data/historyContent";
import styles from "./HistoryHero.module.css";

// Burgundy field hero with the real UAECNE seal in a gold-ringed disc,
// matching design-reference/uaecne-history.html's .hero exactly.
export default function HistoryHero() {
  const { crumb, seal, kicker, title, estabLine } = historyContent;

  return (
    <section className={styles.hero}>
      <div className={styles.crumb}>{crumb}</div>
      <div className={styles.seal}>
        <Image src={seal.src} alt={seal.alt} width={95} height={95} />
      </div>
      <div className={styles.kicker}>{kicker}</div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.estab}>
        <span className={styles.ln} />
        <span>{estabLine}</span>
        <span className={styles.ln} />
      </div>
    </section>
  );
}
