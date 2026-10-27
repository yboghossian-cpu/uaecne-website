import { getT, getL, getLang } from "@/lib/i18n/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import { formatDate, getPublishedPosts, postHref, type Post } from "@/lib/server/posts";
import { pageMetadata } from "@/lib/site";
import styles from "./news.module.css";

export const metadata: Metadata = pageMetadata({
  title: "News & Events — UAECNE",
  description: "News and upcoming events from the Union of the Armenian Evangelical Churches in the Near East.",
  path: "/news",
});

async function Card({ post }: { post: Post }) {
  const tx = await getT();
  const lang = await getLang();
  const isEvent = post.kind === "event";
  return (
    <Link href={postHref(post)} className={styles.card}>
      <div className={styles.cardPhoto}>
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.cover_alt}
            fill
            sizes="(min-width: 900px) 360px, 100vw"
            className={styles.img}
          />
        ) : (
          <svg className={styles.cardMed} viewBox="0 0 24 24" aria-hidden="true">
            <use href="#med" />
          </svg>
        )}
        <span className={styles.badge}>{isEvent ? tx("Event") : tx("News")}</span>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.meta}>
          {isEvent && post.event_start ? formatDate(post.event_start, true, lang) : formatDate(post.date, false, lang)}
          {isEvent && post.location ? ` · ${post.location}` : ""}
        </p>
        <h3 className={styles.cardTitle}>{post.title}</h3>
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
      </div>
    </Link>
  );
}

export default async function NewsIndex() {
  const tx = await getT();
  const L = await getL();
  const posts = L(getPublishedPosts());
  const now = new Date().toISOString().slice(0, 16);
  const upcoming = posts
    .filter((p) => p.kind === "event" && (p.event_end ?? p.event_start ?? "") >= now)
    .sort((a, b) => (a.event_start ?? "").localeCompare(b.event_start ?? ""));
  const rest = posts.filter((p) => !upcoming.includes(p));

  return (
    <>
      <PageHero title={tx("News & Events")} subtitle={tx("Updates and upcoming events from the Union.")} />
      {upcoming.length > 0 && (
        <section className={`${styles.section} ${styles.wash}`}>
          <h2 className={styles.heading}>{tx("Upcoming Events")}</h2>
          <div className={styles.grid}>
            {upcoming.map((p) => (
              <Card key={p.id || p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
      <section className={styles.section}>
        <h2 className={styles.heading}>{tx("Latest")}</h2>
        {rest.length ? (
          <div className={styles.grid}>
            {rest.map((p) => (
              <Card key={p.id || p.slug} post={p} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>{tx("No news yet.")}</p>
        )}
      </section>
    </>
  );
}
