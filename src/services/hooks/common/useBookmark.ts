import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePostMutation, useDeleteMutation } from '../../api/useApi';
import { BoardInteractionService } from '../../api/BoardInteractionService';
import { updateBoardInCache, removeBoardFromCache } from '../../../utils/query';

type IBookmarkSnapshot = { snapshot: unknown };

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
          updateBoardInCache(old, postId, (item) => ({ ...item, isBookmarked: true })),
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
            ? removeBoardFromCache(old, postId)
            : updateBoardInCache(old, postId, (item) => ({ ...item, isBookmarked: false })),
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
