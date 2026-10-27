import Link from "next/link";
import PostForm from "@/components/admin/PostForm";
import styles from "@/components/admin/admin.module.css";

export default function NewPost() {
  return (
    <>
      <div className={styles.pageHead}>
        <div>
          <p className={styles.crumbs}>
            <Link href="/admin/news">News &amp; Events</Link>
          </p>
          <h1 className={styles.title}>New post</h1>
        </div>
      </div>
      <PostForm post={null} />
    </>
  );
}
