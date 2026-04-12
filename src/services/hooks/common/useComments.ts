import { useGetQuery } from '../../api/useApi';
import { BoardInteractionService } from '../../api/BoardInteractionService';
import type { ICommentRaw } from '../../../types/community/theme';

export function useComments(boardId: number) {
  const { data, isLoading, isError } = useGetQuery<ICommentRaw[]>(
    ['comments', boardId],
    () => BoardInteractionService.getComments(boardId, 0, 100),
    { enabled: !!boardId },
  );

  return { comments: data ?? [], isLoading, isError };
}
