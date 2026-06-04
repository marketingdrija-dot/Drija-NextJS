"use client";

import {
  InfiniteCarousel,
  InfiniteCarouselSlide,
} from "@/components/ui/InfiniteCarousel";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import {
  useExtendedSlides,
  useInfiniteCarousel,
} from "@/hooks/useInfiniteCarousel";
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
  const count = slides.length;
  const extendedSlides = useExtendedSlides(slides);
  const carousel = useInfiniteCarousel(count);

  if (count === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="mundo-drija-title">
      <div className={styles.header}>
        <h2 id="mundo-drija-title" className={styles.title}>
          {title}
        </h2>
        <div className={styles.titleRule} aria-hidden="true" />
      </div>

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
            key={`${slide.src}-${index}`}
            width={carousel.slideWidth}
            hidden={
              carousel.canLoop
                ? index !== carousel.trackIndex
                : index !== carousel.realIndex
            }
          >
            <OptimizedImage
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(min-width: 1024px) 80vw, 90vw"
              className="object-contain object-center"
              priority={index === (carousel.canLoop ? 1 : 0)}
            />
          </InfiniteCarouselSlide>
        ))}
      </InfiniteCarousel>
    </section>
  );
}
