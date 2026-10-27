import { NextResponse, type NextRequest } from "next/server";

// Language routing. Every public page lives under /en/... or /hy/... inside
// the app, but visitors always see the plain URL (/churches, not
// /en/churches): the chosen language comes from a cookie set by the
// EN | ՀԱՅ switch. A link with ?lang=hy (or /hy/...) sets that cookie, so a
// page can be shared directly in Armenian.
const COOKIE = "uaecne_lang";
const LANGS = new Set(["en", "hy"]);

// Redirects are built from the visitor's own host (behind Caddy, Next's
// idea of the URL is https://localhost:3000).
function redirectTo(req: NextRequest, path: string, lang: string) {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? req.nextUrl.host;
  const proto = (req.headers.get("x-forwarded-proto") ?? req.nextUrl.protocol.replace(":", "")).split(",")[0].trim();
  const res = NextResponse.redirect(new URL(path, `${proto}://${host}`), 307);
  res.cookies.set(COOKIE, lang, { path: "/", maxAge: 31536000, sameSite: "lax" });
  return res;
}

export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // /en/... or /hy/... typed directly -> plain URL + remember the language
  const prefix = pathname.match(/^\/(en|hy)(\/.*)?$/);
  if (prefix) {
    const qs = searchParams.toString();
    return redirectTo(req, (prefix[2] || "/") + (qs ? `?${qs}` : ""), prefix[1]);
  }

  // ?lang=hy|en -> remember it and drop the parameter
  const q = searchParams.get("lang");
  if (q && LANGS.has(q)) {
    const rest = new URLSearchParams(searchParams);
    rest.delete("lang");
    const qs = rest.toString();
    return redirectTo(req, pathname + (qs ? `?${qs}` : ""), q);
  }

  // The language rewrite itself happens in next.config.ts.
  const res = NextResponse.next();
  res.headers.set("Vary", "Cookie");
  return res;
}

export const config = {
  // Everything except the admin, uploaded media, Next internals and files.
  matcher: ["/((?!admin|media|_next|api|favicon\\.ico|icon\\.png|apple-icon\\.png|robots\\.txt|sitemap\\.xml|.*\\.[a-zA-Z0-9]+$).*)"],
};
