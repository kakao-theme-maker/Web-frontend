import { useGetQuery } from '../api/useApi';
import { UserService } from '../api/UserService';
import type { IThemeGridItem } from '../../types/mypage/types';

export function useSavedPosts() {
  const { data, isLoading, isError } = useGetQuery(
    ['saved-posts'],
    () => UserService.getSavedPosts(),
  );

  const posts: IThemeGridItem[] = (data ?? []).map((item) => ({
    id: item.postId,
    previewImageUrl: item.previewImageUrl,
  }));

  return { posts, isLoading, isError };
}
