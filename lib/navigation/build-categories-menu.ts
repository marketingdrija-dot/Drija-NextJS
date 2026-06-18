import categoriesData from "@/data/categories.json";
import categoryPagesData from "@/data/category-pages.json";
import navMegaMenuData from "@/data/nav-megamenu.json";
import type { Locale } from "@/lib/i18n/config";
import { localizeCategory } from "@/lib/i18n/localize-content";
import { localizeSubcategory } from "@/lib/i18n/localize-subcategory";
import type { CategoryPageConfig } from "@/types/category-page";
import type { Category } from "@/types/category";
import type { MarketCode } from "@/types/market";

export type NavSubcategoryLink = {
  slug: string;
  name: string;
  href: string;
};

export type NavCategoryColumn = {
  slug: string;
  name: string;
  href: string;
  availableMarkets?: MarketCode[];
  subcategories: NavSubcategoryLink[];
};

export type NavFeaturedCard = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  image: { src: string; alt: string };
};

export type CategoriesMenuData = {
  columns: NavCategoryColumn[];
  featured: NavFeaturedCard;
  viewAllHref: string;
  viewAllLabel: string;
};

type NavMegaMenuConfig = {
  viewAllPath: string;
  featuredCard: {
    categorySlug: string;
    href?: string;
    translations: Record<
      Locale,
      { title: string; description: string; ctaLabel: string }
    >;
  };
};

const categoryPages = categoryPagesData as Record<string, CategoryPageConfig>;
const megaMenuConfig = navMegaMenuData as NavMegaMenuConfig;

export function buildCategoriesMenu(
  locale: Locale,
  href: (path: string) => string,
  viewAllLabel: string,
): CategoriesMenuData {
  const categories = (categoriesData as Category[])
    .slice()
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    .map((category) => localizeCategory(category, locale));

  const columns: NavCategoryColumn[] = categories.map((category) => {
    const pageConfig = categoryPages[category.slug];
    const subcategories = (pageConfig?.subcategories ?? [])
      .map((subcategory) => localizeSubcategory(subcategory, locale))
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

    return {
      slug: category.slug,
      name: category.name,
      href: href(`/categories/${category.slug}`),
      availableMarkets: category.availableMarkets,
      subcategories: subcategories.map((subcategory) => ({
        slug: subcategory.slug,
        name: subcategory.name,
        href: href(
          `/categories/${category.slug}#subcategoria-${subcategory.slug}`,
        ),
      })),
    };
  });

  const featuredCategory =
    categories.find(
      (category) => category.slug === megaMenuConfig.featuredCard.categorySlug,
    ) ?? categories[0];

  const featuredCopy =
    megaMenuConfig.featuredCard.translations[locale] ??
    megaMenuConfig.featuredCard.translations.es;

  const featuredHref = megaMenuConfig.featuredCard.href
    ? href(megaMenuConfig.featuredCard.href)
    : href(`/categories/${featuredCategory.slug}`);

  return {
    columns,
    featured: {
      title: featuredCopy.title,
      description: featuredCopy.description,
      ctaLabel: featuredCopy.ctaLabel,
      href: featuredHref,
      image: featuredCategory.image,
    },
    viewAllHref: href(megaMenuConfig.viewAllPath),
    viewAllLabel,
  };
}
