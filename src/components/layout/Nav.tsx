"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";

const navItems = [
  { label: "Union Leadership", href: "/leadership" },
  { label: "Ministries", href: "/ministries" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Memberships", href: "/memberships" },
  { label: "Resource Center", href: "/resource-center" },
  { label: "Donate", href: "/donate" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <ul className={styles.desktopList}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>

      <div className={styles.mobileNav}>
        <button
          type="button"
          className={styles.toggle}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
        <div id="nav-panel" className={styles.panel} data-open={open}>
          <ul className={styles.list}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
