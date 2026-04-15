import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ThemeService } from '../../api/ThemeService';

export function useDeleteThemeBoard(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: deleteBoard, isPending } = useMutation({
    mutationFn: (boardId: number) => ThemeService.deleteThemeBoard(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      onSuccess?.();
    },
  });
  return { deleteBoard, isPending };
}
