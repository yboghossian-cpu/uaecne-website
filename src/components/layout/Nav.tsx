"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    label: "Union Leadership",
    href: "/leadership",
    children: [
      { label: "Central Committee", href: "/leadership/central-committee" },
    ],
  },
  {
    label: "Ministries",
    href: "/ministries",
    children: [
      { label: "Churches", href: "/churches" },
      { label: "Schools", href: "/schools" },
    ],
  },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Memberships", href: "/memberships" },
  { label: "Resource Center", href: "/resource-center" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <ul className={styles.desktopList}>
        {navItems.map((item) =>
          item.children ? (
            <li key={item.href} className={styles.hasChildren}>
              <Link href={item.href}>{item.label}</Link>
              <div className={styles.dropdown}>
                <ul className={styles.dropdownInner}>
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href}>{child.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ) : (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ),
        )}
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
                {item.children && (
                  <ul className={styles.sublist}>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href}>{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
