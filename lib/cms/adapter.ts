/**
 * CMS adapter interface — swap JSON loaders for Sanity (or another CMS) later.
 */
import type { Locale } from "@/lib/i18n/config";
import type { BlogPost } from "@/types/blog";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
import type { CountryRetailers } from "@/types/retailer";
import type { SupportCategory } from "@/types/support";

export type ContentSource = "json" | "sanity";

export type CmsQueryOptions = {
  locale?: Locale;
  categorySlug?: string;
  featured?: boolean;
  countryCode?: string;
};

export interface CmsAdapter {
  getProducts(options?: CmsQueryOptions): Promise<Product[]>;
  getProductBySlug(slug: string, locale?: Locale): Promise<Product | null>;
  getCategories(locale?: Locale): Promise<Category[]>;
  getCategoryBySlug(slug: string, locale?: Locale): Promise<Category | null>;
  getBlogPosts(options?: Pick<CmsQueryOptions, "featured" | "locale">): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string, locale?: Locale): Promise<BlogPost | null>;
  getRetailers(locale?: Locale): Promise<CountryRetailers[]>;
  getSupportCategories(locale?: Locale): Promise<SupportCategory[]>;
}
