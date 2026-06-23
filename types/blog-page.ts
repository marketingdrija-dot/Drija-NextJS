import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import type { BlogPost } from "@/types/blog";

export type BlogPostsByLocale = Record<Locale, BlogPost[]>;
export type BlogLabelsByLocale = Record<Locale, Dictionary["blog"]>;
