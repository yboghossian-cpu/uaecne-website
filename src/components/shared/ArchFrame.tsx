import type { ReactNode } from "react";
import Image from "next/image";
import styles from "./ArchFrame.module.css";

type ArchFrameProps = {
  aspectRatio: string;
  label?: string;
  children?: ReactNode;
  className?: string;
  photoSrc?: string;
  photoAlt?: string;
};

// Arched "manuscript window" frame — the standard treatment for every photo
// slot per the brief. Geometry/values copied verbatim from
// design-reference/uaecne-homepage-concept.html (.arch). With no photoSrc,
// renders the placeholder texture + glyph + "Photo pending" tag (never a gray
// box). With photoSrc, renders a real photo filling the same arched frame.
export default function ArchFrame({
  aspectRatio,
  label = "Photo pending",
  children,
  className,
  photoSrc,
  photoAlt = "",
}: ArchFrameProps) {
  return (
    <div
      className={className ? `${styles.arch} ${className}` : styles.arch}
      style={{ aspectRatio }}
    >
      {photoSrc ? (
        <Image src={photoSrc} alt={photoAlt} fill className={styles.photo} />
      ) : (
        <>
          <span className={styles.glyph}>{children}</span>
          <span className={styles.phTag}>{label}</span>
        </>
      )}
    </div>
  );
}
