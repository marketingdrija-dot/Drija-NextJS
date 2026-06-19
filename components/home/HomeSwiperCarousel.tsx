"use client";

import { useState, type ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { CarouselNavArrow } from "@/components/ui/CarouselNavArrow";
import { cn } from "@/lib/utils";

import "swiper/css";

import navStyles from "@/components/ui/CarouselNav.module.css";

export type HomeSwiperBreakpoint = {
  slidesPerView: number;
  spaceBetween?: number;
};

export type HomeSwiperCarouselProps = {
  slideKeys: string[];
  renderSlide: (index: number) => ReactNode;
  slideClassName?: string;
  swiperClassName?: string;
  viewportClassName?: string;
  wrapClassName?: string;
  loopMinSlides?: number;
  slidesPerView?: number;
  spaceBetween?: number;
  speed?: number;
  autoplayDelay?: number;
  breakpoints?: Record<number, HomeSwiperBreakpoint>;
  prevLabel: string;
  nextLabel: string;
  carouselLabel: string;
};

export function HomeSwiperCarousel({
  slideKeys,
  renderSlide,
  slideClassName,
  swiperClassName,
  viewportClassName,
  wrapClassName,
  loopMinSlides = 3,
  slidesPerView = 1,
  spaceBetween = 16,
  speed = 600,
  autoplayDelay = 4000,
  breakpoints,
  prevLabel,
  nextLabel,
  carouselLabel,
}: HomeSwiperCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const slideCount = slideKeys.length;

  if (slideCount === 0) return null;

  const shouldLoop = slideCount > loopMinSlides;

  return (
    <div className={cn(wrapClassName)} aria-label={carouselLabel}>
      <button
        type="button"
        className={cn(navStyles.nav, navStyles.navPrev)}
        aria-label={prevLabel}
        onClick={() => swiper?.slidePrev()}
      >
        <CarouselNavArrow direction="prev" className={navStyles.navIcon} />
      </button>

      <div className={viewportClassName}>
        <Swiper
          modules={[Autoplay]}
          className={swiperClassName}
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          loop={shouldLoop}
          speed={speed}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={breakpoints}
          onSwiper={setSwiper}
        >
          {slideKeys.map((key, index) => (
            <SwiperSlide key={key} className={slideClassName}>
              {renderSlide(index)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        type="button"
        className={cn(navStyles.nav, navStyles.navNext)}
        aria-label={nextLabel}
        onClick={() => swiper?.slideNext()}
      >
        <CarouselNavArrow direction="next" className={navStyles.navIcon} />
      </button>
    </div>
  );
}
