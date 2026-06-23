import Fuse from "fuse.js";
import { getSupportArticlePath } from "@/lib/support/paths";
import type { Locale } from "@/lib/i18n/config";
import type { SupportCategory } from "@/types/support";

export type SupportSearchHit = {
  id: string;
  categorySlug: string;
  categoryName: string;
  articleSlug: string;
  question: string;
  answer: string;
  tags: string;
  url: string;
};

export function buildSupportSearchIndex(
  categories: SupportCategory[],
  locale: Locale,
): SupportSearchHit[] {
  return categories.flatMap((category) =>
    category.articles.map((article) => ({
      id: article.id,
      categorySlug: category.slug,
      categoryName: category.name,
      articleSlug: article.slug,
      question: article.question,
      answer: article.answer,
      tags: (article.tags ?? []).join(" "),
      url: getSupportArticlePath(category.slug, article.slug, locale),
    })),
  );
}

export function createSupportSearchIndex(items: SupportSearchHit[]) {
  return new Fuse(items, {
    keys: [
      { name: "question", weight: 0.45 },
      { name: "categoryName", weight: 0.25 },
      { name: "answer", weight: 0.2 },
      { name: "tags", weight: 0.1 },
    ],
    threshold: 0.38,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });
}

export function searchSupportArticles(
  fuse: Fuse<SupportSearchHit>,
  query: string,
): SupportSearchHit[] {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  return fuse.search(trimmed).map((result) => result.item);
}

export function filterCategoriesBySearchHits(
  categories: SupportCategory[],
  hits: SupportSearchHit[],
): SupportCategory[] {
  if (hits.length === 0) return [];

  const hitsByCategory = new Map<string, Set<string>>();

  for (const hit of hits) {
    const articleSlugs =
      hitsByCategory.get(hit.categorySlug) ?? new Set<string>();
    articleSlugs.add(hit.articleSlug);
    hitsByCategory.set(hit.categorySlug, articleSlugs);
  }

  return categories
    .filter((category) => hitsByCategory.has(category.slug))
    .map((category) => {
      const visibleSlugs = hitsByCategory.get(category.slug)!;

      return {
        ...category,
        articles: category.articles.filter((article) =>
          visibleSlugs.has(article.slug),
        ),
      };
    });
}
