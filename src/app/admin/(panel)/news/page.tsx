import Link from "next/link";
import { formatDate, getAllPostsForAdmin, getHomepagePost, postHref } from "@/lib/server/posts";
import styles from "@/components/admin/admin.module.css";

export default function NewsAdmin() {
  const posts = getAllPostsForAdmin();
  const home = getHomepagePost();
  return (
    <>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>News & Events</h1>
          <p className={styles.subtitle}>
            Published posts appear on the News &amp; Events page. The homepage “Latest Updates” shows the newest post
            marked “Feature on homepage”.
          </p>
        </div>
        <Link href="/admin/news/new" className={styles.btn}>
          + New post
        </Link>
      </div>
      <section className={styles.card}>
        {posts.length === 0 ? (
          <p className={styles.muted}>No posts yet.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <Link href={`/admin/news/${p.id}`}>{p.title}</Link>
                    </td>
                    <td className={styles.muted}>{p.kind === "event" ? "Event" : "News"}</td>
                    <td className={styles.muted}>
                      {p.kind === "event" && p.event_start ? formatDate(p.event_start) : formatDate(p.date)}
                    </td>
                    <td>
                      {p.published ? (
                        <span className={styles.pillGreen}>Published</span>
                      ) : (
                        <span className={styles.pillGrey}>Draft</span>
                      )}{" "}
                      {home?.id === p.id && <span className={styles.pillGold}>On homepage</span>}
                    </td>
                    <td>
                      {p.published ? (
                        <a href={postHref(p)} target="_blank" rel="noopener" className={styles.muted}>
                          View ↗
                        </a>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
