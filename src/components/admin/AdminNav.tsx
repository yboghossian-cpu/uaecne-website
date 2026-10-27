"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./admin.module.css";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/inbox", label: "Inbox" },
  { href: "/admin/news", label: "News & Events" },
  { href: "/admin/churches", label: "Churches" },
  { href: "/admin/schools", label: "Schools" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/account", label: "Account" },
];

export default function AdminNav({ unread }: { unread: number }) {
  const path = usePathname() ?? "";
  return (
    <nav className={styles.nav} aria-label="Admin">
      {LINKS.map((l) => {
        const active = l.href === "/admin" ? path === "/admin" : path.startsWith(l.href);
        return (
          <Link key={l.href} href={l.href} className={`${styles.navLink} ${active ? styles.navActive : ""}`}>
            {l.label}
            {l.href === "/admin/inbox" && unread > 0 && <span className={styles.count}>{unread}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
