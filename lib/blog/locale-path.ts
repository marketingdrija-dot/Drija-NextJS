import { stripLocalePrefix } from "@/lib/i18n/paths";

export function isBlogPath(pathname: string): boolean {
  const base = stripLocalePrefix(pathname);
  return base === "/blog";
}
