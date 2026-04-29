import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DesignService } from '../../api/DesignService';
import { QUERY_KEYS } from '../../../constants/queryKeys';

export function useDeleteDesignBoard(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: deleteBoard, isPending } = useMutation({
    mutationFn: (boardId: number) => DesignService.deleteDesignBoard(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userProfile() });
      onSuccess?.();
    },
  });
  return { deleteBoard, isPending };
}
