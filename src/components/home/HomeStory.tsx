"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Cursor, trackPointer, useStoryEngine } from "@/components/story/engine";
import styles from "./HomeStory.module.css";

type Pic = { src: string; alt: string };

export type HomeStoryProps = {
  hero: { eyebrow: string; titleA: string; titleB: string; subtitle: string; photo: Pic; yearsLabel: string };
  ticker: string[];
  legacy: { heading: string; body: string; quote: string; quoteRef: string; photo: Pic; links: { href: string; label: string }[]; navLabel: string };
  numbers: { value: number; suffix: string; label: string; photo: string }[];
  doors: {
    eyebrow: string;
    heading: string;
    intro: string;
    explore: string;
    items: { title: string; description: string; href: string; photo: Pic }[];
  };
  lands: {
    eyebrow: string;
    heading: string;
    intro: string;
    map: Pic;
    countries: { name: string; count: string | null; photo: Pic | null }[];
    link: { href: string; label: string };
  };
  film: { heading: string; link: { href: string; label: string }; items: { name: string; place: string; href: string; photo: Pic | null }[]; open: string };
  news: { eyebrow: string; heading: string; kicker: string; tag: string; title: string; excerpt: string; cover: Pic | null; href: string; cta: string } | null;
  heritage: { verse: string; cite: string; eyebrow: string; titleA: string; titleB: string; body: string; invite: string; cta: string; photo: Pic };
  donate: { heading: string; body: string; label: string; url: string };
};

/* Years tick from 1846 to 2026 while the hero is scrolled. */
function useYearCounter(section: React.RefObject<HTMLElement | null>, out: React.RefObject<HTMLSpanElement | null>) {
  useEffect(() => {
    const s = section.current;
    const o = out.current;
    if (!s || !o) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      o.replaceChildren("1846");
      return;
    }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = s.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      const eased = 1 - Math.pow(1 - Math.min(1, p / 0.8), 3);
      o.replaceChildren(String(1846 + Math.round(eased * 180)));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [section, out]);
}

