import Image from "next/image";
import type { BoardingHomeContent } from "@/data/outreachContent";
import styles from "./BoardingHomeMasthead.module.css";

type BoardingHomeMastheadProps = {
  content: BoardingHomeContent;
};

// Crumb + seal(logo) + h1 + subline + meta line, matching the mockup's
// .top/.masthead. Routed under Outreach per Yeghia's explicit ruling
// (2026-08-21) — the mockup's own crumb read "Ministries › Schools ›
// Lebanon," but both the route and this crumb text were moved under
// Outreach instead. See OPEN_QUESTIONS.
export default function BoardingHomeMasthead({ content }: BoardingHomeMastheadProps) {
  return (
    <div className={styles.top}>
      <div className={styles.crumb}>Outreach › {content.title}</div>
      <div className={styles.masthead}>
        <div className={styles.seal}>
          <Image src={content.logo.src} alt={content.logo.alt} width={64} height={64} />
        </div>
        <div>
          <h1 className={styles.heading}>{content.title}</h1>
          <p className={styles.subline}>{content.subline}</p>
          <div className={styles.meta}>
            {content.location} · Founded <b>{content.founded}</b>
          </div>
        </div>
      </div>
    </div>
  );
}
