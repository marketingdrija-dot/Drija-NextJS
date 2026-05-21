import type { ContentTranslations } from "@/types/content-i18n";

export type Retailer = {
  id: string;
  name: string;
  url: string;
  logo?: string;
};

export type CountryRetailersTranslations = {
  country?: string;
};

export type CountryRetailers = {
  country: string;
  countryCode: string;
  retailers: Retailer[];
  technicalServiceUrl?: string;
  translations?: ContentTranslations<CountryRetailersTranslations>;
};
