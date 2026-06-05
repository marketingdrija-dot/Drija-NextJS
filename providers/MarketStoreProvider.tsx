"use client";

import { useEffect } from "react";
import { useMarketStore } from "@/stores/market-store";

/**
 * Ensures persisted market selection is loaded from localStorage on the client
 * before catalog components rely on it.
 */
export function MarketStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setHasHydrated = useMarketStore((state) => state.setHasHydrated);

  useEffect(() => {
    useMarketStore.persist.rehydrate();
    setHasHydrated(true);
  }, [setHasHydrated]);

  return children;
}
