"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/types/hero";

import "swiper/css";

import styles from "./HeroSlider.module.css";

type HeroSliderProps = {
  slides: HeroSlide[];
};

export function HeroSlider({ slides }: HeroSliderProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = slides.length;
  const canLoop = count > 1;

  if (count === 0) return null;

  return (
    <div
      className="hero-slider relative w-full overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero"
    >
      <Swiper
        modules={[Autoplay]}
        className={styles.swiper}
        slidesPerView={1}
        spaceBetween={0}
        loop={canLoop}
        speed={700}
        allowTouchMove={canLoop}
        simulateTouch={canLoop}
        grabCursor={canLoop}
        followFinger
        threshold={8}
        touchRatio={1}
        longSwipesRatio={0.25}
        shortSwipes
        resistance
        resistanceRatio={0.85}
        autoplay={
          canLoop
            ? {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        onSwiper={setSwiper}
        onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.src} className={styles.swiperSlide}>
            <div className={styles.slide}>
              <OptimizedImage
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className={cn("object-cover object-center", styles.slideImage)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {canLoop ? (
        <>
          <button
            type="button"
            onClick={() => swiper?.slidePrev()}
            className={cn(styles.nav, styles.navPrev)}
            aria-label="Imagen anterior"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => swiper?.slideNext()}
            className={cn(styles.nav, styles.navNext)}
            aria-label="Siguiente imagen"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          <div className={styles.pagination}>
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() =>
                  canLoop ? swiper?.slideToLoop(index) : swiper?.slideTo(index)
                }
                className={cn(
                  styles.dot,
                  index === activeIndex ? styles.dotActive : styles.dotInactive,
                )}
                aria-label={`Ir a imagen ${index + 1}`}
                aria-current={index === activeIndex}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
