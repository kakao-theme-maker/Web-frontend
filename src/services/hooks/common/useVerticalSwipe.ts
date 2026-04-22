import { useState, useRef, useEffect, useCallback } from 'react';

function findScrollableAncestor(node: HTMLElement | null): HTMLElement | null {
  let n: HTMLElement | null = node?.parentElement ?? null;
  while (n) {
    const style = getComputedStyle(n);
    if (/(auto|scroll)/.test(style.overflowY) && n.scrollHeight > n.clientHeight) {
      return n;
    }
    n = n.parentElement;
  }
  return null;
}

export function useVerticalSwipe(boardsLength: number, transitionDuration: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ currentIndex: 0, isAnimating: false, boardsLength });
  const touchStartY = useRef(0);
  const touchStartScrollTop = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    stateRef.current.boardsLength = boardsLength;
  }, [boardsLength]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      if (stateRef.current.isAnimating) return;
      const next = Math.max(0, Math.min(idx, stateRef.current.boardsLength - 1));
      if (next === stateRef.current.currentIndex) return;

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
    const el = containerRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => {
      const scrollEl = findScrollableAncestor(el);
      if (scrollEl) {
        const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
        const atBottom = scrollEl.scrollTop >= maxScroll - 1;
        const atTop = scrollEl.scrollTop <= 1;

        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && stateRef.current.currentIndex === 0 && !atTop) return;
      }

      e.preventDefault();
      if (e.deltaY > 0) goTo(stateRef.current.currentIndex + 1);
      else goTo(stateRef.current.currentIndex - 1);
    };

    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, [goTo]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    const scrollEl = findScrollableAncestor(containerRef.current);
    touchStartScrollTop.current = scrollEl?.scrollTop ?? 0;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) <= 50) return;

    const scrollEl = findScrollableAncestor(containerRef.current);
    if (scrollEl) {
      const scrollChange = Math.abs(scrollEl.scrollTop - touchStartScrollTop.current);
      if (scrollChange > 10) return;

      const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
      const atBottom = scrollEl.scrollTop >= maxScroll - 1;
      const atTop = scrollEl.scrollTop <= 1;
      if (delta > 0 && !atBottom) return;
      if (delta < 0 && stateRef.current.currentIndex === 0 && !atTop) return;
    }

    if (delta > 0) goTo(stateRef.current.currentIndex + 1);
    else goTo(stateRef.current.currentIndex - 1);
  };

  return { currentIndex, containerRef, handleTouchStart, handleTouchEnd };
}
