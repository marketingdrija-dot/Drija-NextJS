"use client";

import { useMemo } from "react";
import {
  buildSupportSearchIndex,
  createSupportSearchIndex,
  filterCategoriesBySearchHits,
  searchSupportArticles,
} from "@/lib/search/support-search";
import type { Locale } from "@/lib/i18n/config";
import type { SupportCategory } from "@/types/support";

export function useSupportSearch(
  categories: SupportCategory[],
  locale: Locale,
  query: string,
) {
  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length >= 2;

  const searchItems = useMemo(
    () => buildSupportSearchIndex(categories, locale),
    [categories, locale],
  );

  const fuse = useMemo(
    () => createSupportSearchIndex(searchItems),
    [searchItems],
  );

  const hits = useMemo(
    () => (hasQuery ? searchSupportArticles(fuse, trimmedQuery) : []),
    [fuse, hasQuery, trimmedQuery],
  );

  const filteredCategories = useMemo(() => {
    if (!hasQuery) return categories;
    return filterCategoriesBySearchHits(categories, hits);
  }, [categories, hasQuery, hits]);

  return {
    filteredCategories,
    hasQuery,
    resultCount: hits.length,
  };
}
