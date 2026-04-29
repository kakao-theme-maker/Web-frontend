import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ThemeService } from '../../api/ThemeService';
import type { IThemeBoard, IThemeBoardRaw } from '../../../types/community/theme';
import { QUERY_KEYS } from '../../../constants/queryKeys';

const PAGE_SIZE = 20;

function mapBoard(item: IThemeBoardRaw): IThemeBoard {
  return {
    boardId: item.post_id,
    themeComponentId: item.theme_component_id,
    title: item.title,
    prefers: item.prefers,
    previewImageUrl: item.preview_image_url,
    userEmail: item.user_email,
    createdAt: item.created_at,
  };
}

export function useThemeBoards() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: QUERY_KEYS.themeBoards(),
    queryFn: ({ pageParam }) =>
      ThemeService.getThemeBoards(pageParam, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length,
  });

  const boards = useMemo<IThemeBoard[]>(
    () => (data?.pages ?? []).flat().map(mapBoard),
    [data]
  );

  return { boards, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage };
}
