"use client";

import { useMemo } from "react";
import { buildCategoriesMenu } from "@/lib/navigation/build-categories-menu";
import { isAvailableInMarket } from "@/lib/markets/filter";
import { useI18n } from "@/lib/i18n/context";
import { selectMarketCode, useMarketStore } from "@/stores/market-store";

export function useCategoriesMenu() {
  const { locale, href, dict } = useI18n();
  const marketCode = useMarketStore(selectMarketCode);
  const hasHydrated = useMarketStore((state) => state.hasHydrated);

  const menu = useMemo(
    () => buildCategoriesMenu(locale, href, dict.nav.viewAllCategories),
    [dict.nav.viewAllCategories, href, locale],
  );

  const columns = useMemo(() => {
    if (!hasHydrated) return menu.columns;

    return menu.columns.filter((column) =>
      isAvailableInMarket(column.availableMarkets, marketCode),
    );
  }, [hasHydrated, marketCode, menu.columns]);

  return {
    ...menu,
    columns,
  };
}
