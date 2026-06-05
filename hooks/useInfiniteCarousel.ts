"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const CAROUSEL_AUTOPLAY_MS = 4000;
export const CAROUSEL_GAP_PX = 20;
export const CAROUSEL_FEATURED_GAP_PX = 24;
export const CAROUSEL_SLIDE_RATIO = 0.8;
/** ~1/3 del ancho del slide principal (Mundo DRIJA) */
export const CAROUSEL_COMPACT_SLIDE_RATIO = CAROUSEL_SLIDE_RATIO / 3;
export const CAROUSEL_TRANSITION_MS = 600;

type UseInfiniteCarouselOptions = {
  slideRatio?: number;
  gapPx?: number;
  /** Calcula el ancho de cada slide para mostrar N tarjetas a la vez */
  slidesPerView?: number;
};

export function useInfiniteCarousel(
  slideCount: number,
  options: UseInfiniteCarouselOptions = {},
) {
  const slideRatio = options.slideRatio ?? CAROUSEL_SLIDE_RATIO;
  const gapPx = options.gapPx ?? CAROUSEL_GAP_PX;
  const slidesPerView = options.slidesPerView;
  const count = slideCount;
  const canLoop = count > 1;
  const maxTrackIndex = count + 1;

  const [trackIndex, setTrackIndex] = useState(canLoop ? 1 : 0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [paused, setPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  const slideWidth =
    containerWidth > 0
      ? slidesPerView != null
        ? (containerWidth - gapPx * (slidesPerView - 1)) / slidesPerView
        : containerWidth * slideRatio
      : undefined;
  const step = slideWidth ? slideWidth + gapPx : 0;
  const offset =
    slideWidth && containerWidth > 0
      ? slidesPerView != null
        ? trackIndex * step
        : trackIndex * step - (containerWidth - slideWidth) / 2
      : 0;

  const realIndex = canLoop
    ? trackIndex === 0
      ? count - 1
      : trackIndex === count + 1
        ? 0
        : trackIndex - 1
    : 0;

  const jumpWithoutAnimation = useCallback((index: number) => {
    setTransitionEnabled(false);
    setTrackIndex(index);
  }, []);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
      if (!canLoop || !transitionEnabled) return;

      if (trackIndex <= 0) {
        jumpWithoutAnimation(count);
      } else if (trackIndex >= count + 1) {
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

  const prev = useCallback(() => {
    if (!canLoop || trackIndex <= 0) return;
    setTransitionEnabled(true);
    setTrackIndex((i) => i - 1);
  }, [canLoop, trackIndex]);

  const next = useCallback(() => {
    if (!canLoop || trackIndex >= maxTrackIndex) return;
    setTransitionEnabled(true);
    setTrackIndex((i) => Math.min(i + 1, maxTrackIndex));
  }, [canLoop, trackIndex, maxTrackIndex]);

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
    if (!canLoop || paused || trackIndex >= maxTrackIndex) return;

    const timer = window.setTimeout(() => {
      next();
    }, CAROUSEL_AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [trackIndex, canLoop, paused, maxTrackIndex, next]);

  const resetToStart = useCallback(() => {
    setTransitionEnabled(false);
    setTrackIndex(canLoop ? 1 : 0);
    requestAnimationFrame(() => setTransitionEnabled(true));
  }, [canLoop]);

  return {
    canLoop,
    trackIndex,
    transitionEnabled,
    paused,
    setPaused,
    viewportRef,
    slideWidth,
    slideRatio,
    gapPx,
    slidesPerView,
    offset,
    realIndex,
    prev,
    next,
    handleTransitionEnd,
    resetToStart,
  };
}

export function useSlidesPerView(
  config: { base?: number; sm?: number; lg?: number } = {},
) {
  const { base = 1, sm = 2, lg = 3 } = config;
  const [slidesPerView, setSlidesPerView] = useState(base);

  useEffect(() => {
    const mqlSm = window.matchMedia("(min-width: 640px)");
    const mqlLg = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      if (mqlLg.matches) setSlidesPerView(lg);
      else if (mqlSm.matches) setSlidesPerView(sm);
      else setSlidesPerView(base);
    };

    update();
    mqlSm.addEventListener("change", update);
    mqlLg.addEventListener("change", update);
    return () => {
      mqlSm.removeEventListener("change", update);
      mqlLg.removeEventListener("change", update);
    };
  }, [base, sm, lg]);

  return slidesPerView;
}

export function useExtendedSlides<T>(slides: T[]) {
  const count = slides.length;
  const canLoop = count > 1;

  return useMemo(() => {
    if (!canLoop) return slides;
    return [slides[count - 1], ...slides, slides[0]];
  }, [slides, count, canLoop]);
}
