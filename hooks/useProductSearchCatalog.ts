"use client";

import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

type SearchCatalog = {
  categories: Category[];
  products: Product[];
};

export function useProductSearchCatalog(locale: Locale, enabled: boolean) {
  const [catalog, setCatalog] = useState<SearchCatalog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    if (catalog || loading) return;

    setLoading(true);
    setError(false);

    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        fetch(`/api/products?locale=${locale}`),
        fetch(`/api/categories?locale=${locale}`),
      ]);

      if (!productsResponse.ok || !categoriesResponse.ok) {
        throw new Error("Failed to load search catalog");
      }

      const productsPayload = (await productsResponse.json()) as {
        data: Product[];
      };
      const categoriesPayload = (await categoriesResponse.json()) as {
        data: Category[];
      };

      setCatalog({
        products: productsPayload.data,
        categories: categoriesPayload.data,
      });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [catalog, loading, locale]);

  useEffect(() => {
    if (enabled) {
      void load();
    }
  }, [enabled, load]);

  useEffect(() => {
    setCatalog(null);
    setError(false);
  }, [locale]);

  return { catalog, loading, error, reload: load };
}
