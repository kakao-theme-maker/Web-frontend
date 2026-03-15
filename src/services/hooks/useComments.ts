import { useGetQuery } from '../api/useApi';
import { CommunityService } from '../api/CommunityService';
import type { ICommentRaw } from '../../types/community/post';

export function useComments(postId: number) {
  const { data, isLoading, isError } = useGetQuery<ICommentRaw[]>(
    ['comments', postId],
    () => CommunityService.getComments(postId, 0, 100),
    { enabled: !!postId },
  );

  return { comments: data ?? [], isLoading, isError };
}
