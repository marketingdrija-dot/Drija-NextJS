"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { cn } from "@/lib/utils";
import type { MundoDrijaSlide } from "@/types/mundo-drija";

import styles from "./MundoDrijaSlider.module.css";

const AUTOPLAY_MS = 5500;
const SLIDE_RATIO = 0.8;
const GAP_PX = 20;
const TRANSITION_MS = 600;

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
  const canLoop = count > 1;

  const extendedSlides = useMemo(() => {
    if (!canLoop) return slides;
    return [slides[count - 1], ...slides, slides[0]];
  }, [slides, count, canLoop]);

  const [trackIndex, setTrackIndex] = useState(canLoop ? 1 : 0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [paused, setPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const realIndex = canLoop
    ? trackIndex === 0
      ? count - 1
      : trackIndex === count + 1
        ? 0
        : trackIndex - 1
    : 0;

  const slideWidth =
    containerWidth > 0 ? containerWidth * SLIDE_RATIO : undefined;
  const step = slideWidth ? slideWidth + GAP_PX : 0;
  const offset =
    slideWidth && containerWidth > 0
      ? trackIndex * step - (containerWidth - slideWidth) / 2
      : 0;

  const jumpWithoutAnimation = useCallback((index: number) => {
    setTransitionEnabled(false);
    setTrackIndex(index);
  }, []);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
      if (!canLoop || !transitionEnabled) return;

      if (trackIndex === 0) {
        jumpWithoutAnimation(count);
      } else if (trackIndex === count + 1) {
        jumpWithoutAnimation(1);
      }
    },
    [canLoop, transitionEnabled, trackIndex, count, jumpWithoutAnimation],
  );

  useLayoutEffect(() => {
    if (transitionEnabled) return;
    const frame = requestAnimationFrame(() => {
      setTransitionEnabled(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [trackIndex, transitionEnabled]);

  const next = useCallback(() => {
    if (count === 0) return;
    if (!canLoop) return;
    setTransitionEnabled(true);
    setTrackIndex((i) => i + 1);
  }, [count, canLoop]);

  const prev = useCallback(() => {
    if (count === 0) return;
    if (!canLoop) return;
    setTransitionEnabled(true);
    setTrackIndex((i) => i - 1);
  }, [count, canLoop]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const updateWidth = () => setContainerWidth(el.clientWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canLoop || paused) return;
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [canLoop, paused, next]);

  if (count === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="mundo-drija-title">
      <div className={styles.header}>
        <h2 id="mundo-drija-title" className={styles.title}>
          {title}
        </h2>
        <div className={styles.titleRule} aria-hidden="true" />
      </div>

      <div
        className={styles.sliderWrap}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={viewportRef}
          className={styles.viewport}
          role="region"
          aria-roledescription="carousel"
          aria-label={carouselLabel}
        >
          <div
            ref={trackRef}
            className={cn(
              styles.track,
              !transitionEnabled && styles.trackInstant,
            )}
            style={{
              gap: GAP_PX,
              transform: slideWidth
                ? `translateX(-${offset}px)`
                : `translateX(calc(-${trackIndex * 80}% - ${trackIndex * GAP_PX}px + 10%))`,
              transitionDuration: transitionEnabled
                ? `${TRANSITION_MS}ms`
                : "0ms",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSlides.map((slide, index) => (
              <div
                key={`${slide.src}-${index}`}
                className={styles.slide}
                style={{
                  width: slideWidth ?? `${SLIDE_RATIO * 100}%`,
                }}
                aria-hidden={
                  canLoop
                    ? index !== trackIndex
                    : index !== realIndex
                }
              >
                <OptimizedImage
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 1024px) 80vw, 90vw"
                  className="object-contain object-center"
                  priority={index === (canLoop ? 1 : 0)}
                />
              </div>
            ))}
          </div>
        </div>

        {canLoop && (
          <>
            <button
              type="button"
              onClick={prev}
              className={cn(styles.nav, styles.navPrev)}
              aria-label={prevLabel}
            >
              <svg
                className={styles.navIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              className={cn(styles.nav, styles.navNext)}
              aria-label={nextLabel}
            >
              <svg
                className={styles.navIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
