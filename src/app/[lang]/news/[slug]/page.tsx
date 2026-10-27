import { getT, getL, getLang } from "@/lib/i18n/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { formatDate, getPostBySlug, getPublishedPosts } from "@/lib/server/posts";
import { pageMetadata, summarize } from "@/lib/site";
import styles from "../news.module.css";

type Params = { slug: string };

export function generateStaticParams() {
  return getPublishedPosts()
    .filter((p) => !p.link)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const L = await getL();
  const post = L(getPostBySlug((await params).slug));
  if (!post) return { title: "News — UAECNE" };
  return pageMetadata({
    title: `${post.title} — UAECNE`,
    description: post.excerpt ? summarize(post.excerpt) : undefined,
    image: post.cover,
    path: `/news/${post.slug}`,
  });
}

// Body text: a blank line starts a new paragraph; a line starting with
// "## " is a subheading.
function Body({ text }: { text: string }) {
  const blocks = text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  return (
    <>
      {blocks.map((b, i) =>
        b.startsWith("## ") ? (
          <h2 key={i} className={styles.subhead}>
            {b.slice(3)}
          </h2>
        ) : (
          <p key={i} className={styles.para}>
            {b.split("\n").map((line, j, arr) => (
              <span key={j}>
                {line}
                {j < arr.length - 1 && <br />}
              </span>
            ))}
          </p>
        ),
      )}
    </>
  );
}

export default async function NewsArticle({ params }: { params: Promise<Params> }) {
  const tx = await getT();
  const L = await getL();
  const lang = await getLang();
  const post = L(getPostBySlug((await params).slug));
  if (!post) notFound();
  if (post.link) redirect(post.link);
  const isEvent = post.kind === "event";
  return (
    <article className={styles.article}>
      <nav className={styles.crumb} aria-label={tx("Breadcrumb")}>
        <Link href="/news">{tx("News & Events")}</Link> <span aria-hidden="true">›</span> {isEvent ? tx("Event") : tx("News")}
      </nav>
      {post.kicker && <p className={styles.kicker}>{post.kicker}</p>}
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.meta}>{formatDate(post.date, false, lang)}</p>
      {isEvent && (
        <dl className={styles.eventBox}>
          {post.event_start && (
            <div>
              <dt>{tx("When")}</dt>
              <dd>
                {formatDate(post.event_start, true, lang)}
                {post.event_end ? ` – ${formatDate(post.event_end, true, lang)}` : ""}
              </dd>
            </div>
          )}
          {post.location && (
            <div>
              <dt>{tx("Where")}</dt>
              <dd>{post.location}</dd>
            </div>
          )}
        </dl>
      )}
      {post.cover && (
        <div className={styles.hero}>
          <Image
            src={post.cover}
            alt={post.cover_alt}
            fill
            priority
            sizes="(min-width: 900px) 860px, 100vw"
            className={styles.img}
          />
        </div>
      )}
      {post.excerpt && <p className={styles.lede}>{post.excerpt}</p>}
      <Body text={post.body} />
      <p className={styles.back}>
        <Link href="/news">{tx("← All news & events")}</Link>
      </p>
    </article>
  );
}
