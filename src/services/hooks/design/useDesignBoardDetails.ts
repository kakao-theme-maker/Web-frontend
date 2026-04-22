import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { DesignService } from '../../api/DesignService';
import type { IDesignBoardDetail, IDesignBoardDetailsRaw } from '../../../types/community/design';

const PAGE_SIZE = 10;

function mapBoard(item: IDesignBoardDetailsRaw): IDesignBoardDetail {
  return {
    boardId: item.post_id,
    designComponentId: item.design_component_id,
    title: item.title,
    content: item.content,
    prefers: item.prefers,
    comments: item.comments,
    tags: item.tags ?? [],
    isLiked: item.liked,
    isBookmarked: item.bookmarked,
    previewImageUrls: item.preview_image_url ? [item.preview_image_url] : [],
    userEmail: item.user_email,
    userName: item.user_name,
    profileImage: item.profile_image,
    createdAt: item.created_at,
  };
}

export function useDesignBoardDetails(pinnedPostId: number) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['design-board-details', pinnedPostId],
    queryFn: ({ pageParam }) =>
      DesignService.getDesignBoardDetails({ pinnedPostId, page: pageParam, size: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length,
    enabled: !!pinnedPostId,
  });

  const boards = useMemo<IDesignBoardDetail[]>(
    () => (data?.pages ?? []).flat().map(mapBoard),
    [data],
  );

  return { boards, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage };
}
