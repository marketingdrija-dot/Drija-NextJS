"use client";

import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import type { FeaturedSlide } from "@/types/featured-slide";

import "swiper/css";

import styles from "./FeaturedTabsSection.module.css";

type TabId = "categorias" | "nuevo";

type FeaturedTabsSectionProps = {
  categoriasSlides: FeaturedSlide[];
  nuevoSlides: FeaturedSlide[];
  categoriesLabel: string;
  newArrivalsLabel: string;
  prevLabel: string;
  nextLabel: string;
  carouselLabel: string;
};

function NavArrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      className={styles.navIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      {direction === "prev" ? (
        <path d="M15 6l-6 6 6 6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

function FeaturedSwiper({
  slides,
  showTitle,
  prevLabel,
  nextLabel,
  carouselLabel,
}: {
  slides: FeaturedSlide[];
  showTitle: boolean;
  prevLabel: string;
  nextLabel: string;
  carouselLabel: string;
}) {
  const { href } = useI18n();
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);

  if (slides.length === 0) return null;

  return (
    <div className={styles.sliderWrap} aria-label={carouselLabel}>
      <button
        type="button"
        className={cn(styles.nav, styles.navPrev)}
        aria-label={prevLabel}
        onClick={() => swiper?.slidePrev()}
      >
        <NavArrow direction="prev" />
      </button>

      <div className={styles.sliderViewport}>
        <Swiper
          modules={[Autoplay]}
          className={styles.swiper}
          slidesPerView={1}
          spaceBetween={24}
          loop={slides.length > 3}
          speed={600}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          onSwiper={setSwiper}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id} className={styles.swiperSlide}>
              <Link href={href(slide.href)} className={styles.card}>
                <OptimizedImage
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                  className={styles.cardImage}
                  loading={index < 3 ? "eager" : "lazy"}
                  priority={index === 0}
                />
                {showTitle ? (
                  <span className={styles.cardTitle}>{slide.title}</span>
                ) : null}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        type="button"
        className={cn(styles.nav, styles.navNext)}
        aria-label={nextLabel}
        onClick={() => swiper?.slideNext()}
      >
        <NavArrow direction="next" />
      </button>
    </div>
  );
}

export function FeaturedTabsSection({
  categoriasSlides,
  nuevoSlides,
  categoriesLabel,
  newArrivalsLabel,
  prevLabel,
  nextLabel,
  carouselLabel,
}: FeaturedTabsSectionProps) {
  const [activeTab, setActiveTab] = useState<TabId>("categorias");

  const tabs: { id: TabId; label: string }[] = [
    { id: "categorias", label: categoriesLabel },
    { id: "nuevo", label: newArrivalsLabel },
  ];

  const activeSlides =
    activeTab === "categorias" ? categoriasSlides : nuevoSlides;

  return (
    <section className={styles.section} aria-label={carouselLabel}>
      <div className={styles.tabsWrap}>
        <div className={styles.tabs} role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={cn(styles.tab, activeTab === tab.id && styles.tabActive)}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.sliderShell} role="tabpanel">
        <FeaturedSwiper
          key={activeTab}
          slides={activeSlides}
          showTitle={activeTab === "categorias"}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
          carouselLabel={carouselLabel}
        />
      </div>
    </section>
  );
}
