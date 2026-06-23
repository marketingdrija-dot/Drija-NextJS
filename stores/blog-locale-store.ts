"use client";

import { create } from "zustand";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

type BlogLocaleState = {
  displayLocale: Locale;
  setDisplayLocale: (locale: Locale) => void;
};

export const useBlogLocaleStore = create<BlogLocaleState>((set) => ({
  displayLocale: defaultLocale,
  setDisplayLocale: (locale) => set({ displayLocale: locale }),
}));
