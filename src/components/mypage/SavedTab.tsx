import Text from '../common/Text';
import MySavedCard from './MySavedCard';
import { useMyBookmarkedPosts } from '../../services/hooks/user/useMyBookmarkedPosts';
import { useIntersectionObserver } from '../../services/hooks/common/useIntersectionObserver';

export default function SavedTab() {
  const { posts, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyBookmarkedPosts();

  const sentinelRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Text variant="REGULAR_14" className="text-red-400">
          게시글을 불러올 수 없습니다.
        </Text>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Text variant="REGULAR_14" className="text-secondary-300">
          저장된 게시글이 없습니다.
        </Text>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <MySavedCard key={post.boardId} post={post} />
      ))}
      <div ref={sentinelRef} className="h-1" />
      {isFetchingNextPage && (
        <div className="flex items-center justify-center py-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  );
}
