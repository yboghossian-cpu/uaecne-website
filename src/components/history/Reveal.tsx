"use client";

import type { ReactNode } from "react";
import { useScrollReveal } from "@/components/home/useScrollReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

// Thin wrapper around the shared useScrollReveal hook (imported as-is from
// src/components/home/ — not moved) + the site-wide .scroll-reveal marker
// already defined in globals.css. Used throughout the History page since
// its mockup reveals many independent blocks (opening, each pillar row,
// quote, partners, governance, close).
export default function Reveal({ children, className }: RevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-visible={visible}
      className={className ? `scroll-reveal ${className}` : "scroll-reveal"}
    >
      {children}
    </div>
  );
}
