import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CommunityService } from '../api/CommunityService';
import type { IThemeBoard, IThemeBoardRaw } from '../../types/community/post';

const PAGE_SIZE = 20;

function mapPost(item: IThemeBoardRaw): IThemeBoard {
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

export function useCommunityPosts() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['theme-boards'],
    queryFn: ({ pageParam }) =>
      CommunityService.getThemeBoards(pageParam, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length,
  });

  // data가 변경될 때만 재계산하여 불필요한 배열 재생성을 방지합니다.
  const posts = useMemo<IThemeBoard[]>(
    () => (data?.pages ?? []).flat().map(mapPost),
    [data]
  );

  return { posts, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage };
}
