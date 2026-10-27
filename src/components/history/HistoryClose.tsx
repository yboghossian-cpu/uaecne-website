import { getL } from "@/lib/i18n/server";
import Image from "next/image";
import { historyContent as historyContent__en } from "@/data/historyContent";
import Reveal from "./Reveal";
import styles from "./HistoryClose.module.css";

// Closing seal band, matching the mockup's .close section.
export default async function HistoryClose() {
  const L = await getL();
  const historyContent = L(historyContent__en);
  const { seal, closing } = historyContent;

  return (
    <section className={styles.close}>
      <Reveal>
        <div className={styles.seal}>
          <Image src={seal.src} alt={seal.alt} width={63} height={63} />
        </div>
        <p className={styles.text}>{closing.text}</p>
        <div className={styles.place}>{closing.place}</div>
      </Reveal>
    </section>
  );
}
