import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ThemeService } from '../api/ThemeService';

export function useDeleteThemePost(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: (postId: number) => ThemeService.deleteThemeBoard(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      onSuccess?.();
    },
  });
  return { deletePost, isPending };
}
