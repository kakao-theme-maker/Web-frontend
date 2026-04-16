import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ThemeDetailCard from "../../components/community/theme/ThemeDetailCard";
import { useThemeBoardDetail } from "../../services/hooks/theme/useThemeBoardDetail";
import { useVerticalSwipe } from "../../services/hooks/common/useVerticalSwipe";
import Text from "../../components/common/Text";

const TRANSITION_DURATION = 700;

export default function Detail() {
  const { boardId } = useParams();
  const numericBoardId = Number(boardId);

  const { board, isLoading, isError } = useThemeBoardDetail(numericBoardId);

  const boards = useMemo(() => (board ? [board] : []), [board]);

  const { currentIndex, containerRef, handleTouchStart, handleTouchEnd } =
    useVerticalSwipe(boards.length, TRANSITION_DURATION);

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
      {!isLoading &&
        !isError &&
        boards.map((p, idx) => (
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
