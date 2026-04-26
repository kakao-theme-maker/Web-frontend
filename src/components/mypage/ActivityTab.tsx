import Text from '../common/Text';
import MyActivityCard from './MyActivityCard';
import { useMyUploadPosts } from '../../services/hooks/user/useMyUploadPosts';
import { useIntersectionObserver } from '../../services/hooks/common/useIntersectionObserver';

export default function ActivityTab() {
  const { posts, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyUploadPosts();

  const sentinelRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <div>
      {isLoading && (
        <div className="flex min-h-[320px] items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
      {isError && (
        <div className="flex min-h-[320px] items-center justify-center">
          <Text variant="REGULAR_14" className="text-red-400">
            게시글을 불러올 수 없습니다.
          </Text>
        </div>
      )}
      {!isLoading && !isError && posts.length === 0 && (
        <div className="flex min-h-[320px] items-start justify-center pt-24">
          <Text variant="REGULAR_14" className="text-secondary-300">
            아직 활동이 없습니다.
          </Text>
        </div>
      )}
      {!isLoading &&
        !isError &&
        posts.map((post) => (
          <div key={post.boardId}>
            <MyActivityCard post={post} />
          </div>
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
