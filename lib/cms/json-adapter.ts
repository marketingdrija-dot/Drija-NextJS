import blogData from "@/data/blog.json";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import retailersData from "@/data/retailers.json";
import supportData from "@/data/support.json";
import type { CmsAdapter, CmsQueryOptions } from "@/lib/cms/adapter";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import {
  localizeBlogPost,
  localizeCategory,
  localizeProduct,
  localizeSupportCategory,
} from "@/lib/i18n/localize-content";
import { filterProductsByMarket } from "@/lib/markets/filter";
import type { BlogPost } from "@/types/blog";
import type { Category } from "@/types/category";
import type { MarketCode } from "@/types/market";
import type { Product } from "@/types/product";
import { localizeCountryRetailers } from "@/lib/i18n/localize-retailers";
import type { CountryRetailers } from "@/types/retailer";
import type { SupportCategory } from "@/types/support";

const products = productsData as Product[];
const categories = categoriesData as Category[];
const blogPosts = blogData as BlogPost[];
const retailers = retailersData as CountryRetailers[];
const support = supportData as SupportCategory[];

function resolveLocale(locale?: Locale): Locale {
  return locale ?? defaultLocale;
}

function applyMarketFilter<T extends Product>(
  items: T[],
  marketCode?: MarketCode,
): T[] {
  if (!marketCode) return items;
  return filterProductsByMarket(items, marketCode) as T[];
}

export const jsonCmsAdapter: CmsAdapter = {
  async getProducts({
    categorySlug,
    featured,
    countryCode,
    marketCode,
    locale,
  }: CmsQueryOptions = {}) {
    const loc = resolveLocale(locale);
    const resolvedMarket = marketCode ?? (countryCode as MarketCode | undefined);
    let result = [...products];
    if (categorySlug) {
      result = result.filter((p) => p.categorySlug === categorySlug);
    }
    if (featured) {
      result = result.filter((p) => p.featured);
    }
    return applyMarketFilter(result, resolvedMarket).map((p) =>
      localizeProduct(p, loc),
    );
  },

  async getProductBySlug(slug, locale) {
    const product = products.find((p) => p.slug === slug);
    if (!product) return null;
    return localizeProduct(product, resolveLocale(locale));
  },

  async getCategories(locale) {
    const loc = resolveLocale(locale);
    return categories
      .map((cat) => ({
        ...localizeCategory(cat, loc),
        productCount: products.filter((p) => p.categorySlug === cat.slug)
          .length,
      }))
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  },

  async getCategoryBySlug(slug, locale) {
    const cat = categories.find((c) => c.slug === slug);
    if (!cat) return null;
    const loc = resolveLocale(locale);
    return {
      ...localizeCategory(cat, loc),
      productCount: products.filter((p) => p.categorySlug === slug).length,
    };
  },

  async getBlogPosts({ featured, locale } = {}) {
    const loc = resolveLocale(locale);
    let result = [...blogPosts].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
    if (featured) result = result.filter((p) => p.featured);
    return result.map((p) => localizeBlogPost(p, loc));
  },

  async getBlogPostBySlug(slug, locale) {
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return null;
    return localizeBlogPost(post, resolveLocale(locale));
  },

  async getRetailers(locale) {
    return localizeCountryRetailers(retailers, resolveLocale(locale));
  },

  async getSupportCategories(locale) {
    const loc = resolveLocale(locale);
    return support
      .map((cat) => localizeSupportCategory(cat, loc))
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  },

  async getSupportArticleBySlug(categorySlug, articleSlug, locale) {
    const loc = resolveLocale(locale);
    const category = support.find((cat) => cat.slug === categorySlug);
    if (!category) return null;

    const article = category.articles.find((item) => item.slug === articleSlug);
    if (!article) return null;

    const localizedCategory = localizeSupportCategory(category, loc);
    const localizedArticle = localizedCategory.articles.find(
      (item) => item.slug === articleSlug,
    );

    if (!localizedArticle) return null;

    return {
      category: localizedCategory,
      article: localizedArticle,
    };
  },
};
