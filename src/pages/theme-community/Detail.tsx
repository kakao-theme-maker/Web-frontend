import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ThemeDetailCard from "../../components/community/theme/ThemeDetailCard";
import { useThemeBoardDetail } from "../../services/hooks/theme/useThemeBoardDetail";
import Text from "../../components/common/Text";

const TRANSITION_DURATION = 700;

export default function Detail() {
  const { boardId } = useParams();
  const numericBoardId = Number(boardId);

  const { board, isLoading, isError } = useThemeBoardDetail(numericBoardId);

  const boards = useMemo(() => {
    if (!board) return [];
    return [board];
  }, [board]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ currentIndex: 0, isAnimating: false, boardsLength: boards.length });
  const touchStartY = useRef(0);

  useEffect(() => {
    stateRef.current.boardsLength = boards.length;
  }, [boards.length]);

  const goTo = useCallback((idx: number) => {
    if (stateRef.current.isAnimating) return;
    const next = Math.max(0, Math.min(idx, stateRef.current.boardsLength - 1));
    if (next === stateRef.current.currentIndex) return;

    stateRef.current.isAnimating = true;
    stateRef.current.currentIndex = next;
    setCurrentIndex(next);

    setTimeout(() => { stateRef.current.isAnimating = false; }, TRANSITION_DURATION);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) goTo(stateRef.current.currentIndex + 1);
      else goTo(stateRef.current.currentIndex - 1);
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
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

  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {isLoading && (
        <div className="flex h-full items-center justify-center">
          <Text variant="REGULAR_14">로딩 중...</Text>
        </div>
      )}
      {isError && (
        <div className="flex h-full items-center justify-center">
          <Text variant="REGULAR_14">게시글을 불러올 수 없습니다.</Text>
        </div>
      )}
      {!isLoading && !isError && boards.map((p, idx) => (
        <div
          key={p.boardId}
          className="absolute inset-0 transition-transform ease-in-out"
          style={{
            transform: `translateY(${(idx - currentIndex) * 100}%)`,
            transitionDuration: `${TRANSITION_DURATION}ms`,
          }}
        >
          <ThemeDetailCard board={p} />
        </div>
      ))}
    </div>
  );
}
