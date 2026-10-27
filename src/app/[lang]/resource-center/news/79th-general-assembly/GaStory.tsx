"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Cursor, trackPointer, useStoryEngine } from "@/components/story/engine";
import styles from "./GaStory.module.css";

type Pic = { src: string; alt: string; w: number; h: number };
type Person = { name: string; photo: Pic };

export type GaStoryProps = {
  hero: { eyebrow: string; title: string; sub: string; photo: Pic; logo: Pic; anniversary: string };
  lead: { p1: string; p2: string };
  worship: { time: string; heading: string; person: Person; text: string; photos: Pic[] };
  theme: { label: string; quote: string; attr: string };
  plenary: {
    time: string;
    heading: string;
    text: string;
    stats: { value: string; label: string }[];
    person: Person;
    reports: string;
    photos: Pic[];
  };
  remembrance: string;
  communion: { time: string; heading: string; person: Person; text: string; feature: Pic; caption: string; photos: Pic[] };
  closing: string;
  official: { eyebrow: string; heading: string; photo: Pic };
  gallery: { eyebrow: string; heading: string; photos: Pic[] };
  labels: { open: string; close: string; previous: string; next: string; photoOf: string };
};

type Box = { photos: Pic[]; index: number } | null;

function WordLight({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className={styles.word} style={{ "--i": i / words.length } as CSSProperties}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

function Portrait({ person, onOpen, label }: { person: Person; onOpen: () => void; label: string }) {
  return (
    <button type="button" className={styles.portrait} onClick={onOpen} data-cursor={label} onPointerMove={trackPointer}>
      <span className={styles.portraitImg}>
        <Image src={person.photo.src} alt={person.photo.alt} fill sizes="(min-width: 900px) 22vw, 60vw" className={styles.cover} />
      </span>
      <span className={styles.portraitName}>{person.name}</span>
    </button>
  );
}

function Strip({ photos, onOpen, label, k = 0 }: { photos: Pic[]; onOpen: (i: number) => void; label: string; k?: number }) {
  return (
    <div className={styles.strip} data-k={k}>
      {photos.map((p, i) => (
        <button
          key={p.src}
          type="button"
          className={styles.stripItem}
          onClick={() => onOpen(i)}
          data-cursor={label}
          style={{ "--ar": `${p.w} / ${p.h}`, "--j": i } as CSSProperties}
        >
          <Image src={p.src} alt={p.alt} fill sizes="(min-width: 900px) 30vw, 70vw" className={styles.cover} />
        </button>
      ))}
    </div>
  );
}

export default function GaStory(props: GaStoryProps) {
  const { hero, lead, worship, theme, plenary, remembrance, communion, closing, official, gallery, labels } = props;
  const root = useRef<HTMLDivElement>(null);
  useStoryEngine(root);
  const [box, setBox] = useState<Box>(null);
  const open = useCallback((photos: Pic[], index: number) => setBox({ photos, index }), []);

  useEffect(() => {
    if (!box) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBox(null);
      if (e.key === "ArrowRight") setBox((b) => b && { ...b, index: (b.index + 1) % b.photos.length });
      if (e.key === "ArrowLeft") setBox((b) => b && { ...b, index: (b.index - 1 + b.photos.length) % b.photos.length });
    };
    window.addEventListener("keydown", key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = prev;
    };
  }, [box]);

  return (
    <div ref={root} className={styles.root}>
      <Cursor root={root} />

      {/* ================= HERO ================= */}
      <section className={styles.hero} data-scrub="sticky" aria-labelledby="ga-title">
        <div className={styles.heroStage} onPointerMove={trackPointer}>
          <span className={styles.heroGlow} aria-hidden="true" />
          <span className={styles.heroFrame} aria-hidden="true" />
          <span className={styles.dust} aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i} style={{ "--i": i, "--s": i % 3, "--d": i % 4 } as CSSProperties} />
            ))}
          </span>
          <div className={styles.heroPhoto}>
            <div className={styles.heroPhotoIn}>
              <Image src={hero.photo.src} alt={hero.photo.alt} fill priority sizes="100vw" className={styles.cover} />
            </div>
            <div className={styles.heroShade} aria-hidden="true" />
          </div>
          <div className={styles.heroLogo}>
            <Image src={hero.logo.src} alt={hero.logo.alt} fill sizes="140px" className={styles.contain} />
          </div>
          <div className={styles.heroText}>
            <p className={styles.heroEyebrow}>{hero.eyebrow}</p>
            <h1 id="ga-title" className={styles.heroTitle}>
              {hero.title}
            </h1>
            <p className={styles.heroSub}>{hero.sub}</p>
          </div>
          <p className={styles.heroAnniv} aria-hidden="true">
            {hero.anniversary}
          </p>
          <span className={styles.heroScroll} aria-hidden="true" />
        </div>
      </section>

      {/* ================= LEAD ================= */}
      <section className={styles.lead} data-scrub="pass">
        <p className={styles.leadBig}>
          <WordLight text={lead.p1} />
        </p>
        <p className={styles.leadSmall}>{lead.p2}</p>
      </section>

      {/* ================= TIMELINE ================= */}
      <div className={styles.timeline} data-scrub="pass">
        <span className={styles.rail} aria-hidden="true">
          <span className={styles.railFill} />
        </span>

        {/* --- Evening, 21 June --- */}
        <section className={styles.chapter}>
          <p className={styles.time}>{worship.time}</p>
          <h2 className={styles.h2}>{worship.heading}</h2>
          <div className={styles.split}>
            <Portrait person={worship.person} label={labels.open} onOpen={() => open([worship.person.photo], 0)} />
            <p className={styles.quoteText}>{worship.text}</p>
          </div>
          <Strip photos={worship.photos} label={labels.open} onOpen={(i) => open(worship.photos, i)} />
        </section>

        {/* --- Theme --- */}
        <section className={styles.theme} data-scrub="pass">
          <p className={styles.themeLabel}>{theme.label}</p>
          <p className={styles.themeQuote}>
            <span className={styles.qm}>“</span>
            <WordLight text={theme.quote} />
            <span className={styles.qm}>”</span>
          </p>
          <p className={styles.themeAttr}>{theme.attr}</p>
        </section>

        {/* --- Morning, 22 June --- */}
        <section className={styles.chapter}>
          <p className={styles.time}>{plenary.time}</p>
          <h2 className={styles.h2}>{plenary.heading}</h2>
          <p className={styles.body}>{plenary.text}</p>
          <div className={styles.stats}>
            {plenary.stats.map((s) => (
              <div key={s.label} className={styles.stat} onPointerMove={trackPointer}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
          <Strip photos={plenary.photos} label={labels.open} onOpen={(i) => open(plenary.photos, i)} k={1} />
          <div className={styles.split}>
            <Portrait person={plenary.person} label={labels.open} onOpen={() => open([plenary.person.photo], 0)} />
            <p className={styles.body}>{plenary.reports}</p>
          </div>
          <p className={styles.solo}>{remembrance}</p>
        </section>

        {/* --- Evening, 22 June --- */}
        <section className={styles.chapter}>
          <p className={styles.time}>{communion.time}</p>
          <h2 className={styles.h2}>{communion.heading}</h2>
          <div className={styles.split}>
            <Portrait person={communion.person} label={labels.open} onOpen={() => open([communion.person.photo], 0)} />
            <p className={styles.quoteText}>{communion.text}</p>
          </div>
          <figure className={styles.feature}>
            <button
              type="button"
              className={styles.featureImg}
              onClick={() => open([communion.feature, ...communion.photos], 0)}
              data-cursor={labels.open}
              onPointerMove={trackPointer}
            >
              <Image src={communion.feature.src} alt={communion.feature.alt} fill sizes="(min-width: 1100px) 1100px, 100vw" className={styles.cover} />
            </button>
            <figcaption>{communion.caption}</figcaption>
          </figure>
          {communion.photos.length > 0 && (
            <Strip photos={communion.photos} label={labels.open} onOpen={(i) => open(communion.photos, i)} k={2} />
          )}
        </section>
      </div>

      {/* ================= CLOSING ================= */}
      <section className={styles.closing} data-scrub="pass">
        <p className={styles.closingText}>
          <WordLight text={closing} />
        </p>
      </section>

      {/* ================= OFFICIAL PICTURE ================= */}
      <section className={styles.official}>
        <p className={styles.eyebrow}>{official.eyebrow}</p>
        <h2 className={styles.h2}>{official.heading}</h2>
        <button
          type="button"
          className={styles.officialImg}
          onClick={() => open([official.photo], 0)}
          data-cursor={labels.open}
          onPointerMove={trackPointer}
          style={{ "--ar": `${official.photo.w} / ${official.photo.h}` } as CSSProperties}
        >
          <Image src={official.photo.src} alt={official.photo.alt} fill sizes="(min-width: 1200px) 1200px, 100vw" className={styles.cover} />
        </button>
      </section>

      {/* ================= GALLERY ================= */}
      <section className={styles.gallery}>
        <p className={styles.eyebrow}>{gallery.eyebrow}</p>
        <h2 className={styles.h2}>{gallery.heading}</h2>
        <div className={styles.masonry}>
          {gallery.photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              className={styles.tile}
              onClick={() => open(gallery.photos, i)}
              data-cursor={labels.open}
              style={{ "--ar": `${p.w} / ${p.h}` } as CSSProperties}
            >
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1100px) 25vw, (min-width: 700px) 33vw, 50vw" className={styles.cover} />
            </button>
          ))}
        </div>
      </section>

      {/* ================= LIGHTBOX ================= */}
      {box && (
        <div className={styles.box} role="dialog" aria-modal="true" aria-label={box.photos[box.index].alt} onClick={() => setBox(null)}>
          <div className={styles.boxImg} onClick={(e) => e.stopPropagation()}>
            <Image src={box.photos[box.index].src} alt={box.photos[box.index].alt} fill sizes="100vw" className={styles.contain} />
          </div>
          <p className={styles.boxCaption} onClick={(e) => e.stopPropagation()}>
            {box.photos[box.index].alt}
            <span>{labels.photoOf.replace("{n}", String(box.index + 1)).replace("{total}", String(box.photos.length))}</span>
          </p>
          <button type="button" className={styles.boxClose} onClick={() => setBox(null)} aria-label={labels.close} autoFocus>
            ×
          </button>
          {box.photos.length > 1 && (
            <>
              <button
                type="button"
                className={styles.boxPrev}
                aria-label={labels.previous}
                onClick={(e) => {
                  e.stopPropagation();
                  setBox((b) => b && { ...b, index: (b.index - 1 + b.photos.length) % b.photos.length });
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className={styles.boxNext}
                aria-label={labels.next}
                onClick={(e) => {
                  e.stopPropagation();
                  setBox((b) => b && { ...b, index: (b.index + 1) % b.photos.length });
                }}
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
