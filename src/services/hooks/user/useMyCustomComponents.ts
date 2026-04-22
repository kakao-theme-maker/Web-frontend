import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { UserService } from '../../api/UserService';
import type { ICustomComponent, ICustomComponentRaw } from '../../../types/mypage/types';

const PAGE_SIZE = 20;

function mapComponent(item: ICustomComponentRaw): ICustomComponent {
  return {
    id: item.componentId,
    type: item.componentType,
    previewImageUrl: item.previewImageUrl,
    createdAt: item.createdAt,
  };
}

export function useMyCustomComponents() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['my-custom-components'],
    queryFn: ({ pageParam }) =>
      UserService.getCustomComponents({ page: pageParam, size: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length,
  });

  const components = useMemo<ICustomComponent[]>(
    () => (data?.pages ?? []).flat().map(mapComponent),
    [data],
  );

  return { components, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage };
}
