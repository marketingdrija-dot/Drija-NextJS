export type FeaturedSlide = {
  id: string;
  src: string;
  alt: string;
  title: string;
  href: string;
  translations?: {
    en: {
      title: string;
      alt?: string;
    };
  };
};

export type FeaturedSlidesData = {
  categorias: FeaturedSlide[];
  nuevo: FeaturedSlide[];
};
