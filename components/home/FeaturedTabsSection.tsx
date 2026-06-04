"use client";

import Link from "next/link";
import { useState } from "react";
import {
  InfiniteCarousel,
  InfiniteCarouselSlide,
} from "@/components/ui/InfiniteCarousel";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import {
  useExtendedSlides,
  useInfiniteCarousel,
} from "@/hooks/useInfiniteCarousel";
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

function FeaturedCarousel({
  slides,
  prevLabel,
  nextLabel,
  carouselLabel,
}: {
  slides: FeaturedSlide[];
  prevLabel: string;
  nextLabel: string;
  carouselLabel: string;
}) {
  const { href } = useI18n();
  const count = slides.length;
  const extendedSlides = useExtendedSlides(slides);
  const carousel = useInfiniteCarousel(count);

  if (count === 0) return null;

  return (
    <InfiniteCarousel
      slideCount={count}
      trackIndex={carousel.trackIndex}
      transitionEnabled={carousel.transitionEnabled}
      slideWidth={carousel.slideWidth}
      offset={carousel.offset}
      viewportRef={carousel.viewportRef}
      onTransitionEnd={carousel.handleTransitionEnd}
      onMouseEnter={() => carousel.setPaused(true)}
      onMouseLeave={() => carousel.setPaused(false)}
      prev={carousel.prev}
      next={carousel.next}
      canLoop={carousel.canLoop}
      carouselLabel={carouselLabel}
      prevLabel={prevLabel}
      nextLabel={nextLabel}
    >
      {extendedSlides.map((slide, index) => (
        <InfiniteCarouselSlide
          key={`${slide.id}-${index}`}
          width={carousel.slideWidth}
          hidden={carousel.canLoop ? index !== carousel.trackIndex : index !== 0}
        >
          <Link href={href(slide.href)} className={styles.card}>
            <OptimizedImage
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(min-width: 1024px) 80vw, 90vw"
              className={styles.cardImage}
              priority={index === (carousel.canLoop ? 1 : 0)}
            />
            <span className={styles.cardTitle}>{slide.title}</span>
          </Link>
        </InfiniteCarouselSlide>
      ))}
    </InfiniteCarousel>
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

      <div className={styles.sliderArea} role="tabpanel">
        <FeaturedCarousel
          key={activeTab}
          slides={activeSlides}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
          carouselLabel={carouselLabel}
        />
      </div>
    </section>
  );
}
