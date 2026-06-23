import { localizePath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/config";

export function getSupportArticlePath(
  categorySlug: string,
  articleSlug: string,
  locale: Locale,
): string {
  return localizePath(`/soporte/${categorySlug}/${articleSlug}`, locale);
}
