import { useGetQuery } from '../api/useApi';
import { CommunityService } from '../api/CommunityService';
import type { IThemeBoardDetail } from '../../types/community/post';

export function useCommunityPostDetail(postId: number) {
  const { data, isLoading, isError } = useGetQuery(
    ['theme-board-detail', postId],
    () => CommunityService.getThemeBoardDetail(postId),
    { enabled: !!postId },
  );

  const post: IThemeBoardDetail | null = data
    ? {
        boardId: data.post_id,
        themeComponentId: data.theme_component_id,
        title: data.title,
        content: data.content,
        prefers: data.prefers,
        previewImageUrl: data.preview_image_url,
        userEmail: data.user_email,
        createdAt: data.created_at,
      }
    : null;

  return { post, isLoading, isError };
}
