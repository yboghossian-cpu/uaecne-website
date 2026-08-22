"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ChurchContent } from "@/data/churchContent";
import styles from "./ChurchGalleryLightbox.module.css";

type ChurchGalleryLightboxProps = {
  gallery: ChurchContent["gallery"];
};

// Horizontal scroll-snap row + arrow buttons (ported from ScrollGallery's
// React pattern) PLUS a click-to-enlarge lightbox modal (prev/next/close,
// keyboard, click-outside-to-close) — ported from the mockups' own
// vanilla-JS lightbox (design-reference/uaecne-church-bethel-aleppo.html,
// -emmanuel-aleppo.html, -syriac-aleppo.html all share this exact
// behavior). No lightbox existed anywhere in the codebase before this —
// the plain `ChurchGallery` (no lightbox) stays unchanged and is still
// used by every church whose reference has no lightbox.
export default function ChurchGalleryLightbox({ gallery }: ChurchGalleryLightboxProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = gallery?.photos ?? [];

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth - 2;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max);
  };

  useEffect(() => {
    updateArrows();
    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [photos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxIndex, photos.length]);

  if (!gallery) return null;

  const scrollByStep = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>(`.${styles.item}`);
    const step = item ? item.getBoundingClientRect().width + 14 : 340;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const current = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <section className={styles.gallery}>
      <div className={styles.centerHead}>
        {gallery.eyebrow && <div className={styles.eyebrow}>{gallery.eyebrow}</div>}
        <h2 className={styles.heading}>{gallery.heading}</h2>
      </div>
      <div className={styles.wrap}>
        <button
          type="button"
          className={atStart ? `${styles.arrow} ${styles.left} ${styles.hidden}` : `${styles.arrow} ${styles.left}`}
          aria-label="Previous"
          onClick={() => scrollByStep(-1)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className={styles.scroll} ref={scrollRef} onScroll={updateArrows}>
          {photos.map((photo, i) => (
            <figure
              className={styles.item}
              key={i}
              onClick={() => setLightboxIndex(i)}
            >
              <Image src={photo.src} alt={photo.alt} fill className={styles.itemPhoto} />
            </figure>
          ))}
        </div>

        <button
          type="button"
          className={atEnd ? `${styles.arrow} ${styles.right} ${styles.hidden}` : `${styles.arrow} ${styles.right}`}
          aria-label="Next"
          onClick={() => scrollByStep(1)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className={styles.hint}>← Scroll for more →</div>

      {current && (
        <div
          className={`${styles.lightbox} ${styles.open}`}
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxIndex(null);
          }}
        >
          <button
            type="button"
            className={styles.lbClose}
            aria-label="Close"
            onClick={() => setLightboxIndex(null)}
          >
            &times;
          </button>
          <button
            type="button"
            className={`${styles.lbNav} ${styles.prev}`}
            aria-label="Previous"
            onClick={() => setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length))}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <Image
            src={current.src}
            alt={current.alt}
            width={1400}
            height={1000}
            className={styles.lbImg}
          />
          <button
            type="button"
            className={`${styles.lbNav} ${styles.next}`}
            aria-label="Next"
            onClick={() => setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length))}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
