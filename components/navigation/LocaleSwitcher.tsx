"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { getLocaleFromPathname, localizePath } from "@/lib/i18n/paths";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const { dict } = useI18n();
  const currentLocale = getLocaleFromPathname(pathname);
  const targetLocale: Locale = currentLocale === "es" ? "en" : "es";
  const targetHref = localizePath(pathname, targetLocale);

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-xs font-semibold uppercase tracking-wide text-white/90 sm:inline">
        {dict.locale.current}
      </span>
      <Link
        href={targetHref}
        hrefLang={targetLocale}
        className={cn(
          "inline-flex items-center rounded-full border border-white/50 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition",
          "hover:border-drija-green hover:bg-drija-green hover:text-white",
        )}
        aria-label={`Switch to ${dict.locale.switchTo}`}
      >
        {dict.locale.switchTo}
      </Link>
    </div>
  );
}
