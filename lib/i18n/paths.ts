import { defaultLocale, type Locale } from "@/lib/i18n/config";

/** Strip /en or /es prefix from pathname */
export function stripLocalePrefix(pathname: string): string {
  if (pathname.startsWith("/en")) {
    const rest = pathname.slice(3);
    return rest === "" ? "/" : rest;
  }
  if (pathname.startsWith("/es")) {
    const rest = pathname.slice(3);
    return rest === "" ? "/" : rest;
  }
  return pathname;
}

export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }
  return defaultLocale;
}

/** Build href for a path in the given locale */
export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const base = stripLocalePrefix(normalized);

  if (locale === "en") {
    return base === "/" ? "/en" : `/en${base}`;
  }

  return base;
}

export function isActivePath(pathname: string, href: string): boolean {
  const current = stripLocalePrefix(pathname);
  const target = stripLocalePrefix(href);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

/** Localized href preserving optional query string (e.g. blog ?category=) */
export function buildLocalizedHref(
  pathname: string,
  locale: Locale,
  query?: string | URLSearchParams | null,
): string {
  const base = localizePath(stripLocalePrefix(pathname), locale);
  const qs =
    query instanceof URLSearchParams
      ? query.toString()
      : typeof query === "string"
        ? query.trim()
        : "";

  return qs ? `${base}?${qs}` : base;
}
