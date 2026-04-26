import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ThemeService } from '../../api/ThemeService';
import type { IHomeTheme, IHomeThemeRaw } from '../../../types/community/theme';

const PAGE_SIZE = 12;

export type HomeThemeListType = 'popular' | 'bookmarked';

function mapHomeTheme(item: IHomeThemeRaw): IHomeTheme {
  return {
    themeComponentId: item.themeComponentId,
    previewImageUrl: item.previewImageUrl,
    themeName: item.themeName,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function useHomeThemes(type: HomeThemeListType) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['home-themes', type],
    queryFn: ({ pageParam }) =>
      type === 'popular'
        ? ThemeService.getPopularThemes({ page: pageParam, size: PAGE_SIZE })
        : ThemeService.getBookmarkedThemes({ page: pageParam, size: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length,
  });

  const themes = useMemo<IHomeTheme[]>(
    () => (data?.pages ?? []).flat().map(mapHomeTheme),
    [data],
  );

  return { themes, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage };
}
