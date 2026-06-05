/** Market / region codes used across JSON data and Sanity documents */
export type MarketCode =
  | "CAR"
  | "CR"
  | "SV"
  | "GT"
  | "HN"
  | "NI"
  | "PA"
  | "DO"
  | "VE"
  | "MX"
  | "ALL";

export type MarketType = "country" | "region";

export type Market = {
  id: string;
  name: string;
  code: MarketCode;
  type: MarketType;
  isDefault?: boolean;
  /** Display order in the selector */
  order?: number;
};

/** Shared shape for catalog entities that support market availability */
export type MarketAvailability = {
  availableMarkets: MarketCode[];
};
