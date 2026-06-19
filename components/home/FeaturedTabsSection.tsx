"use client";

import Link from "next/link";
import { useState } from "react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { HomeSwiperCarousel } from "@/components/home/HomeSwiperCarousel";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import type { FeaturedSlide } from "@/types/featured-slide";

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

  if (slides.length === 0) return null;

  return (
    <HomeSwiperCarousel
      slideKeys={slides.map((slide) => slide.id)}
      slideClassName={styles.swiperSlide}
      swiperClassName={styles.swiper}
      viewportClassName={styles.sliderViewport}
      wrapClassName={styles.sliderWrap}
      loopMinSlides={3}
      slidesPerView={1}
      spaceBetween={16}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      }}
      prevLabel={prevLabel}
      nextLabel={nextLabel}
      carouselLabel={carouselLabel}
      renderSlide={(index) => (
        <Link href={href(slides[index].href)} className={styles.card}>
          <OptimizedImage
            src={slides[index].src}
            alt={slides[index].alt}
            fill
            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 90vw"
            className={styles.cardImage}
            loading={index < 3 ? "eager" : "lazy"}
            priority={index === 0}
          />
          {showTitle ? (
            <span className={styles.cardTitle}>{slides[index].title}</span>
          ) : null}
        </Link>
      )}
    />
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
