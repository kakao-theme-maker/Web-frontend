import { useEffect } from 'react';
import Text from '../common/Text';
import { useVerticalSwipe } from '../../services/hooks/common/useVerticalSwipe';

interface IBoardSwipeDetailViewProps<TBoard extends { boardId: number }> {
  boards: TBoard[];
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  renderBoard: (board: TBoard) => React.ReactNode;
  transitionDuration?: number;
  prefetchThreshold?: number;
}

export default function BoardSwipeDetailView<TBoard extends { boardId: number }>({
  boards,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  renderBoard,
  transitionDuration = 700,
  prefetchThreshold = 3,
}: IBoardSwipeDetailViewProps<TBoard>) {
  const { currentIndex, containerRef, handleTouchStart, handleTouchEnd } =
    useVerticalSwipe(boards.length, transitionDuration);

  useEffect(() => {
    if (
      boards.length > 0 &&
      hasNextPage &&
      !isFetchingNextPage &&
      currentIndex >= boards.length - prefetchThreshold
    ) {
      fetchNextPage();
    }
  }, [currentIndex, boards.length, hasNextPage, isFetchingNextPage, fetchNextPage, prefetchThreshold]);

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
        boards.map((board, index) => (
          <div
            key={board.boardId}
            className="scrollbar-hidden absolute inset-0 overflow-y-auto overscroll-contain transition-transform ease-in-out"
            style={{
              transform: `translateY(${(index - currentIndex) * 100}%)`,
              transitionDuration: `${transitionDuration}ms`,
            }}
          >
            {renderBoard(board)}
          </div>
        ))}
    </div>
  );
}
