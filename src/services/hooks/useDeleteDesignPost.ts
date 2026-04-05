import { useMutation } from '@tanstack/react-query';
import { DesignService } from '../api/DesignService';

export function useDeleteDesignPost(onSuccess?: () => void) {
  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: (postId: number) => DesignService.deleteDesignBoard(postId),
    onSuccess,
  });
  return { deletePost, isPending };
}
