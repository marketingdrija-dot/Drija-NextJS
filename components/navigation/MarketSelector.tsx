"use client";

import { useId } from "react";
import { getMarkets } from "@/lib/markets/data";
import { useI18n } from "@/lib/i18n/context";
import { selectMarketCode, useMarketStore } from "@/stores/market-store";
import type { MarketCode } from "@/types/market";

import styles from "./MarketSelector.module.css";

const markets = getMarkets();

export function MarketSelector() {
  const { dict } = useI18n();
  const selectId = useId();
  const marketCode = useMarketStore(selectMarketCode);
  const setMarketCode = useMarketStore((state) => state.setMarketCode);

  return (
    <div className={styles.wrap}>
      <label htmlFor={selectId} className="sr-only">
        {dict.market.label}
      </label>
      <select
        id={selectId}
        value={marketCode}
        onChange={(event) => setMarketCode(event.target.value as MarketCode)}
        className={styles.select}
        aria-label={dict.market.label}
      >
        {markets.map((market) => (
          <option key={market.code} value={market.code}>
            {market.name}
            {market.type === "region" ? ` (${dict.market.region})` : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
