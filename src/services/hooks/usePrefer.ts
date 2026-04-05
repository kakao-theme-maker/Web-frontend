import { useState } from 'react';
import { usePostMutation, useDeleteMutation } from '../api/useApi';
import { ThemeService } from '../api/ThemeService';

export function usePrefer(postId: number, initialPrefers: number) {
  const [isPreferred, setIsPreferred] = useState(false);
  const [prefers, setPrefers] = useState(initialPrefers);

  const { mutate: prefer } = usePostMutation<unknown, number>(
    (id) => ThemeService.preferPost(id),
    {
      onError: () => {
        setIsPreferred(false);
        setPrefers((prev) => prev - 1);
      },
    },
  );

  const { mutate: unprefer } = useDeleteMutation<unknown, number>(
    (id) => ThemeService.unpreferPost(id),
    {
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
      unprefer(postId);
    } else {
      setIsPreferred(true);
      setPrefers((prev) => prev + 1);
      prefer(postId);
    }
  };

  return { isPreferred, prefers, togglePrefer };
}
