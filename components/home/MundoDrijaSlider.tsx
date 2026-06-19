"use client";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { HomeSwiperCarousel } from "@/components/home/HomeSwiperCarousel";
import type { MundoDrijaSlide } from "@/types/mundo-drija";

import styles from "./MundoDrijaSlider.module.css";

type MundoDrijaSliderProps = {
  title: string;
  slides: MundoDrijaSlide[];
  prevLabel: string;
  nextLabel: string;
  carouselLabel: string;
};

export function MundoDrijaSlider({
  title,
  slides,
  prevLabel,
  nextLabel,
  carouselLabel,
}: MundoDrijaSliderProps) {
  if (slides.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="mundo-drija-title">
      <div className={styles.header}>
        <h2 id="mundo-drija-title" className={styles.title}>
          {title}
        </h2>
        <div className={styles.titleRule} aria-hidden="true" />
      </div>

      <div className={styles.sliderShell}>
        <HomeSwiperCarousel
          slideKeys={slides.map((slide) => slide.src)}
          slideClassName={styles.swiperSlide}
          swiperClassName={styles.swiper}
          viewportClassName={styles.sliderViewport}
          wrapClassName={styles.sliderWrap}
          loopMinSlides={1}
          slidesPerView={1}
          spaceBetween={16}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
          carouselLabel={carouselLabel}
          renderSlide={(index) => (
            <div className={styles.slide}>
              <OptimizedImage
                src={slides[index].src}
                alt={slides[index].alt}
                fill
                sizes="(min-width: 1024px) 80vw, 90vw"
                className={styles.slideImage}
                loading={index === 0 ? "eager" : "lazy"}
                priority={index === 0}
              />
            </div>
          )}
        />
      </div>
    </section>
  );
}
