import ArchFrame from "@/components/shared/ArchFrame";
import styles from "./BoardingHomeHero.module.css";

// Reuses the shared ArchFrame primitive (per the build instructions — no
// building photo exists yet, and the Anjar clock-tower photo elsewhere in
// the codebase is Anjar Eco Park, NOT this institution, so it is never
// substituted here).
export default function BoardingHomeHero() {
  return (
    <div className={styles.wrap}>
      <ArchFrame aspectRatio="16 / 9" className={styles.arch}>
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <use href="#med" />
        </svg>
      </ArchFrame>
    </div>
  );
}
