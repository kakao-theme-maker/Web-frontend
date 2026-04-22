import Text from '../common/Text';
import { useMyCustomComponents } from '../../services/hooks/user/useMyCustomComponents';
import { useIntersectionObserver } from '../../services/hooks/common/useIntersectionObserver';

export default function CustomTab() {
  const { components, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyCustomComponents();

  const sentinelRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-2 px-4 pt-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-square animate-pulse rounded-sm bg-secondary-200" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Text variant="REGULAR_14" className="text-red-400">
          커스텀 목록을 불러올 수 없습니다.
        </Text>
      </div>
    );
  }

  if (components.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Text variant="REGULAR_14" className="text-secondary-300">
          커스텀한 테마/디자인이 없습니다.
        </Text>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 px-4">
        {components.map((item) => (
          <div key={`${item.type}-${item.id}`} className="aspect-square overflow-hidden rounded-sm bg-secondary-200">
            {item.previewImageUrl && (
              <img
                src={item.previewImageUrl}
                alt={item.type === 'THEME' ? '테마 미리보기' : '디자인 미리보기'}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
      <div ref={sentinelRef} className="h-1" />
      {isFetchingNextPage && (
        <div className="flex items-center justify-center py-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  );
}
