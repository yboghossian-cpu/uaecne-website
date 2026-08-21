"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Photo } from "@/data/outreachContent";
import styles from "./ScrollGallery.module.css";

type ScrollGalleryProps = {
  eyebrow: string;
  heading: string;
  photos: Photo[];
};

// Empty photos -> 6 honest "photo pending" placeholders, matching
// design-reference/uaecne-camps-kchag.html's gallery exactly (never
// fabricated content).
const PLACEHOLDER_COUNT = 6;

// Horizontal scroll-snap strip + arrow buttons that auto-hide at each end
// — ported from the mockup's vanilla-JS behavior into React state. Native
// browser scrolling handles touch/swipe for free.
export default function ScrollGallery({ eyebrow, heading, photos }: ScrollGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth - 2;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;
    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [photos.length]);

  const scrollByStep = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>(`.${styles.item}`);
    const step = item ? item.getBoundingClientRect().width + 20 : 360;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const items = photos.length > 0 ? photos : Array<Photo | null>(PLACEHOLDER_COUNT).fill(null);

  return (
    <section className={`${styles.section} wash-band`}>
      <div className={styles.centerHead}>
        <div className={styles.eyebrow}>{eyebrow}</div>
        <h2 className={styles.heading}>{heading}</h2>
      </div>
      <div className={styles.wrap}>
        <button
          type="button"
          className={atStart ? `${styles.arrow} ${styles.left} ${styles.hidden}` : `${styles.arrow} ${styles.left}`}
          aria-label="Previous photos"
          onClick={() => scrollByStep(-1)}
        >
          <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className={styles.scroll} ref={scrollRef} onScroll={updateArrows}>
          {items.map((photo, i) => (
            <div className={styles.item} key={i}>
              {photo ? (
                <Image src={photo.src} alt={photo.alt} fill className={styles.itemPhoto} />
              ) : (
                <span className={styles.itemGlyph}>
                  <svg className={styles.itemGlyphIcon} viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#ic-photo" />
                  </svg>
                  <span className={styles.itemGlyphCaption}>Photo pending</span>
                </span>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className={atEnd ? `${styles.arrow} ${styles.right} ${styles.hidden}` : `${styles.arrow} ${styles.right}`}
          aria-label="More photos"
          onClick={() => scrollByStep(1)}
        >
          <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className={styles.cue}>Swipe or tap the arrows</div>
    </section>
  );
}
