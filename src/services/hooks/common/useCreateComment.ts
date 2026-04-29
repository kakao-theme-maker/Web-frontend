import { useQueryClient } from '@tanstack/react-query';
import { usePostMutation } from '../../api/useApi';
import { BoardInteractionService } from '../../api/BoardInteractionService';
import type { ICommentRaw } from '../../../types/community/theme';
import { QUERY_KEYS } from '../../../constants/queryKeys';

export function useCreateComment(boardId: number, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: createComment, isPending: isCreating } = usePostMutation<ICommentRaw, string>(
    (content) => BoardInteractionService.createComment(boardId, content),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(boardId) });
        onSuccess?.();
      },
    },
  );

  return { createComment, isCreating };
}
