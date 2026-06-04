"use client";

import { cn } from "@/lib/utils";
import {
  CAROUSEL_GAP_PX,
  CAROUSEL_SLIDE_RATIO,
  CAROUSEL_TRANSITION_MS,
  useInfiniteCarousel,
} from "@/hooks/useInfiniteCarousel";

import styles from "./InfiniteCarousel.module.css";

type InfiniteCarouselProps = {
  slideCount: number;
  trackIndex: number;
  transitionEnabled: boolean;
  slideWidth: number | undefined;
  offset: number;
  viewportRef: React.RefObject<HTMLDivElement | null>;
  onTransitionEnd: (e: React.TransitionEvent<HTMLDivElement>) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  prev: () => void;
  next: () => void;
  canLoop: boolean;
  carouselLabel: string;
  prevLabel: string;
  nextLabel: string;
  slideRatio?: number;
  gapPx?: number;
  size?: "default" | "compact";
  children: React.ReactNode;
};

export function InfiniteCarousel({
  slideCount,
  trackIndex,
  transitionEnabled,
  slideWidth,
  offset,
  viewportRef,
  onTransitionEnd,
  onMouseEnter,
  onMouseLeave,
  prev,
  next,
  canLoop,
  carouselLabel,
  prevLabel,
  nextLabel,
  slideRatio = CAROUSEL_SLIDE_RATIO,
  gapPx = CAROUSEL_GAP_PX,
  size = "default",
  children,
}: InfiniteCarouselProps) {
  if (slideCount === 0) return null;

  const ratioPercent = slideRatio * 100;
  const centerInsetPercent = (100 - ratioPercent) / 2;

  return (
    <div
      className={styles.wrap}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={viewportRef}
        className={styles.viewport}
        role="region"
        aria-roledescription="carousel"
        aria-label={carouselLabel}
      >
        <div
          className={cn(styles.track, !transitionEnabled && styles.trackInstant)}
          style={{
            gap: gapPx,
            transform: slideWidth
              ? `translateX(-${offset}px)`
              : `translateX(calc(-${trackIndex * ratioPercent}% - ${trackIndex * gapPx}px + ${centerInsetPercent}%))`,
            transitionDuration: transitionEnabled
              ? `${CAROUSEL_TRANSITION_MS}ms`
              : "0ms",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {children}
        </div>
      </div>

      {canLoop && (
        <>
          <button
            type="button"
            onClick={prev}
            className={cn(
              styles.nav,
              size === "compact" && styles.navCompact,
              styles.navPrev,
            )}
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
              <path
                d="M15 6l-6 6 6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            className={cn(
              styles.nav,
              size === "compact" && styles.navCompact,
              styles.navNext,
            )}
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
              <path
                d="M9 6l6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

export function InfiniteCarouselSlide({
  width,
  slideRatio = CAROUSEL_SLIDE_RATIO,
  className,
  slideClassName,
  children,
  hidden,
}: {
  width: number | string | undefined;
  slideRatio?: number;
  className?: string;
  /** Reemplaza el estilo base del slide cuando se necesita layout distinto */
  slideClassName?: string;
  children: React.ReactNode;
  hidden?: boolean;
}) {
  return (
    <div
      className={slideClassName ?? cn(styles.slide, className)}
      style={{
        width: width ?? `${slideRatio * 100}%`,
      }}
      aria-hidden={hidden}
    >
      {children}
    </div>
  );
}
