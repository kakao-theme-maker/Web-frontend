import { useMutation } from '@tanstack/react-query';
import { ThemeService } from '../api/ThemeService';

export function useDeleteThemePost(onSuccess?: () => void) {
  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: (postId: number) => ThemeService.deleteThemeBoard(postId),
    onSuccess,
  });
  return { deletePost, isPending };
}
