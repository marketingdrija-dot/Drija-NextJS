import featuredData from "@/data/featured-slides.json";
import type { Locale } from "@/lib/i18n/config";
import type { FeaturedSlide, FeaturedSlidesData } from "@/types/featured-slide";

const data = featuredData as FeaturedSlidesData;

function localizeSlide(slide: FeaturedSlide, locale: Locale): FeaturedSlide {
  if (locale !== "en" || !slide.translations?.en) return slide;
  const en = slide.translations.en;
  return {
    ...slide,
    title: en.title ?? slide.title,
    alt: en.alt ?? slide.alt,
  };
}

export function getFeaturedSlides(
  tab: keyof FeaturedSlidesData,
  locale: Locale,
): FeaturedSlide[] {
  return data[tab].map((slide) => localizeSlide(slide, locale));
}

export function getFeaturedSlidesData(locale: Locale) {
  return {
    categorias: getFeaturedSlides("categorias", locale),
    nuevo: getFeaturedSlides("nuevo", locale),
  };
}
