"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { KchagPhoto, KchagStory as Story } from "@/data/outreachContent";
import { Cursor, trackPointer, useStoryEngine } from "@/components/story/engine";
import styles from "./KchagStory.module.css";

type Era = { title: string; range: string; description: string };
type Social = { href: string; label: string }[];

export type KchagLabels = {
  crumbSection: string;
  crumbPage: string;
  open: string;
  close: string;
  previous: string;
  next: string;
  photoOf: string; // "{n} / {total}"
};

type Props = {
  story: Story;
  campsites: string[];
  kessab: { eyebrow: string; heading: string; intro: string; eras: Era[] } | null;
  life: { eyebrow: string; photos: { src: string; alt: string }[] };
  cta: { heading: string; body: string };
  social: Social;
  labels: KchagLabels;
};

type Lightbox = { photos: { src: string; alt: string }[]; index: number } | null;

/* ------------------------------------------------------------------ */
/* Pieces                                                               */
/* ------------------------------------------------------------------ */
function Photo({
  photo,
  sizes,
  className,
  priority,
  style,
}: {
  photo: { src: string; alt: string };
  sizes: string;
  className?: string;
  priority?: boolean;
  style?: CSSProperties;
}) {
  return <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className={className} priority={priority} style={style} />;
}

function OpenButton({
  onOpen,
  label,
  className,
  children,
  style,
}: {
  onOpen: () => void;
  label: string;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <button type="button" className={className} onClick={onOpen} data-cursor={label} style={style}>
      {children}
    </button>
  );
}

function WordLight({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className={styles.word} style={{ "--i": i / words.length } as CSSProperties}>
          {w}{" "}
        </span>
      ))}
    </>
  );
}

function Magnetic({ href, children }: { href: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.magnet}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--dx", `${(e.clientX - (r.left + r.width / 2)) * 0.35}px`);
        el.style.setProperty("--dy", `${(e.clientY - (r.top + r.height / 2)) * 0.45}px`);
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--dx", "0px");
        ref.current?.style.setProperty("--dy", "0px");
      }}
    >
      <span>{children}</span>
    </a>
  );
}

// Where each 1949 print lies on the "table" (desktop): left/top in %, rotation, parallax depth.
const PRINTS = [
  { l: 30, t: 6, w: 44, r: -2, d: 10 },
  { l: 2, t: 4, w: 26, r: -7, d: 22 },
  { l: 76, t: 0, w: 22, r: 6, d: 26 },
  { l: 4, t: 52, w: 17, r: 4, d: 30 },
  { l: 73, t: 48, w: 25, r: -5, d: 18 },
  { l: 22, t: 62, w: 15, r: -9, d: 34 },
  { l: 58, t: 66, w: 15, r: 8, d: 28 },
];

// Scatter of the rebuilding tiles before they settle into the grid.
const SCATTER = [
  [-60, -40, -14], [40, -70, 10], [70, -20, 18], [-30, 50, -8], [55, 60, 12], [-75, 20, 16], [20, -55, -10],
  [-45, -65, 9], [65, 35, -15], [-20, 70, 7], [35, 45, -12], [-65, -10, 11], [10, 65, -6], [50, -45, 14],
];

