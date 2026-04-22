import { useEffect } from 'react';
import Text from '../common/Text';
import MyActivityCard from './MyActivityCard';
import { useMyUploadPosts } from '../../services/hooks/user/useMyUploadPosts';
import { useVerticalSwipe } from '../../services/hooks/common/useVerticalSwipe';

const TRANSITION_DURATION = 700;
const PREFETCH_THRESHOLD = 3;

export default function ActivityTab() {
  const { posts, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyUploadPosts();

  const { currentIndex, containerRef, handleTouchStart, handleTouchEnd } =
    useVerticalSwipe(posts.length, TRANSITION_DURATION);

  useEffect(() => {
    if (
      posts.length > 0 &&
      hasNextPage &&
      !isFetchingNextPage &&
      currentIndex >= posts.length - PREFETCH_THRESHOLD
    ) {
      fetchNextPage();
    }
  }, [currentIndex, posts.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {isLoading && (
        <div className="flex h-full items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
      {isError && (
        <div className="flex h-full items-center justify-center">
          <Text variant="REGULAR_14" className="text-red-400">
            게시글을 불러올 수 없습니다.
          </Text>
        </div>
      )}
      {!isLoading && !isError && posts.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <Text variant="REGULAR_14" className="text-secondary-300">
            아직 활동이 없습니다.
          </Text>
        </div>
      )}
      {!isLoading &&
        !isError &&
        posts.map((post, idx) => (
          <div
            key={post.boardId}
            className="absolute inset-0 overflow-hidden transition-transform ease-in-out"
            style={{
              transform: `translateY(${(idx - currentIndex) * 100}%)`,
              transitionDuration: `${TRANSITION_DURATION}ms`,
            }}
          >
            <MyActivityCard post={post} />
          </div>
        ))}
    </div>
  );
}
