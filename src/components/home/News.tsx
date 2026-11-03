"use client";


import { useT } from "@/lib/i18n/client";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "./useScrollReveal";
import styles from "./News.module.css";

// "Latest Updates" — redesigned full-width GA feature, matching
// design-reference/uaecne-homepage-second-half-enhanced.html's `.feature`.
// Links to the real built 79th General Assembly article route (the
// mockup's own href, "/resource-center/general-assembly-2026", is a wrong
// placeholder guess — corrected here). The mockup's `.arch-note` caption
// ("Photo slot holds the existing General Assembly photograph already on
// the site.") is a build instruction to whoever implements this, not real
// page copy — intentionally not rendered.
export type HomeNewsPost = {
  title: string;
  kicker: string;
  tag: string;
  excerpt: string;
  cover: string | null;
  coverAlt: string;
  href: string;
};

export default function News({ post }: { post: HomeNewsPost }) {
  const tx = useT();
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-visible={visible}
      className={`${styles.section} scroll-reveal`}
    >
      <div className={styles.secHead}>
        <div className={styles.eyebrow}>{tx("From the Union")}</div>
        <h2 className={styles.heading}>{tx("Latest Updates")}</h2>
        <div className={styles.flourish}>
          <span className={styles.fln} />
          <svg className={styles.flMed} viewBox="0 0 24 24" aria-hidden="true">
            <use href="#med" />
          </svg>
          <span className={styles.fln} />
        </div>
      </div>
      <div className={styles.feature}>
        <div className={styles.ph}>
          {post.cover && <Image src={post.cover} alt={post.coverAlt} fill className={styles.photo} />}
          {post.tag && <span className={styles.tag}>{post.tag}</span>}
        </div>
        <div className={styles.bd}>
          <svg className={styles.sealWm} viewBox="0 0 48 48" aria-hidden="true">
            <use href="#ic-hp-quat" />
          </svg>
          {post.kicker && <div className={styles.kick}>{post.kicker}</div>}
          <h3 className={styles.headline}>{post.title}</h3>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <Link href={post.href} className={styles.more}>
            {tx("Read the full story")}
            <svg className={styles.moreIcon} viewBox="0 0 24 24" aria-hidden="true">
              <use href="#ic-arrow" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
