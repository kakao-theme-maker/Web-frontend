import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePostMutation, useDeleteMutation } from '../../api/useApi';
import { BoardInteractionService } from '../../api/BoardInteractionService';
import { updateBoardInCache } from '../../../utils/query';

type IPreferSnapshot = { snapshot: unknown };

export function usePrefer(
  boardId: number,
  initialPrefers: number,
  initialIsPreferred: boolean = false,
  queryKey?: unknown[],
) {
  const queryClient = useQueryClient();
  const [isPreferred, setIsPreferred] = useState(initialIsPreferred);
  const [prefers, setPrefers] = useState(initialPrefers);

  useEffect(() => {
    setIsPreferred(initialIsPreferred);
  }, [initialIsPreferred]);

  useEffect(() => {
    setPrefers(initialPrefers);
  }, [initialPrefers]);

  const { mutate: prefer, isPending: isPreferPending } = usePostMutation<unknown, number>(
    (id) => BoardInteractionService.preferBoard(id),
    {
      onMutate: async () => {
        if (!queryKey) return undefined;
        await queryClient.cancelQueries({ queryKey });
        const snapshot = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (old: unknown) =>
          updateBoardInCache(old, boardId, (item) => ({
            ...item,
            isLiked: true,
            prefers: ((item.prefers as number) ?? 0) + 1,
          })),
        );
        return { snapshot } as IPreferSnapshot;
      },
      onError: (_err, _vars, context) => {
        const ctx = context as IPreferSnapshot | undefined;
        if (queryKey && ctx?.snapshot !== undefined) {
          queryClient.setQueryData(queryKey, ctx.snapshot);
        }
        setIsPreferred(false);
        setPrefers((prev) => prev - 1);
      },
      onSettled: () => {
        if (queryKey) queryClient.invalidateQueries({ queryKey });
      },
    },
  );

  const { mutate: unprefer, isPending: isUnpreferPending } = useDeleteMutation<unknown, number>(
    (id) => BoardInteractionService.unpreferBoard(id),
    {
      onMutate: async () => {
        if (!queryKey) return undefined;
        await queryClient.cancelQueries({ queryKey });
        const snapshot = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (old: unknown) =>
          updateBoardInCache(old, boardId, (item) => ({
            ...item,
            isLiked: false,
            prefers: ((item.prefers as number) ?? 0) - 1,
          })),
        );
        return { snapshot } as IPreferSnapshot;
      },
      onError: (_err, _vars, context) => {
        const ctx = context as IPreferSnapshot | undefined;
        if (queryKey && ctx?.snapshot !== undefined) {
          queryClient.setQueryData(queryKey, ctx.snapshot);
        }
        setIsPreferred(true);
        setPrefers((prev) => prev + 1);
      },
      onSettled: () => {
        if (queryKey) queryClient.invalidateQueries({ queryKey });
      },
    },
  );

  const togglePrefer = () => {
    if (isPreferred) {
      setIsPreferred(false);
      setPrefers((prev) => prev - 1);
      unprefer(boardId);
    } else {
      setIsPreferred(true);
      setPrefers((prev) => prev + 1);
      prefer(boardId);
    }
  };

  return { isPreferred, prefers, togglePrefer, isPending: isPreferPending || isUnpreferPending };
}
