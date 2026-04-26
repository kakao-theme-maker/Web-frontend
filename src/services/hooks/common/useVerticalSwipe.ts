import { useState, useRef, useEffect, useCallback } from 'react';

const SCROLL_EDGE_TOLERANCE = 1;

function getTargetElement(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Node)) return null;
  if (target instanceof HTMLElement) return target;

  return target.parentElement;
}

function isScrollableY(node: HTMLElement): boolean {
  const style = getComputedStyle(node);
  return /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight;
}

function getMaxScrollTop(node: HTMLElement): number {
  return Math.max(0, node.scrollHeight - node.clientHeight);
}

function findScrollableAncestorWithin(
  node: HTMLElement | null,
  boundary: HTMLElement | null,
): HTMLElement | null {
  if (!node || !boundary || !boundary.contains(node)) return null;

  let current: HTMLElement | null = node;
  while (current) {
    if (isScrollableY(current)) return current;
    if (current === boundary) break;
    current = current.parentElement;
  }

  return null;
}

export function useVerticalSwipe(itemsLength: number, transitionDuration: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ currentIndex: 0, isAnimating: false, itemsLength });
  const touchStartY = useRef(0);
  const touchStartScrollTop = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    stateRef.current.itemsLength = itemsLength;
  }, [itemsLength]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      if (stateRef.current.isAnimating) return;

      const next = Math.max(0, Math.min(idx, stateRef.current.itemsLength - 1));
      if (next === stateRef.current.currentIndex) return;

      const nextSlide = containerRef.current?.children.item(next);
      if (nextSlide instanceof HTMLElement) {
        nextSlide.scrollTop = 0;
      }

      stateRef.current.isAnimating = true;
      stateRef.current.currentIndex = next;
      setCurrentIndex(next);

      if (timerRef.current !== null) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        stateRef.current.isAnimating = false;
        timerRef.current = null;
      }, transitionDuration);
    },
    [transitionDuration],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const target = getTargetElement(e.target);
      const scrollEl = findScrollableAncestorWithin(target, container);

      if (scrollEl) {
        const maxScroll = getMaxScrollTop(scrollEl);
        const atBottom = scrollEl.scrollTop >= maxScroll - SCROLL_EDGE_TOLERANCE;
        const atTop = scrollEl.scrollTop <= SCROLL_EDGE_TOLERANCE;

        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && !atTop) return;
      }

      e.preventDefault();
      if (e.deltaY > 0) goTo(stateRef.current.currentIndex + 1);
      else goTo(stateRef.current.currentIndex - 1);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [goTo]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;

    const target = getTargetElement(e.target);
    const scrollEl = findScrollableAncestorWithin(target, containerRef.current);
    touchStartScrollTop.current = scrollEl?.scrollTop ?? 0;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) <= 50) return;

    const target = getTargetElement(e.target);
    const scrollEl = findScrollableAncestorWithin(target, containerRef.current);

    if (scrollEl) {
      const scrollChange = Math.abs(scrollEl.scrollTop - touchStartScrollTop.current);
      if (scrollChange > 10) return;

      const maxScroll = getMaxScrollTop(scrollEl);
      const atBottom = scrollEl.scrollTop >= maxScroll - SCROLL_EDGE_TOLERANCE;
      const atTop = scrollEl.scrollTop <= SCROLL_EDGE_TOLERANCE;

      if (delta > 0 && !atBottom) return;
      if (delta < 0 && !atTop) return;
    }

    if (delta > 0) goTo(stateRef.current.currentIndex + 1);
    else goTo(stateRef.current.currentIndex - 1);
  };

  return { currentIndex, containerRef, handleTouchStart, handleTouchEnd };
}