/* ------------------------------------------------------------------ */
export default function KchagStory({ story, campsites, kessab, life, cta, social, labels }: Props) {
  const root = useRef<HTMLDivElement>(null);
  useStoryEngine(root);
  const [box, setBox] = useState<Lightbox>(null);
  const open = useCallback((photos: { src: string; alt: string }[], index: number) => setBox({ photos, index }), []);

  // Lightbox keys + scroll lock
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

  // Rebuild reveal (tap toggles it on touch screens)
  const [rebuilt, setRebuilt] = useState(false);

  const s = story;
  const f = s.founding;
  const warLight = (e: React.PointerEvent<HTMLElement>) => {
    trackPointer(e);
    e.currentTarget.dataset.lit = "true";
  };

  return (
    <div ref={root} className={styles.root} data-active-tone="pine">
      <Cursor root={root} />

      {/* ============ HERO — the camp seen through its own name ============ */}
      <section className={styles.hero} data-scrub="sticky" data-tone="pine" aria-labelledby="kchag-title">
        <div className={styles.heroStage} onPointerMove={trackPointer}>
          <div className={styles.heroBase}>
            <Photo photo={s.heroPhoto} sizes="100vw" priority className={styles.cover} />
          </div>
          <div className={styles.heroLens} aria-hidden="true">
            <Photo photo={{ src: s.heroPhoto.src, alt: "" }} sizes="100vw" priority className={styles.cover} />
          </div>
          <div className={styles.heroMark} aria-hidden="true">
            <Photo photo={{ src: s.heroPhoto.src, alt: "" }} sizes="100vw" priority className={styles.cover} />
          </div>
          <div className={styles.heroFull} aria-hidden="true">
            <Photo photo={{ src: s.heroPhoto.src, alt: "" }} sizes="100vw" className={styles.cover} />
          </div>

          <nav className={styles.crumb} aria-label="Breadcrumb">
            <Link href="/outreach">{labels.crumbSection}</Link>
            <span aria-hidden="true">/</span>
            <span>{labels.crumbPage}</span>
          </nav>

          <div className={styles.heroText}>
            <h1 id="kchag-title" className={styles.heroTitle}>
              <span className={styles.srOnly}>{s.wordmark} — </span>
              {s.heroLine}
            </h1>
            <p className={styles.heroPlaces}>{s.heroPlaces}</p>
          </div>
          <p className={styles.scrollHint} aria-hidden="true">
            <span>{s.scrollHint}</span>
            <i />
          </p>
        </div>
      </section>

      {/* ============ INTRO — words light up as you read ============ */}
      <section className={styles.intro} data-scrub="pass" data-tone="pine">
        <p className={styles.introLead}>
          <WordLight text={campsites[0] ?? ""} />
        </p>
        {campsites.length > 1 && (
          <div className={styles.introSmall}>
            {campsites.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        )}
      </section>

      {/* ============ 1949 — a table of prints ============ */}
      <section className={styles.founding} data-tone="paper" onPointerMove={trackPointer} data-scrub="pass">
        <div className={styles.bigYear} aria-hidden="true">
          {f.year}
        </div>
        <header className={styles.chapterHead}>
          <span className={styles.year}>{f.year}</span>
          <h2 className={styles.chapterTitle}>{f.title}</h2>
          <p className={styles.chapterBody}>{f.body}</p>
        </header>
        <div className={styles.table}>
          {f.photos.map((p, i) => {
            const pos = PRINTS[i % PRINTS.length];
            return (
              <OpenButton
                key={p.src}
                label={labels.open}
                onOpen={() => open(f.photos, i)}
                className={styles.print}
                style={
                  {
                    "--l": `${pos.l}%`,
                    "--t": `${pos.t}%`,
                    "--w": `${pos.w}%`,
                    "--r": `${pos.r}deg`,
                    "--d": pos.d,
                    "--ar": `${p.w} / ${p.h}`,
                  } as CSSProperties
                }
              >
                <span className={styles.printImg}>
                  <Photo photo={p} sizes="(min-width: 900px) 40vw, 90vw" className={styles.cover} />
                </span>
                {i === 0 && <span className={styles.printCaption}>{f.caption}</span>}
              </OpenButton>
            );
          })}
        </div>
      </section>

      {/* ============ THE BELL — hover to ring it ============ */}
      <section className={styles.bell} data-tone="paper2" data-reveal>
        <div className={styles.bellWords}>
          <h2 className={styles.bellTitle}>{s.bell.title}</h2>
          <div className={styles.bellSmall}>
            {s.bell.photos.slice(1).map((p, i) => (
              <OpenButton
                key={p.src}
                label={labels.open}
                onOpen={() => open(s.bell.photos, i + 1)}
                className={styles.bellThumb}
                style={{ "--ar": `${p.w} / ${p.h}` } as CSSProperties}
              >
                <Photo photo={p} sizes="(min-width: 900px) 16vw, 40vw" className={styles.cover} />
              </OpenButton>
            ))}
          </div>
        </div>
        <div className={styles.bellStage}>
          <span className={styles.ring} aria-hidden="true" />
          <span className={styles.ring} aria-hidden="true" />
          <span className={styles.ring} aria-hidden="true" />
          <OpenButton label={labels.open} onOpen={() => open(s.bell.photos, 0)} className={styles.bellSwing}>
            <Photo photo={s.bell.photos[0]} sizes="(min-width: 900px) 40vw, 80vw" className={styles.cover} />
          </OpenButton>
        </div>
      </section>

      {/* ============ 1960 — the dining hall, sideways ============ */}
      <section className={styles.growth} data-scrub="sticky" data-tone="kodak">
        <div className={styles.growthStage}>
          <div className={styles.growthTrack}>
            <div className={styles.growthIntro}>
              <span className={styles.year}>{s.growth.year}</span>
              <h2 className={styles.chapterTitle}>{s.growth.title}</h2>
              <p className={styles.stat}>
                <strong>{s.growth.stat}</strong> {s.growth.statLabel}
              </p>
              <p className={styles.chapterBody}>{s.growth.body}</p>
            </div>
            {s.growth.photos.map((p, i) => (
              <OpenButton
                key={p.src}
                label={labels.open}
                onOpen={() => open(s.growth.photos, i)}
                className={styles.slide}
                style={{ "--ar": `${p.w} / ${p.h}`, "--k": i, "--off": i % 2 } as CSSProperties}
              >
                <span className={styles.slideImg}>
                  <Photo photo={p} sizes="(min-width: 900px) 55vw, 85vw" className={styles.cover} />
                </span>
              </OpenButton>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 1975 — darkness; carry the light ============ */}
      <section className={styles.war} data-tone="ash" data-scrub="pass">
        <header className={styles.warHead}>
          <div className={styles.crack} aria-hidden="true">
            <span>{s.war.year}</span>
            <span>{s.war.year}</span>
          </div>
          <h2 className={styles.warTitle}>{s.war.title}</h2>
          <p className={styles.chapterBody}>{s.war.body}</p>
          <p className={styles.hint}>{s.war.hint}</p>
        </header>
        <div className={styles.warGrid} onPointerMove={warLight} onPointerDown={warLight}>
          {s.war.photos.map((p, i) => (
            <OpenButton
              key={p.src}
              label={labels.open}
              onOpen={() => open(s.war.photos, i)}
              className={styles.warCell}
            >
              <Photo photo={p} sizes="(min-width: 900px) 33vw, 50vw" className={styles.cover} />
            </OpenButton>
          ))}
          <div className={styles.torch} aria-hidden="true" />
        </div>
      </section>

      {/* ============ 2002 — rebuilding ============ */}
      <section className={styles.rebuild} data-tone="plaster">
        <header className={styles.rebuildHead}>
          <span className={styles.year}>{s.rebuild.year}</span>
          <h2 className={styles.chapterTitle}>{s.rebuild.title}</h2>
          <p className={styles.chapterBody}>{s.rebuild.body}</p>
        </header>

        <div
          className={styles.compare}
          data-cursor={s.rebuild.afterLabel}
          data-open={rebuilt ? "true" : undefined}
          onPointerMove={trackPointer}
          onPointerEnter={trackPointer}
          onClick={() => setRebuilt((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setRebuilt((v) => !v);
            }
          }}
          role="button"
          tabIndex={0}
          aria-pressed={rebuilt}
          aria-label={s.rebuild.sliderLabel}
        >
          <div className={styles.compareBefore}>
            <Photo photo={s.rebuild.before} sizes="(min-width: 1100px) 1100px, 100vw" className={styles.cover} />
          </div>
          <div className={styles.compareAfter}>
            <Photo photo={s.rebuild.after} sizes="(min-width: 1100px) 1100px, 100vw" className={styles.cover} />
          </div>
          <span className={styles.compareTag} data-side="before">
            {s.rebuild.beforeLabel}
          </span>
          <span className={styles.compareTag} data-side="after">
            {s.rebuild.afterLabel}
          </span>
        </div>
        <p className={styles.compareHint}>{s.rebuild.sliderLabel}</p>

        <div className={styles.mosaic} data-scrub="pass">
          {s.rebuild.photos.map((p, i) => {
            const [x, y, r] = SCATTER[i % SCATTER.length];
            return (
              <OpenButton
                key={p.src}
                label={labels.open}
                onOpen={() => open(s.rebuild.photos, i)}
                className={styles.tile}
                style={{ "--sx": `${x}vw`, "--sy": `${y}vh`, "--sr": `${r}deg`, "--d": (i / s.rebuild.photos.length) * 0.16 } as CSSProperties}
              >
                <Photo photo={p} sizes="(min-width: 900px) 25vw, 50vw" className={styles.cover} />
              </OpenButton>
            );
          })}
        </div>
      </section>

      {/* ============ TODAY ============ */}
      <section className={styles.today} data-tone="dusk">
        <div className={styles.dusk}>
          <Photo photo={s.today.hero} sizes="100vw" className={styles.cover} />
          <div className={styles.duskText}>
            <h2 className={styles.duskTitle}>{s.today.title}</h2>
            <p>{s.today.body}</p>
          </div>
        </div>

        <div className={styles.archWrap} data-scrub="pass">
          <div className={styles.arch}>
            <Photo photo={s.today.arch} sizes="100vw" className={styles.cover} />
          </div>
        </div>

        <div className={styles.todayRow}>
          {[s.today.aerial, ...s.today.photos].map((p, i, all) => (
            <OpenButton
              key={p.src}
              label={labels.open}
              onOpen={() => open(all, i)}
              className={styles.todayCard}
              style={{ "--ar": `${p.w} / ${p.h}` } as CSSProperties}
            >
              <Photo photo={p} sizes="(min-width: 900px) 25vw, 50vw" className={styles.cover} />
            </OpenButton>
          ))}
        </div>
      </section>

      {/* ============ KESSAB 2026 ============ */}
      {kessab && (
        <section className={styles.kessab} data-tone="pine">
          <header className={styles.kessabHead}>
            <p className={styles.kessabEyebrow}>{kessab.eyebrow}</p>
            <h2 className={styles.chapterTitle}>{kessab.heading}</h2>
            <p className={styles.chapterBody}>{kessab.intro}</p>
          </header>
          <ol className={styles.eras}>
            {kessab.eras.map((e, i) => (
              <li key={e.title} className={styles.era} style={{ "--hue": i } as CSSProperties} onPointerEnter={trackPointer} onPointerMove={trackPointer} tabIndex={0}>
                <span className={styles.eraRange}>{e.range}</span>
                <h3 className={styles.eraTitle}>{e.title}</h3>
                <p className={styles.eraText}>{e.description}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ============ LIFE AT KCHAG — two drifting rows ============ */}
      {life.photos.length > 0 && (
        <section className={styles.life} data-tone="pine" aria-label={life.eyebrow}>
          <h2 className={styles.lifeTitle}>{life.eyebrow}</h2>
          {[0, 1].map((row) => {
            const list = row === 0 ? life.photos : [...life.photos].reverse();
            return (
              <div key={row} className={styles.lifeRow} data-dir={row ? "rev" : "fwd"}>
                <div className={styles.lifeTrack}>
                  {[...list, ...list].map((p, i) => (
                    <OpenButton
                      key={`${row}-${i}`}
                      label={labels.open}
                      onOpen={() => open(list, i % list.length)}
                      className={styles.lifeCard}
                    >
                      <Photo photo={p} sizes="(min-width: 900px) 22vw, 60vw" className={styles.cover} />
                    </OpenButton>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* ============ CLOSE ============ */}
      <section className={styles.close} data-tone="maroon" data-scrub="pass">
        <h2 className={styles.closeTitle}>{cta.heading}</h2>
        <p className={styles.closeBody}>{cta.body}</p>
        {social.length > 0 && (
          <div className={styles.magnets}>
            {social.map((l) => (
              <Magnetic key={l.href} href={l.href}>
                {l.label}
              </Magnetic>
            ))}
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/kchag/kchag-logo.png" alt="" className={styles.closeLogo} />
      </section>

      {/* ============ LIGHTBOX ============ */}
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

export type { KchagPhoto };
