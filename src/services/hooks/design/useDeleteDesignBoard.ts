import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DesignService } from '../../api/DesignService';

export function useDeleteDesignBoard(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: deleteBoard, isPending } = useMutation({
    mutationFn: (boardId: number) => DesignService.deleteDesignBoard(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      onSuccess?.();
    },
  });
  return { deleteBoard, isPending };
}
