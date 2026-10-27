"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./engine.module.css";

/* Shared machinery for the story pages (homepage, KCHAG):
   - [data-scrub="sticky"|"pass"] elements get --p (0..1) from scroll
   - [data-tone] sections set data-active-tone on the root
   - [data-reveal] elements get data-revealed once seen
   - a custom cursor that shows the label of the nearest [data-cursor] */

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* ------------------------------------------------------------------ */
/* Scroll + pointer engine: one rAF loop writes CSS variables; React    */
/* never re-renders on scroll.                                          */
/* ------------------------------------------------------------------ */
export function useStoryEngine(root: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.setAttribute("data-motion", reduce ? "reduce" : "full");

    const scrubs = Array.from(el.querySelectorAll<HTMLElement>("[data-scrub]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const s of scrubs) {
        const r = s.getBoundingClientRect();
        const mode = s.dataset.scrub;
        const p =
          mode === "sticky"
            ? clamp(-r.top / Math.max(1, r.height - vh))
            : clamp((vh - r.top) / (r.height + vh));
        s.style.setProperty("--p", reduce ? (mode === "sticky" ? "0" : "1") : p.toFixed(4));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Page tone follows the chapter in the middle of the screen.
    const tones = Array.from(el.querySelectorAll<HTMLElement>("[data-tone]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) el.setAttribute("data-active-tone", (e.target as HTMLElement).dataset.tone ?? "pine");
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    tones.forEach((t) => io.observe(t));

    // One-shot reveals.
    const reveals = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"));
    const ro = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.revealed = "true";
            ro.unobserve(e.target);
          }
      },
      { threshold: 0.25 },
    );
    reveals.forEach((r) => ro.observe(r));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [root]);
}

/** Writes the pointer position (px and -1..1) onto an element as CSS vars. */
export function trackPointer(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  el.style.setProperty("--mx", `${x}px`);
  el.style.setProperty("--my", `${y}px`);
  el.style.setProperty("--nx", ((x / r.width) * 2 - 1).toFixed(3));
  el.style.setProperty("--ny", ((y / r.height) * 2 - 1).toFixed(3));
}

/* ------------------------------------------------------------------ */
/* Custom cursor (fine pointers only)                                   */
/* ------------------------------------------------------------------ */
export function Cursor({ root }: { root: React.RefObject<HTMLDivElement | null> }) {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  useEffect(() => {
    const host = root.current;
    const d = dot.current;
    if (!host || !d) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    host.setAttribute("data-custom-cursor", "on");
    let x = -100,
      y = -100,
      cx = -100,
      cy = -100,
      raf = 0;
    function loop() {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      d!.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    }
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const next = t?.dataset.cursor ?? "";
      d.setAttribute("data-state", t ? "label" : (e.target as HTMLElement).closest("a,button,input") ? "link" : "idle");
      setLabel((prev) => (prev === next ? prev : next));
    };
    const leave = () => d.setAttribute("data-state", "hidden");
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
      host.removeAttribute("data-custom-cursor");
    };
  }, [root]);
  return (
    <div ref={dot} className={styles.cursor} data-state="hidden" aria-hidden="true">
      <span className={styles.cursorLabel}>{label}</span>
    </div>
  );
}

