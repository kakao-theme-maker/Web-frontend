import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DesignService } from '../api/DesignService';

export function useDeleteDesignPost(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: (postId: number) => DesignService.deleteDesignBoard(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      onSuccess?.();
    },
  });
  return { deletePost, isPending };
}
