import Image from "next/image";
import styles from "./ChurchGallery.module.css";

type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
  captionHy: string | null;
};

type ChurchGalleryProps = {
  gallery: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    photos: GalleryPhoto[];
  } | null;
};

// Renders `gallery.photos` as a responsive figure grid with captions;
// renders nothing when null (e.g. FAEC).
export default function ChurchGallery({ gallery }: ChurchGalleryProps) {
  if (!gallery) return null;

  return (
    <section className={styles.gallery}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>{gallery.eyebrow}</div>
        <h2 className={styles.heading}>{gallery.heading}</h2>
        <div className={styles.grid}>
          {gallery.photos.map((photo, i) => (
            <figure className={styles.figure} key={i}>
              <div className={styles.picWrap}>
                <Image src={photo.src} alt={photo.alt} fill className={styles.pic} />
              </div>
              <figcaption className={styles.caption}>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
