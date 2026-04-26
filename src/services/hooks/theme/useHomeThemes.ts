import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ThemeService } from '../../api/ThemeService';
import type { IHomeTheme, IHomeThemeRaw } from '../../../types/community/theme';

const PAGE_SIZE = 12;

export type HomeThemeListType = 'popular' | 'bookmarked';

function isSnakeHomeTheme(item: IHomeThemeRaw): item is Extract<IHomeThemeRaw, { preview_image_url: string }> {
  return 'preview_image_url' in item;
}

function mapHomeTheme(item: IHomeThemeRaw): IHomeTheme {
  if (!isSnakeHomeTheme(item)) {
    return {
      themeComponentId: item.themeComponentId,
      previewImageUrl: item.previewImageUrl,
      themeName: item.themeName,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  return {
    themeComponentId: item.theme_component_id,
    previewImageUrl: item.preview_image_url,
    themeName: item.theme_name,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
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
