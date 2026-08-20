import Image from "next/image";
import type { ChurchContent } from "@/data/churchContent";
import styles from "./ChurchGallery.module.css";

type ChurchGalleryProps = {
  gallery: ChurchContent["gallery"];
};

// Renders `gallery.photos` as a responsive figure grid with captions;
// renders nothing when null (e.g. FAEC). `eyebrow` and each photo's
// `caption` render conditionally — some references (Ashrafieh) have
// neither.
export default function ChurchGallery({ gallery }: ChurchGalleryProps) {
  if (!gallery) return null;

  return (
    <section className={styles.gallery}>
      <div className={styles.wrap}>
        {gallery.eyebrow && <div className={styles.eyebrow}>{gallery.eyebrow}</div>}
        <h2 className={styles.heading}>{gallery.heading}</h2>
        <div className={styles.grid}>
          {gallery.photos.map((photo, i) => (
            <figure className={styles.figure} key={i}>
              <div className={styles.picWrap}>
                <Image src={photo.src} alt={photo.alt} fill className={styles.pic} />
              </div>
              {photo.caption && (
                <figcaption className={styles.caption}>{photo.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
