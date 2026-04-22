import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePostMutation, useDeleteMutation } from '../../api/useApi';
import { BoardInteractionService } from '../../api/BoardInteractionService';

type IPreferSnapshot = { snapshot: unknown };

interface IInfiniteCache {
  pages: Record<string, unknown>[][];
  pageParams: unknown[];
}

function isInfiniteCache(data: unknown): data is IInfiniteCache {
  return !!data && typeof data === 'object' && Array.isArray((data as IInfiniteCache).pages);
}

function applyPreferUpdate(
  data: unknown,
  boardId: number,
  isLiked: boolean,
  delta: number,
): unknown {
  if (!data) return data;
  if (isInfiniteCache(data)) {
    return {
      ...data,
      pages: data.pages.map((page) =>
        page.map((item) =>
          (item.boardId as number) === boardId
            ? { ...item, isLiked, prefers: ((item.prefers as number) ?? 0) + delta }
            : item,
        ),
      ),
    };
  }
  const obj = data as Record<string, unknown>;
  if ((obj.boardId as number) === boardId) {
    return { ...obj, isLiked, prefers: ((obj.prefers as number) ?? 0) + delta };
  }
  return data;
}

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
          applyPreferUpdate(old, boardId, true, 1),
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
          applyPreferUpdate(old, boardId, false, -1),
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
