import type { Locale } from "@/lib/i18n/config";

export type Dictionary = {
  meta: {
    siteDescription: string;
  };
  locale: {
    switchTo: string;
    current: string;
  };
  market: {
    label: string;
    title: string;
    disclaimer: string;
    region: string;
    emptyCatalog: string;
  };
  nav: {
    home: string;
    products: string;
    viewAllCategories: string;
    blog: string;
    whereToBuy: string;
    support: string;
    contact: string;
  };
  search: {
    openLabel: string;
    closeLabel: string;
    placeholder: string;
    noResults: string;
    loading: string;
    error: string;
    resultsLabel: string;
  };
  home: {
    categories: string;
    categoriesTitle: string;
    viewCategoryAll: string;
    viewAll: string;
    newArrivals: string;
    featuredTitle: string;
    worldDrija: string;
    mundoDrijaPrev: string;
    mundoDrijaNext: string;
    mundoDrijaCarousel: string;
    featuredPrev: string;
    featuredNext: string;
    featuredCarousel: string;
    blogTitle: string;
    viewBlog: string;
    contactUs: string;
    heroTagline: string;
    heroTitle: string;
    heroDescription: string;
    heroCtaProducts: string;
    heroCtaWhereToBuy: string;
    heroAside: string;
  };
  categoryPage: {
    viewProduct: string;
    catalogTitle: string;
    viewOnline: string;
    downloadCatalog: string;
    categoriesTab: string;
    newArrivalsTab: string;
    otherProducts: string;
  };
  products: {
    pageTitle: string;
    pageDescription: string;
    viewCatalog: string;
    productsCount: string;
    comingSoon: string;
    newBadge: string;
    viewDetail: string;
    sku: string;
    specs: string;
    whereToBuy: string;
    buy: string;
    inquire: string;
    breadcrumbProducts: string;
    relatedProducts: string;
    prevImage: string;
    nextImage: string;
    technicalSpecs: string;
  };
  blog: {
    pageTitle: string;
    pageDescription: string;
    backToBlog: string;
  };
  retailers: {
    pageTitle: string;
    pageDescription: string;
    sidebarTitle: string;
    visitWebsite: string;
    technicalService: string;
    expandCountry: string;
    collapseCountry: string;
    noStores: string;
  };
  support: {
    pageTitle: string;
    pageDescription: string;
    manuals: string;
    technicalService: string;
    catalogs: string;
    warranties: string;
    needHelp: string;
    faq: string;
  };
  contact: {
    pageTitle: string;
    pageDescription: string;
    title: string;
    subtitle: string;
    name: string;
    email: string;
    country: string;
    countryPlaceholder: string;
    phone: string;
    message: string;
    termsAccept: string;
    termsLink: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    needHelp: string;
    faq: string;
    technicalService: string;
    catalogs: string;
  };
  legal: {
    pageTitle: string;
    pageDescription: string;
    intro: string;
    privacy: string;
  };
  footer: {
    categories: string;
    catalogs: string;
    workWithUs: string;
    socialNetworks: string;
    infoNav: string;
    faq: string;
    legal: string;
  };
  common: {
    openMenu: string;
    homeLabel: string;
    notFoundTitle: string;
    notFoundDescription: string;
    backHome: string;
  };
  catalogDownload: {
    line1: string;
    line2: string;
    ariaLabel: string;
  };
};

export type I18nContextValue = {
  locale: Locale;
  dict: Dictionary;
  href: (path: string) => string;
};
