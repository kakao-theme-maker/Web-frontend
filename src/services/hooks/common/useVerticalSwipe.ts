import { useState, useRef, useEffect, useCallback } from 'react';

export function useVerticalSwipe(boardsLength: number, transitionDuration: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ currentIndex: 0, isAnimating: false, boardsLength });
  const touchStartY = useRef(0);
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
      e.preventDefault();
      if (e.deltaY > 0) goTo(stateRef.current.currentIndex + 1);
      else goTo(stateRef.current.currentIndex - 1);
    };

    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, [goTo]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) > 50) {
      if (delta > 0) goTo(stateRef.current.currentIndex + 1);
      else goTo(stateRef.current.currentIndex - 1);
    }
  };

  return { currentIndex, containerRef, handleTouchStart, handleTouchEnd };
}
