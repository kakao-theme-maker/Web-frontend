import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePostMutation, useDeleteMutation } from '../../api/useApi';
import { BoardInteractionService } from '../../api/BoardInteractionService';

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

  const { mutate: prefer } = usePostMutation<unknown, number>(
    (id) => BoardInteractionService.preferBoard(id),
    {
      onSuccess: () => {
        if (queryKey) {
          queryClient.setQueryData(queryKey, (old: Record<string, unknown> | undefined) =>
            old ? { ...old, liked: true, prefers: (old.prefers as number) + 1 } : old,
          );
        }
      },
      onError: () => {
        setIsPreferred(false);
        setPrefers((prev) => prev - 1);
      },
    },
  );

  const { mutate: unprefer } = useDeleteMutation<unknown, number>(
    (id) => BoardInteractionService.unpreferBoard(id),
    {
      onSuccess: () => {
        if (queryKey) {
          queryClient.setQueryData(queryKey, (old: Record<string, unknown> | undefined) =>
            old ? { ...old, liked: false, prefers: (old.prefers as number) - 1 } : old,
          );
        }
      },
      onError: () => {
        setIsPreferred(true);
        setPrefers((prev) => prev + 1);
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

  return { isPreferred, prefers, togglePrefer };
}
