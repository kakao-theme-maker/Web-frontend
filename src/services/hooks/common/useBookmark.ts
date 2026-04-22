import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePostMutation, useDeleteMutation } from '../../api/useApi';
import { BoardInteractionService } from '../../api/BoardInteractionService';

type IBookmarkSnapshot = { snapshot: unknown };

interface IInfiniteCache {
  pages: Record<string, unknown>[][];
  pageParams: unknown[];
}

function isInfiniteCache(data: unknown): data is IInfiniteCache {
  return !!data && typeof data === 'object' && Array.isArray((data as IInfiniteCache).pages);
}

function applyBookmarkUpdate(data: unknown, boardId: number, isBookmarked: boolean): unknown {
  if (!data) return data;
  if (isInfiniteCache(data)) {
    return {
      ...data,
      pages: data.pages.map((page) =>
        page.map((item) =>
          (item.boardId as number) === boardId ? { ...item, isBookmarked } : item,
        ),
      ),
    };
  }
  const obj = data as Record<string, unknown>;
  if ((obj.boardId as number) === boardId) {
    return { ...obj, isBookmarked };
  }
  return data;
}

function applyBookmarkRemoval(data: unknown, boardId: number): unknown {
  if (!data) return data;
  if (isInfiniteCache(data)) {
    return {
      ...data,
      pages: data.pages.map((page) =>
        page.filter((item) => (item.boardId as number) !== boardId),
      ),
    };
  }
  return data;
}

export function useBookmark(
  postId: number,
  initialIsBookmarked: boolean = false,
  queryKey?: unknown[],
  removeOnUnbookmark: boolean = false,
) {
  const queryClient = useQueryClient();
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);

  useEffect(() => {
    setIsBookmarked(initialIsBookmarked);
  }, [initialIsBookmarked]);

  const { mutate: bookmark, isPending: isBookmarkPending } = usePostMutation<unknown, number>(
    (id) => BoardInteractionService.bookmarkPost(id),
    {
      onMutate: async () => {
        if (!queryKey) return undefined;
        await queryClient.cancelQueries({ queryKey });
        const snapshot = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (old: unknown) =>
          applyBookmarkUpdate(old, postId, true),
        );
        return { snapshot } as IBookmarkSnapshot;
      },
      onError: (_err, _vars, context) => {
        const ctx = context as IBookmarkSnapshot | undefined;
        if (queryKey && ctx?.snapshot !== undefined) {
          queryClient.setQueryData(queryKey, ctx.snapshot);
        }
        setIsBookmarked(false);
      },
      onSettled: () => {
        if (queryKey) queryClient.invalidateQueries({ queryKey });
      },
    },
  );

  const { mutate: unbookmark, isPending: isUnbookmarkPending } = useDeleteMutation<unknown, number>(
    (id) => BoardInteractionService.unbookmarkPost(id),
    {
      onMutate: async () => {
        if (!queryKey) return undefined;
        await queryClient.cancelQueries({ queryKey });
        const snapshot = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (old: unknown) =>
          removeOnUnbookmark
            ? applyBookmarkRemoval(old, postId)
            : applyBookmarkUpdate(old, postId, false),
        );
        return { snapshot } as IBookmarkSnapshot;
      },
      onError: (_err, _vars, context) => {
        const ctx = context as IBookmarkSnapshot | undefined;
        if (queryKey && ctx?.snapshot !== undefined) {
          queryClient.setQueryData(queryKey, ctx.snapshot);
        }
        setIsBookmarked(true);
      },
      onSettled: () => {
        if (queryKey) queryClient.invalidateQueries({ queryKey });
      },
    },
  );

  const toggleBookmark = () => {
    if (isBookmarked) {
      setIsBookmarked(false);
      unbookmark(postId);
    } else {
      setIsBookmarked(true);
      bookmark(postId);
    }
  };

  return { isBookmarked, toggleBookmark, isPending: isBookmarkPending || isUnbookmarkPending };
}
