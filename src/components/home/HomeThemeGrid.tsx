import { useCallback } from 'react';
import Text from '../common/Text';
import { useIntersectionObserver } from '../../services/hooks/common/useIntersectionObserver';
import {
  type HomeThemeListType,
  useHomeThemes,
} from '../../services/hooks/theme/useHomeThemes';
import type { IHomeTheme } from '../../types/community/theme';

function HomeThemeCard({ theme }: { theme: IHomeTheme }) {
  return (
    <article className="aspect-[94/173] overflow-hidden rounded-[5px] border border-secondary-200 bg-[#f9f9fb]">
      {theme.previewImageUrl ? (
        <img src={theme.previewImageUrl} alt={theme.themeName} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full bg-[#f9f9fb]" aria-label={theme.themeName} />
      )}
    </article>
  );
}

function ThemeCardSkeleton() {
  return <div className="aspect-[94/173] animate-pulse rounded-[5px] border border-secondary-200 bg-[#f9f9fb]" />;
}

export default function HomeThemeGrid({ type }: { type: HomeThemeListType }) {
  const { themes, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useHomeThemes(type);

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const sentinelRef = useIntersectionObserver(handleIntersect);
  const emptyMessage = type === 'popular' ? '인기 테마가 없습니다.' : '저장한 테마가 없습니다.';

  if (isLoading) {
    return (
      <section className="grid grid-cols-3 gap-x-[15px] gap-y-10 px-[22px] pt-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <ThemeCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[280px] items-center justify-center">
        <Text variant="REGULAR_14" className="text-red-400">
          테마 목록을 불러올 수 없습니다.
        </Text>
      </div>
    );
  }

  if (themes.length === 0) {
    return (
      <div className="flex min-h-[280px] items-center justify-center">
        <Text variant="REGULAR_14" className="text-secondary-300">
          {emptyMessage}
        </Text>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-3 gap-x-[15px] gap-y-10 px-[22px] pt-3">
      {themes.map((theme) => (
        <HomeThemeCard key={theme.themeComponentId} theme={theme} />
      ))}
      <div ref={sentinelRef} className="col-span-3 h-1" />
      {isFetchingNextPage && (
        <div className="col-span-3 flex justify-center py-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </section>
  );
}
