"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";

type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  {
    label: "Union Leadership",
    children: [
      { label: "Central Committee", href: "/leadership/central-committee" },
      { label: "Headquarters", href: "/leadership/headquarters" },
    ],
  },
  {
    label: "Ministries",
    children: [
      { label: "Churches", href: "/churches" },
      { label: "Schools", href: "/schools" },
      { label: "Higher Education", href: "/higher-education" },
      { label: "Outreach", href: "/outreach" },
      {
        label: "Health Care",
        children: [
          {
            label: "Old Age Homes — Lebanon, Syria",
            href: "/ministries/health-care/old-age-homes",
          },
          {
            label: "National Sanatorium, Azounieh",
            href: "/ministries/health-care/national-sanatorium-azounieh",
          },
          {
            label: "Special Care Centers",
            href: "/ministries/health-care/special-care-centers",
          },
          {
            label: "Karageusian Foundation — Lebanon, Syria",
            href: "/ministries/health-care/karageusian-foundation",
          },
          {
            label: "Jinishian — Lebanon, Syria",
            href: "/ministries/health-care/jinishian",
          },
        ],
      },
    ],
  },
  {
    label: "Partnerships",
    children: [
      {
        label: "Ecumenical Partners",
        children: [
          {
            label: "Supreme Council",
            href: "/partnerships/ecumenical/supreme-council",
          },
          {
            label: "Armenian Apostolic Church",
            href: "/partnerships/ecumenical/armenian-apostolic-church",
          },
          {
            label: "Armenian Catholic Church",
            href: "/partnerships/ecumenical/armenian-catholic-church",
          },
        ],
      },
      {
        label: "Local Partners",
        children: [
          { label: "BSL (Bible Society)", href: "/partnerships/local/bsl" },
          { label: "FMEEC", href: "/partnerships/local/fmeec" },
          { label: "MECC", href: "/partnerships/local/mecc" },
        ],
      },
      {
        label: "International Partners",
        children: [
          { label: "ACO — 2 branches", href: "/partnerships/international/aco" },
          { label: "AMAA", href: "/partnerships/international/amaa" },
          { label: "CEU Int'l", href: "/partnerships/international/ceu-intl" },
          {
            label: "Common Global Ministries Board (UCC/DOC)",
            href: "/partnerships/international/common-global-ministries-board",
          },
          {
            label: "Danish Armenian Mission",
            href: "/partnerships/international/danish-armenian-mission",
          },
          {
            label: "Hilfsbund — 2 branches",
            href: "/partnerships/international/hilfsbund",
          },
          { label: "GZB", href: "/partnerships/international/gzb" },
          { label: "WCRC", href: "/partnerships/international/wcrc" },
          { label: "WCC", href: "/partnerships/international/wcc" },
        ],
      },
    ],
  },
  { label: "Memberships" },
  {
    label: "Resource Center",
    children: [
      { label: "History of the UAECNE", href: "/resource-center/history" },
      {
        label: "79th General Assembly",
        href: "/resource-center/news/79th-general-assembly",
      },
    ],
  },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const [openDesktopGroups, setOpenDesktopGroups] = useState<Set<string>>(
    new Set(),
  );
  const navRef = useRef<HTMLElement>(null);

  function toggleGroup(label: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }

  const topLevelLabels = new Set(navItems.map((item) => item.label));

  // isTopLevel distinguishes a top-level trigger (Union Leadership,
  // Ministries, Partnerships, Resource Center) from a nested sub-trigger
  // (e.g. "Ecumenical Partners" inside Partnerships). Opening a top-level
  // trigger closes any other open top-level trigger first, so only one
  // top-level menu is ever open at once; opening a nested sub-trigger only
  // adds itself, leaving its own top-level parent (and any other nested
  // group) untouched — Partnerships + Ecumenical Partners must stay open
  // together for the 3-level flyout. Re-clicking an already-open label
  // (top-level or nested) always just closes that one label.
  function toggleDesktopGroup(label: string, isTopLevel: boolean) {
    setOpenDesktopGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
        return next;
      }
      if (isTopLevel) {
        for (const l of topLevelLabels) {
          if (l !== label) next.delete(l);
        }
      }
      next.add(label);
      return next;
    });
  }

  // Desktop dropdown/flyout triggers are plain buttons (no href), so they
  // rely on explicit click/tap state below rather than :hover alone — a
  // touch device at desktop width has no hover to simulate on a button.
  // Click-away closes everything; navigating via a link inside closes it
  // too; Escape closes everything as well.
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDesktopGroups(new Set());
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDesktopGroups(new Set());
      }
    }
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav className={styles.nav} ref={navRef}>
      <ul
        className={styles.desktopList}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.tagName === "A") {
            setOpenDesktopGroups(new Set());
            // Deferred: blurring synchronously in the click handler
            // interfered with Link's own click handling and silently
            // cancelled navigation.
            setTimeout(() => target.blur(), 0);
          }
        }}
      >
        {navItems.map((item) => (
          <li
            key={item.label}
            className={item.children ? styles.hasChildren : undefined}
          >
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : item.children ? (
              <button
                type="button"
                className={styles.topLevelTrigger}
                aria-expanded={openDesktopGroups.has(item.label)}
                onClick={() => toggleDesktopGroup(item.label, true)}
              >
                {item.label}
              </button>
            ) : (
              // No href and no children (Memberships today) — a plain,
              // non-interactive label until a real route exists. Same type
              // styling as the button triggers, but no dropdown chevron,
              // pointer cursor, or hover underline (there's nothing to open).
              <span className={styles.topLevelLabel} aria-disabled="true">
                {item.label}
              </span>
            )}
            {item.children && (
              <div
                className={styles.dropdown}
                data-open={openDesktopGroups.has(item.label)}
              >
                <ul className={styles.dropdownInner}>
                  {item.children.map((child) => (
                    <li
                      key={child.label}
                      className={
                        child.children ? styles.hasSubChildren : undefined
                      }
                    >
                      {child.href ? (
                        <Link href={child.href}>{child.label}</Link>
                      ) : (
                        <button
                          type="button"
                          className={styles.subLevelTrigger}
                          aria-expanded={openDesktopGroups.has(child.label)}
                          onClick={() => toggleDesktopGroup(child.label, false)}
                        >
                          {child.label}
                        </button>
                      )}
                      {child.children && (
                        <div
                          className={styles.flyout}
                          data-open={openDesktopGroups.has(child.label)}
                        >
                          <ul className={styles.flyoutInner}>
                            {child.children.map((grandchild) => (
                              <li key={grandchild.href}>
                                <Link href={grandchild.href!}>
                                  {grandchild.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
              <li key={item.label}>
                {item.href ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span className={styles.groupLabel}>{item.label}</span>
                )}
                {item.children && (
                  <ul className={styles.sublist}>
                    {item.children.map((child) => (
                      <li key={child.label}>
                        {child.children ? (
                          <>
                            <button
                              type="button"
                              className={styles.subToggle}
                              aria-expanded={openGroups.has(child.label)}
                              onClick={() => toggleGroup(child.label)}
                            >
                              {child.label}
                            </button>
                            {openGroups.has(child.label) && (
                              <ul className={styles.subsublist}>
                                {child.children.map((grandchild) => (
                                  <li key={grandchild.href}>
                                    <Link href={grandchild.href!}>
                                      {grandchild.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        ) : (
                          <Link href={child.href!}>{child.label}</Link>
                        )}
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
