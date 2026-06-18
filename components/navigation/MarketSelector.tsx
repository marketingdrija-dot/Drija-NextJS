"use client";

import Image from "next/image";
import { useId } from "react";
import { getMarkets } from "@/lib/markets/data";
import { getMarketDisplayName } from "@/lib/markets/display-name";
import { getMarketFlagSrc } from "@/lib/markets/flags";
import { useI18n } from "@/lib/i18n/context";
import { useDropdownMenu } from "@/hooks/useDropdownMenu";
import { selectMarketCode, useMarketStore } from "@/stores/market-store";
import type { MarketCode } from "@/types/market";
import { cn } from "@/lib/utils";

import styles from "./HeaderDropdown.module.css";

const markets = getMarkets();

type MarketSelectorProps = {
  menuAlign?: "start" | "end";
};

export function MarketSelector({ menuAlign = "start" }: MarketSelectorProps) {
  const { dict, locale } = useI18n();
  const listboxId = useId();
  const { rootRef, open, toggle, close } = useDropdownMenu();
  const marketCode = useMarketStore(selectMarketCode);
  const setMarketCode = useMarketStore((state) => state.setMarketCode);

  const selectedName = getMarketDisplayName(marketCode, locale);
  const selectedFlag = getMarketFlagSrc(marketCode);

  const handleSelect = (code: MarketCode) => {
    setMarketCode(code);
    close();
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label={`${dict.market.label}: ${selectedName}`}
        onClick={toggle}
      >
        <Image
          src={selectedFlag}
          alt=""
          width={32}
          height={20}
          className={styles.flag}
          aria-hidden
        />
        <span
          className={cn(styles.chevron, open && styles.chevronOpen)}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          id={listboxId}
          className={cn(styles.menu, menuAlign === "end" && styles.menuEnd)}
          role="listbox"
          aria-label={dict.market.label}
        >
          {markets.map((market) => {
            const isSelected = market.code === marketCode;
            const name = getMarketDisplayName(market.code, locale);

            return (
              <button
                key={market.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={cn(styles.option, isSelected && styles.optionSelected)}
                onClick={() => handleSelect(market.code)}
              >
                <Image
                  src={getMarketFlagSrc(market.code)}
                  alt=""
                  width={32}
                  height={20}
                  className={styles.flag}
                  aria-hidden
                />
                <span className={styles.optionLabel}>{name}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
