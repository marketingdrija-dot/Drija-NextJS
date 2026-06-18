import type { Locale } from "@/lib/i18n/config";

export const LOCALE_FLAG_SRC: Record<Locale, string> = {
  es: "/images/locales/es.svg",
  en: "/images/locales/en.svg",
};

export const LOCALE_LABEL: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

export function getLocaleFlagSrc(locale: Locale): string {
  return LOCALE_FLAG_SRC[locale];
}

export function getLocaleLabel(locale: Locale): string {
  return LOCALE_LABEL[locale];
}