/* Two rows of phrases whose speed follows the scroll speed. */
function Ticker({ phrases }: { phrases: string[] }) {
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = window.scrollY;
    let boost = 0;
    const off = [0, 0];
    const slow = [false, false];
    const els = rows.current;
    const enter = els.map((el, i) => {
      const a = () => (slow[i] = true);
      const b = () => (slow[i] = false);
      el?.addEventListener("pointerenter", a);
      el?.addEventListener("pointerleave", b);
      return [a, b] as const;
    });
    function loop() {
      const y = window.scrollY;
      boost = boost * 0.9 + Math.min(40, Math.abs(y - last)) * 0.1;
      last = y;
      els.forEach((el, i) => {
        if (!el) return;
        const half = el.scrollWidth / 2;
        const speed = (slow[i] ? 0.15 : 0.6) + boost * 0.9;
        off[i] = (off[i] + speed) % half;
        const x = i === 0 ? -off[i] : off[i] - half;
        el.style.transform = `translate3d(${x}px,0,0)`;
      });
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      els.forEach((el, i) => {
        el?.removeEventListener("pointerenter", enter[i][0]);
        el?.removeEventListener("pointerleave", enter[i][1]);
      });
    };
  }, []);
  const half = Math.ceil(phrases.length / 2);
  const lines = [phrases.slice(0, half), phrases.slice(half)];
  return (
    <section className={styles.ticker} aria-label={phrases.join(" · ")} data-tone="crimson">
      {lines.map((line, i) => (
        <div key={i} className={styles.tickerRow} aria-hidden="true">
          <div
            className={styles.tickerTrack}
            ref={(el) => {
              rows.current[i] = el;
            }}
          >
            {[...line, ...line, ...line, ...line].map((t, k) => (
              <span key={k} className={styles.tickerItem} data-outline={k % 2 === 1 ? "true" : undefined}>
                {t}
                <i className={styles.tickerStar}>✦</i>
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/* Counts up once when it comes into view. */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = "0" + suffix;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const k = Math.min(1, (t - t0) / 1600);
          el.textContent = Math.round(value * (1 - Math.pow(1 - k, 3))) + suffix;
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, suffix]);
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
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

function Magnetic({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const external = /^https?:/.test(href);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--dx", `${(e.clientX - (r.left + r.width / 2)) * 0.3}px`);
    el.style.setProperty("--dy", `${(e.clientY - (r.top + r.height / 2)) * 0.4}px`);
  };
  const leave = () => {
    ref.current?.style.setProperty("--dx", "0px");
    ref.current?.style.setProperty("--dy", "0px");
  };
  const inner = <span>{children}</span>;
  return external ? (
    <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" className={`${styles.magnet} ${className ?? ""}`} onPointerMove={move} onPointerLeave={leave}>
      {inner}
    </a>
  ) : (
    <Link ref={ref} href={href} className={`${styles.magnet} ${className ?? ""}`} onPointerMove={move} onPointerLeave={leave}>
      {inner}
    </Link>
  );
}

export default function HomeStory(props: HomeStoryProps) {
  const { hero, ticker, legacy, numbers, doors, lands, film, news, heritage, donate } = props;
  const root = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  useStoryEngine(root);
  useYearCounter(heroRef, yearRef);
  const [land, setLand] = useState<number | null>(null);
  const landPhoto = land !== null ? lands.countries[land]?.photo : null;

  return (
    <div ref={root} className={styles.root} data-active-tone="crimson">
      <Cursor root={root} />

      {/* ================= HERO — 1846 → 2026 through the arch ================= */}
      <section ref={heroRef} className={styles.hero} data-scrub="sticky" data-tone="crimson" aria-labelledby="home-title">
        <div className={styles.heroStage} onPointerMove={trackPointer}>
          <div className={styles.heroYear} aria-hidden="true">
            <span ref={yearRef}>1846</span>
          </div>
          <div className={styles.arch}>
            <div className={styles.archImg}>
              <Image src={hero.photo.src} alt={hero.photo.alt} fill priority sizes="100vw" className={styles.cover} />
            </div>
            <div className={styles.archShade} aria-hidden="true" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className={styles.heroSeal} aria-hidden="true" />
          <div className={styles.heroText}>
            <p className={styles.heroEyebrow}>{hero.eyebrow}</p>
            <h1 id="home-title" className={styles.heroTitle}>
              <span className={styles.heroLine}>{hero.titleA}</span>
              <span className={styles.heroLine}>{hero.titleB}</span>
            </h1>
            <p className={styles.heroSub}>{hero.subtitle}</p>
          </div>
          <p className={styles.heroYears} aria-hidden="true">
            {hero.yearsLabel}
          </p>
          <span className={styles.heroScroll} aria-hidden="true" />
        </div>
      </section>

      <Ticker phrases={ticker} />

      {/* ================= LEGACY ================= */}
      <section className={styles.legacy} data-tone="ivory" data-scrub="pass">
        <div className={styles.legacyArch} onPointerMove={trackPointer}>
          <div className={styles.legacyArchIn}>
            <Image src={legacy.photo.src} alt={legacy.photo.alt} fill sizes="(min-width: 900px) 40vw, 90vw" className={styles.cover} />
          </div>
        </div>
        <div className={styles.legacyText}>
          <h2 className={styles.h2}>{legacy.heading}</h2>
          <p className={styles.legacyBody}>
            <WordLight text={legacy.body} />
          </p>
          <blockquote className={styles.quote}>
            {legacy.quote} <cite>{legacy.quoteRef}</cite>
          </blockquote>
          <nav className={styles.wayfinding} aria-label={legacy.navLabel}>
            {legacy.links.map((l) => (
              <Link key={l.href} href={l.href} className={styles.wayLink}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* ================= NUMBERS — photos inside the figures ================= */}
      <section className={styles.numbers} data-tone="parchment">
        {numbers.map((n) => (
          <div key={n.label} className={styles.number} onPointerMove={trackPointer} style={{ "--img": `url(${n.photo})` } as CSSProperties}>
            <span className={styles.numberValue}>
              <Counter value={n.value} suffix={n.suffix} />
            </span>
            <span className={styles.numberLabel}>{n.label}</span>
          </div>
        ))}
      </section>

      {/* ================= DOORS — four ministries ================= */}
      <section className={styles.doors} data-tone="crimson">
        <header className={styles.doorsHead}>
          <p className={styles.eyebrow}>{doors.eyebrow}</p>
          <h2 className={styles.h2}>{doors.heading}</h2>
          <p className={styles.lead}>{doors.intro}</p>
        </header>
        <div className={styles.doorRow}>
          {doors.items.map((d, i) => (
            <Link key={d.href} href={d.href} className={styles.door} data-cursor={doors.explore} style={{ "--k": i } as CSSProperties}>
              <Image src={d.photo.src} alt={d.photo.alt} fill sizes="(min-width: 900px) 50vw, 100vw" className={styles.cover} />
              <span className={styles.doorShade} aria-hidden="true" />
              <span className={styles.doorText}>
                <span className={styles.doorTitle}>{d.title}</span>
                <span className={styles.doorDesc}>{d.description}</span>
                <span className={styles.doorGo}>{doors.explore}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= LANDS — hover a country ================= */}
      <section className={styles.lands} data-tone="ivory" onPointerMove={trackPointer} onPointerLeave={() => setLand(null)}>
        <div className={styles.landsHead}>
          <p className={styles.eyebrow}>{lands.eyebrow}</p>
          <h2 className={styles.h2}>{lands.heading}</h2>
          <p className={styles.lead}>{lands.intro}</p>
        </div>
        <div className={styles.landsBody}>
          <ul className={styles.landList}>
            {lands.countries.map((c, i) => (
              <li
                key={c.name}
                className={styles.land}
                data-active={land === i ? "true" : undefined}
                onPointerEnter={() => setLand(i)}
                onFocus={() => setLand(i)}
                tabIndex={0}
              >
                <span className={styles.landName}>{c.name}</span>
                {c.count && <span className={styles.landCount}>{c.count}</span>}
              </li>
            ))}
          </ul>
          <div className={styles.map}>
            <Image src={lands.map.src} alt={lands.map.alt} fill sizes="(min-width: 900px) 45vw, 90vw" className={styles.contain} />
          </div>
        </div>
        <div className={styles.landFloat} data-show={landPhoto ? "true" : undefined} aria-hidden="true">
          {lands.countries.map((c, i) =>
            c.photo ? (
              <Image
                key={c.name}
                src={c.photo.src}
                alt=""
                fill
                sizes="320px"
                className={styles.cover}
                style={{ opacity: land === i ? 1 : 0 }}
              />
            ) : null,
          )}
        </div>
        <Link href={lands.link.href} className={styles.textLink}>
          {lands.link.label}
        </Link>
      </section>

      {/* ================= FILM — every congregation ================= */}
      <section className={styles.film} data-scrub="sticky" data-tone="night">
        <div className={styles.filmStage}>
          <div className={styles.filmTrack}>
            <div className={styles.filmIntro}>
              <h2 className={styles.h2}>{film.heading}</h2>
              <Link href={film.link.href} className={styles.textLink}>
                {film.link.label}
              </Link>
            </div>
            {film.items.map((c, i) => (
              <Link key={c.href} href={c.href} className={styles.filmCard} data-cursor={film.open} style={{ "--k": i % 3 } as CSSProperties}>
                <span className={styles.filmImg}>
                  {c.photo ? (
                    <Image src={c.photo.src} alt={c.photo.alt || c.name} fill sizes="(min-width: 900px) 24vw, 70vw" className={styles.cover} />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="/logo.svg" alt="" className={styles.filmSeal} />
                  )}
                </span>
                <span className={styles.filmName}>{c.name}</span>
                <span className={styles.filmPlace}>{c.place}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEWS ================= */}
      {news && (
        <section className={styles.news} data-tone="ivory" data-scrub="pass">
          <header className={styles.newsHead}>
            <p className={styles.eyebrow}>{news.eyebrow}</p>
            <h2 className={styles.h2}>{news.heading}</h2>
          </header>
          <Link href={news.href} className={styles.newsCard} data-cursor={news.cta}>
            {news.cover && (
              <span className={styles.newsImg}>
                <Image src={news.cover.src} alt={news.cover.alt} fill sizes="(min-width: 900px) 60vw, 100vw" className={styles.cover} />
              </span>
            )}
            <span className={styles.newsText}>
              <span className={styles.newsKicker}>{news.kicker}</span>
              <span className={styles.newsTitle}>{news.title}</span>
              <span className={styles.newsTag}>{news.tag}</span>
              <span className={styles.newsExcerpt}>{news.excerpt}</span>
              <span className={styles.newsGo}>{news.cta}</span>
            </span>
          </Link>
        </section>
      )}

      {/* ================= HERITAGE ================= */}
      <section className={styles.heritage} data-tone="night" data-scrub="pass">
        <div className={styles.heritageImg}>
          <Image src={heritage.photo.src} alt={heritage.photo.alt} fill sizes="100vw" className={styles.cover} />
        </div>
        <blockquote className={styles.verse}>
          <WordLight text={heritage.verse} />
          <cite>{heritage.cite}</cite>
        </blockquote>
        <div className={styles.heritageText}>
          <p className={styles.eyebrow}>{heritage.eyebrow}</p>
          <h2 className={styles.h2}>
            {heritage.titleA} {heritage.titleB}
          </h2>
          <p className={styles.lead}>{heritage.body}</p>
          <p className={styles.invite}>{heritage.invite}</p>
          <Magnetic href="/resource-center/history">{heritage.cta}</Magnetic>
        </div>
      </section>

      {/* ================= DONATE ================= */}
      <section className={styles.donate} data-tone="gold" data-scrub="pass">
        <h2 className={styles.donateTitle}>{donate.heading}</h2>
        <p className={styles.donateBody}>{donate.body}</p>
        {donate.url ? (
          <Magnetic href={donate.url} className={styles.donateBtn}>
            {donate.label}
          </Magnetic>
        ) : (
          <span className={`${styles.magnet} ${styles.donateBtn}`} role="button" aria-disabled="true">
            <span>{donate.label}</span>
          </span>
        )}
      </section>
    </div>
  );
}
