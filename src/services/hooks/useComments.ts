import { useGetQuery } from '../api/useApi';
import { ThemeService } from '../api/ThemeService';
import type { ICommentRaw } from '../../types/community/theme';

export function useComments(postId: number) {
  const { data, isLoading, isError } = useGetQuery<ICommentRaw[]>(
    ['comments', postId],
    () => ThemeService.getComments(postId, 0, 100),
    { enabled: !!postId },
  );

  return { comments: data ?? [], isLoading, isError };
}
