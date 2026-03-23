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

  const posts: IThemeBoard[] = (data?.pages ?? []).flat().map(mapPost);

  return { posts, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage };
}
