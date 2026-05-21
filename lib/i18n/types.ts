import type { Locale } from "@/lib/i18n/config";

export type Dictionary = {
  meta: {
    siteDescription: string;
  };
  locale: {
    switchTo: string;
    current: string;
  };
  nav: {
    home: string;
    products: string;
    blog: string;
    whereToBuy: string;
    support: string;
    contact: string;
  };
  home: {
    categories: string;
    categoriesTitle: string;
    viewAll: string;
    newArrivals: string;
    featuredTitle: string;
    worldDrija: string;
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
    inquire: string;
    breadcrumbProducts: string;
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
    name: string;
    email: string;
    country: string;
    countryPlaceholder: string;
    phone: string;
    message: string;
    terms: string;
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
    tagline: string;
    explore: string;
    needHelp: string;
    faq: string;
    technicalService: string;
    rights: string;
    legal: string;
  };
  common: {
    openMenu: string;
    homeLabel: string;
    notFoundTitle: string;
    notFoundDescription: string;
    backHome: string;
  };
};

export type I18nContextValue = {
  locale: Locale;
  dict: Dictionary;
  href: (path: string) => string;
};
