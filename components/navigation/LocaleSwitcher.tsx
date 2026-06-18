"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";
import { locales } from "@/lib/i18n/config";
import {
  getLocaleFlagSrc,
  getLocaleLabel,
} from "@/lib/i18n/locale-flags";
import { getLocaleFromPathname, localizePath } from "@/lib/i18n/paths";
import { useI18n } from "@/lib/i18n/context";
import { useDropdownMenu } from "@/hooks/useDropdownMenu";
import { cn } from "@/lib/utils";

import styles from "./HeaderDropdown.module.css";

type LocaleSwitcherProps = {
  menuAlign?: "start" | "end";
};

export function LocaleSwitcher({ menuAlign = "end" }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const { dict } = useI18n();
  const listboxId = useId();
  const { rootRef, open, toggle, close } = useDropdownMenu();
  const currentLocale = getLocaleFromPathname(pathname);
  const selectedLabel = getLocaleLabel(currentLocale);

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
            const href = localizePath(pathname, locale);

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
