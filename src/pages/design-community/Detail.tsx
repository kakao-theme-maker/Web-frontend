import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DesignDetailCard } from "../../components/community/design";
import { useDesignBoardDetails } from "../../services/hooks/design/useDesignBoardDetails";
import { useVerticalSwipe } from "../../services/hooks/common/useVerticalSwipe";
import Text from "../../components/common/Text";

const TRANSITION_DURATION = 700;
const PREFETCH_THRESHOLD = 3;

export default function Detail() {
  const { boardId } = useParams();
  const numericBoardId = Number(boardId);

  const { boards, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDesignBoardDetails(numericBoardId);

  const { currentIndex, containerRef, handleTouchStart, handleTouchEnd } =
    useVerticalSwipe(boards.length, TRANSITION_DURATION);

  useEffect(() => {
    if (
      boards.length > 0 &&
      hasNextPage &&
      !isFetchingNextPage &&
      currentIndex >= boards.length - PREFETCH_THRESHOLD
    ) {
      fetchNextPage();
    }
  }, [currentIndex, boards.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
            <DesignDetailCard board={p} pinnedPostId={numericBoardId} />
          </div>
        ))}
    </div>
  );
}
