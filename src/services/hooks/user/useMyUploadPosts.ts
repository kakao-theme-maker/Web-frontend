import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { UserService } from '../../api/UserService';
import { useAuthStore } from '../../../stores/authStore';
import type { IMyUploadPost, IMyUploadPostRaw } from '../../../types/mypage/types';

const PAGE_SIZE = 10;

function mapPost(item: IMyUploadPostRaw, userEmail: string): IMyUploadPost {
  return {
    boardId: item.postId,
    title: item.title,
    content: item.content,
    tags: item.tags ?? [],
    previewImageUrls: item.previewImageUrl ?? [],
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    postType: item.postType,
    userName: item.authorName,
    profileImage: item.authorProfileImageUrl,
    userEmail,
    prefers: item.prefers,
    comments: item.comments,
    isBookmarked: item.bookmarked,
    isLiked: item.preferred,
  };
}

export function useMyUploadPosts() {
  const userEmail = useAuthStore((state) => state.userEmail) ?? '';

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['my-upload-posts'],
    queryFn: ({ pageParam }) =>
      UserService.getMyUploadPosts({ page: pageParam, size: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length,
  });

  const posts = useMemo<IMyUploadPost[]>(
    () => (data?.pages ?? []).flat().map((item) => mapPost(item, userEmail)),
    [data, userEmail],
  );

  return { posts, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage };
}
