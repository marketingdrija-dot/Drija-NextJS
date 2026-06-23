import type { Locale } from "@/lib/i18n/config";
import type { ContentTranslations } from "@/types/content-i18n";
import type { BlogPost } from "@/types/blog";
import type { Category } from "@/types/category";
import type {
  Product,
  ProductFeatureBlock,
  ProductImage,
  ProductSpec,
} from "@/types/product";
import type { SupportArticle, SupportCategory } from "@/types/support";

type WithTranslations<T> = T & {
  translations?: ContentTranslations<T>;
};

function pickEn<T extends Record<string, unknown>>(
  item: WithTranslations<T>,
  locale: Locale,
): T {
  const { translations, ...base } = item;
  if (locale === "es" || !translations?.en) {
    return base as T;
  }

  const en = translations.en;
  const merged = { ...base } as T;

  for (const key of Object.keys(en) as (keyof T)[]) {
    const value = en[key];
    if (value !== undefined) {
      (merged as Record<string, unknown>)[key as string] = value;
    }
  }

  return merged;
}

export function localizeProduct(product: WithTranslations<Product>, locale: Locale): Product {
  const resolved = pickEn(product, locale);

  if (locale === "en" && product.translations?.en) {
    const en = product.translations.en;
    return {
      ...resolved,
      name: en.name ?? product.name,
      shortDescription: en.shortDescription ?? product.shortDescription,
      description: en.description ?? product.description,
      images: (en.images ?? product.images) as ProductImage[],
      specs: (en.specs ?? product.specs) as ProductSpec[] | undefined,
      features: (en.features ?? product.features) as
        | ProductFeatureBlock[]
        | undefined,
      specsHtml: en.specsHtml ?? product.specsHtml,
    };
  }

  return resolved;
}

export function localizeCategory(
  category: WithTranslations<Category>,
  locale: Locale,
): Category {
  const resolved = pickEn(category, locale);

  if (locale === "en" && category.translations?.en) {
    const en = category.translations.en;
    return {
      ...resolved,
      name: en.name ?? category.name,
      description: en.description ?? category.description,
      image: en.image ?? category.image,
    };
  }

  return resolved;
}

export function localizeBlogPost(post: WithTranslations<BlogPost>, locale: Locale): BlogPost {
  const resolved = pickEn(post, locale);

  if (locale === "en" && post.translations?.en) {
    const en = post.translations.en;
    return {
      ...resolved,
      title: en.title ?? post.title,
      excerpt: en.excerpt ?? post.excerpt,
      content: en.content ?? post.content,
      categoryLabel: en.categoryLabel ?? post.categoryLabel,
      image: en.image ?? post.image,
    };
  }

  return resolved;
}

export function localizeSupportCategory(
  category: WithTranslations<SupportCategory>,
  locale: Locale,
): SupportCategory {
  const { translations, ...base } = category;
  const localizedArticles = category.articles.map((article) =>
    localizeSupportArticle(article, locale),
  );

  if (locale === "es" || !translations?.en) {
    return {
      ...base,
      articles: localizedArticles,
    };
  }

  const enCat = translations.en;
  return {
    ...base,
    name: enCat.name ?? category.name,
    articles: localizedArticles,
  };
}

function localizeSupportArticle(
  article: WithTranslations<SupportArticle>,
  locale: Locale,
): SupportArticle {
  if (locale === "es" || !article.translations?.en) {
    const { translations: _, ...base } = article;
    return base;
  }
  const en = article.translations.en;
  return {
    id: article.id,
    slug: article.slug,
    question: en.question ?? article.question,
    answer: en.answer ?? article.answer,
    tags: en.tags ?? article.tags,
  };
}
