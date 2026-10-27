"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Ga79Gallery.module.css";

const COUNT = 26;
const images = Array.from({ length: COUNT }, (_, i) => `/ga79-gallery-${i + 1}.jpg`);
// intrinsic aspect ratios (w/h) so each frame keeps its photo’s shape at a uniform height
const ratios = [0.667, 1.737, 1.5, 0.667, 1.5, 1.5, 1.5, 1.5, 1.457, 1.5, 1.5, 1.28, 1.5, 1.733, 1.5, 1.5, 1.806, 1.5, 1.5, 1.5, 0.667, 1.5, 1.5, 1.5, 1.227, 1.537];

export default function Ga79Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 700), behavior: "smooth" });
  };

  const show = useCallback((i: number) => setOpen(((i % COUNT) + COUNT) % COUNT), []);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") setOpen((v) => (v === null ? v : (v + 1) % COUNT));
      else if (e.key === "ArrowLeft") setOpen((v) => (v === null ? v : (v - 1 + COUNT) % COUNT));
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div className={styles.stripWrap}>
        <button
          type="button"
          className={`${styles.edge} ${styles.edgeLeft}`}
          onClick={() => scrollBy(-1)}
          disabled={!canLeft}
          aria-label="Scroll gallery left"
        >
          <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        <div className={styles.track} ref={trackRef}>
          {images.map((src, i) => (
            <button
              type="button"
              className={styles.frame}
              key={src}
              onClick={() => show(i)}
              aria-label={`Open photo ${i + 1} of ${COUNT}`}
              style={{ aspectRatio: String(ratios[i]) }}
            >
              <Image src={src} alt="" fill sizes="(max-width: 760px) 60vw, 360px" className={styles.frameImg} />
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.edge} ${styles.edgeRight}`}
          onClick={() => scrollBy(1)}
          disabled={!canRight}
          aria-label="Scroll gallery right"
        >
          <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      {open !== null && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" onClick={close}>
          <button type="button" className={styles.lbClose} onClick={close} aria-label="Close">
            <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
          <button
            type="button"
            className={`${styles.lbNav} ${styles.lbPrev}`}
            onClick={(e) => { e.stopPropagation(); show(open - 1); }}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className={styles.lbStage} onClick={(e) => e.stopPropagation()}>
            <Image src={images[open]} alt="" fill sizes="100vw" className={styles.lbImg} priority />
          </div>
          <button
            type="button"
            className={`${styles.lbNav} ${styles.lbNext}`}
            onClick={(e) => { e.stopPropagation(); show(open + 1); }}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className={styles.lbCount}>{open + 1} / {COUNT}</div>
        </div>
      )}
    </>
  );
}
