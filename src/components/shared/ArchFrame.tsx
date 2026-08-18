import type { ReactNode } from "react";
import styles from "./ArchFrame.module.css";

type ArchFrameProps = {
  aspectRatio: string;
  label?: string;
  children?: ReactNode;
  className?: string;
};

// Arched "manuscript window" placeholder — the standard treatment for every
// missing photo per the brief (never a gray box). Geometry/values copied
// verbatim from design-reference/uaecne-homepage-concept.html (.arch).
export default function ArchFrame({
  aspectRatio,
  label = "Photo pending",
  children,
  className,
}: ArchFrameProps) {
  return (
    <div
      className={className ? `${styles.arch} ${className}` : styles.arch}
      style={{ aspectRatio }}
    >
      <span className={styles.glyph}>{children}</span>
      <span className={styles.phTag}>{label}</span>
    </div>
  );
}
