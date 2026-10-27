"use client";

import { createContext, useContext } from "react";
import type { Lang } from "./config";

type Ctx = { lang: Lang; messages: Record<string, string> };
const LangContext = createContext<Ctx>({ lang: "en", messages: {} });

export function LangProvider({ lang, messages, children }: Ctx & { children: React.ReactNode }) {
  return <LangContext.Provider value={{ lang, messages }}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext).lang;
}

/** Translator for client components (only UI labels are sent to the browser). */
export function useT(): (s: string) => string {
  const { lang, messages } = useContext(LangContext);
  return (s: string) => (lang === "en" ? s : (messages[s] ?? s));
}
