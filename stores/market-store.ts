"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  DEFAULT_MARKET_CODE,
  MARKET_STORAGE_KEY,
} from "@/lib/markets/constants";
import { getDefaultMarketCode, isValidMarketCode } from "@/lib/markets/data";
import type { MarketCode } from "@/types/market";

type MarketState = {
  marketCode: MarketCode;
  hasHydrated: boolean;
  setMarketCode: (code: MarketCode) => void;
  setHasHydrated: (value: boolean) => void;
};

export const useMarketStore = create<MarketState>()(
  persist(
    (set) => ({
      marketCode: getDefaultMarketCode() ?? DEFAULT_MARKET_CODE,
      hasHydrated: false,
      setMarketCode: (code) => set({ marketCode: code }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: MARKET_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ marketCode: state.marketCode }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      merge: (persisted, current) => {
        const saved = persisted as Partial<MarketState> | undefined;
        const code = saved?.marketCode;

        return {
          ...current,
          marketCode:
            code && isValidMarketCode(code)
              ? code
              : getDefaultMarketCode() ?? DEFAULT_MARKET_CODE,
        };
      },
    },
  ),
);

export function selectMarketCode(state: MarketState): MarketCode {
  return state.marketCode;
}
