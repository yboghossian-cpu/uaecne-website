import Link from "next/link";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { getPostById, postHref } from "@/lib/server/posts";
import { deletePost } from "../../../actions";
import styles from "@/components/admin/admin.module.css";

export default async function EditPost({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const id = Number((await params).id);
  const { saved } = await searchParams;
  const post = getPostById(id);
  if (!post) notFound();
  return (
    <>
      <div className={styles.pageHead}>
        <div>
          <p className={styles.crumbs}>
            <Link href="/admin/news">News &amp; Events</Link>
          </p>
          <h1 className={styles.title}>{post.title}</h1>
        </div>
        <div className={styles.row}>
          {post.published ? (
            <a href={postHref(post)} target="_blank" rel="noopener" className={styles.btnGhost}>
              View live ↗
            </a>
          ) : null}
          <ConfirmButton
            label="Delete"
            confirmText="Delete this post permanently?"
            className={styles.btnDanger}
            action={async () => {
              "use server";
              await deletePost(id);
            }}
          />
        </div>
      </div>
      {saved && (
        <p className={styles.msgOk} style={{ maxWidth: 1100, marginBottom: "1rem" }}>
          Post created.
        </p>
      )}
      <PostForm post={post} />
    </>
  );
}
