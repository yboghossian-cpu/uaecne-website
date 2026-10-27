import { NextResponse, type NextRequest } from "next/server";

// Language routing. Every public page lives under /en/... or /hy/... inside
// the app, but visitors always see the plain URL (/churches, not
// /en/churches): the chosen language comes from a cookie set by the
// EN | ՀԱՅ switch. A link with ?lang=hy (or /hy/...) sets that cookie, so a
// page can be shared directly in Armenian.
const COOKIE = "uaecne_lang";
const LANGS = new Set(["en", "hy"]);

export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // /en/... or /hy/... typed directly -> plain URL + remember the language
  const prefix = pathname.match(/^\/(en|hy)(\/.*)?$/);
  if (prefix) {
    const url = req.nextUrl.clone();
    url.pathname = prefix[2] || "/";
    const res = NextResponse.redirect(url);
    res.cookies.set(COOKIE, prefix[1], { path: "/", maxAge: 31536000, sameSite: "lax" });
    return res;
  }

  // ?lang=hy|en -> remember it and drop the parameter
  const q = searchParams.get("lang");
  if (q && LANGS.has(q)) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("lang");
    const res = NextResponse.redirect(url);
    res.cookies.set(COOKIE, q, { path: "/", maxAge: 31536000, sameSite: "lax" });
    return res;
  }

  const c = req.cookies.get(COOKIE)?.value;
  const lang = c && LANGS.has(c) ? c : "en";
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  const res = NextResponse.rewrite(url);
  res.headers.set("Vary", "Cookie");
  return res;
}

export const config = {
  // Everything except the admin, uploaded media, Next internals and files.
  matcher: ["/((?!admin|media|_next|api|favicon\\.ico|icon\\.png|apple-icon\\.png|robots\\.txt|sitemap\\.xml|.*\\.[a-zA-Z0-9]+$).*)"],
};
