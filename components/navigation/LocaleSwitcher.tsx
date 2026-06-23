"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useId } from "react";
import { isBlogPath } from "@/lib/blog/locale-path";
import { locales, type Locale } from "@/lib/i18n/config";
import {
  getLocaleFlagSrc,
  getLocaleLabel,
} from "@/lib/i18n/locale-flags";
import {
  buildLocalizedHref,
  getLocaleFromPathname,
} from "@/lib/i18n/paths";
import { useI18n } from "@/lib/i18n/context";
import { useDropdownMenu } from "@/hooks/useDropdownMenu";
import { useBlogLocaleStore } from "@/stores/blog-locale-store";
import { cn } from "@/lib/utils";

import styles from "./HeaderDropdown.module.css";

type LocaleSwitcherProps = {
  menuAlign?: "start" | "end";
};

function LocaleSwitcherMenu({ menuAlign = "end" }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { dict, locale: routeLocale } = useI18n();
  const listboxId = useId();
  const { rootRef, open, toggle, close } = useDropdownMenu();
  const displayLocale = useBlogLocaleStore((state) => state.displayLocale);
  const setDisplayLocale = useBlogLocaleStore((state) => state.setDisplayLocale);

  const onBlog = isBlogPath(pathname);
  const currentLocale = onBlog ? displayLocale : getLocaleFromPathname(pathname);
  const selectedLabel = getLocaleLabel(currentLocale);
  const queryString = searchParams.toString();

  useEffect(() => {
    if (onBlog) {
      setDisplayLocale(routeLocale);
    }
  }, [onBlog, routeLocale, setDisplayLocale]);

  const handleBlogLocaleChange = (locale: Locale) => {
    setDisplayLocale(locale);
    const href = buildLocalizedHref(pathname, locale, queryString);
    window.history.replaceState(null, "", href);
    close();
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label={`${dict.locale.current}: ${selectedLabel}`}
        onClick={toggle}
      >
        <Image
          src={getLocaleFlagSrc(currentLocale)}
          alt=""
          width={32}
          height={20}
          className={styles.flag}
          aria-hidden
        />
        <span
          className={cn(styles.chevron, open && styles.chevronOpen)}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          id={listboxId}
          className={cn(styles.menu, menuAlign === "end" && styles.menuEnd)}
          role="listbox"
          aria-label={dict.locale.current}
        >
          {locales.map((locale) => {
            const isSelected = locale === currentLocale;
            const href = buildLocalizedHref(pathname, locale, queryString);

            if (onBlog) {
              return (
                <button
                  key={locale}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={cn(
                    styles.option,
                    isSelected && styles.optionSelected,
                  )}
                  onClick={() => handleBlogLocaleChange(locale)}
                >
                  <Image
                    src={getLocaleFlagSrc(locale)}
                    alt=""
                    width={32}
                    height={20}
                    className={styles.flag}
                    aria-hidden
                  />
                  <span className={styles.optionLabel}>
                    {getLocaleLabel(locale)}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={locale}
                href={href}
                hrefLang={locale}
                role="option"
                aria-selected={isSelected}
                className={cn(styles.option, isSelected && styles.optionSelected)}
                onClick={close}
              >
                <Image
                  src={getLocaleFlagSrc(locale)}
                  alt=""
                  width={32}
                  height={20}
                  className={styles.flag}
                  aria-hidden
                />
                <span className={styles.optionLabel}>
                  {getLocaleLabel(locale)}
                </span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function LocaleSwitcherFallback() {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);

  return (
    <div className={styles.root} aria-hidden>
      <span className={styles.trigger}>
        <Image
          src={getLocaleFlagSrc(currentLocale)}
          alt=""
          width={32}
          height={20}
          className={styles.flag}
        />
      </span>
    </div>
  );
}

export function LocaleSwitcher(props: LocaleSwitcherProps) {
  return (
    <Suspense fallback={<LocaleSwitcherFallback />}>
      <LocaleSwitcherMenu {...props} />
    </Suspense>
  );
}
