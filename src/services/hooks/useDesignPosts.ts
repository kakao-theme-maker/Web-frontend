import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { DesignService } from '../api/DesignService';
import type { IDesignBoard, IDesignBoardRaw } from '../../types/community/design';

const PAGE_SIZE = 20;

function mapPost(item: IDesignBoardRaw): IDesignBoard {
  return {
    boardId: item.post_id,
    designComponentId: item.design_component_id,
    title: item.title,
    prefers: item.prefers,
    previewImageUrl: item.preview_image_url,
    userEmail: item.user_email,
    createdAt: item.created_at,
  };
}

export function useDesignPosts() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['design-boards'],
    queryFn: ({ pageParam }) =>
      DesignService.getDesignBoards(pageParam, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length,
  });

  const posts = useMemo<IDesignBoard[]>(
    () => (data?.pages ?? []).flat().map(mapPost),
    [data]
  );

  return { posts, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage };
}
