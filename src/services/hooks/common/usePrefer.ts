import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePostMutation, useDeleteMutation } from '../../api/useApi';
import { BoardInteractionService } from '../../api/BoardInteractionService';

type IPreferSnapshot = { snapshot: Record<string, unknown> | undefined };

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
        const snapshot = queryClient.getQueryData<Record<string, unknown>>(queryKey);
        queryClient.setQueryData(queryKey, (old: Record<string, unknown> | undefined) =>
          old ? { ...old, isLiked: true, prefers: (old.prefers as number) + 1 } : old,
        );
        return { snapshot } as IPreferSnapshot;
      },
      onError: (_err, _vars, context) => {
        const ctx = context as IPreferSnapshot | undefined;
        if (queryKey && ctx?.snapshot !== undefined) {
          queryClient.setQueryData(queryKey, ctx.snapshot);
          setIsPreferred(ctx.snapshot.isLiked as boolean);
          setPrefers(ctx.snapshot.prefers as number);
        } else {
          setIsPreferred(false);
          setPrefers((prev) => prev - 1);
        }
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
        const snapshot = queryClient.getQueryData<Record<string, unknown>>(queryKey);
        queryClient.setQueryData(queryKey, (old: Record<string, unknown> | undefined) =>
          old ? { ...old, isLiked: false, prefers: (old.prefers as number) - 1 } : old,
        );
        return { snapshot } as IPreferSnapshot;
      },
      onError: (_err, _vars, context) => {
        const ctx = context as IPreferSnapshot | undefined;
        if (queryKey && ctx?.snapshot !== undefined) {
          queryClient.setQueryData(queryKey, ctx.snapshot);
          setIsPreferred(ctx.snapshot.isLiked as boolean);
          setPrefers(ctx.snapshot.prefers as number);
        } else {
          setIsPreferred(true);
          setPrefers((prev) => prev + 1);
        }
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
