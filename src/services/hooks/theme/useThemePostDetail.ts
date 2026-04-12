import { useGetQuery } from '../../api/useApi';
import { ThemeService } from '../../api/ThemeService';
import type { IThemeBoardDetail } from '../../../types/community/theme';

export function useThemePostDetail(postId: number) {
  const { data, isLoading, isError } = useGetQuery(
    ['theme-board-detail', postId],
    () => ThemeService.getThemeBoardDetail(postId),
    { enabled: !!postId },
  );

  const post: IThemeBoardDetail | null = data
    ? {
        boardId: data.post_id,
        themeComponentId: data.theme_component_id,
        title: data.title,
        content: data.content,
        prefers: data.prefers,
        comments: data.comments,
        tags: data.tags ?? [],
        isLiked: data.liked,
        isBookmarked: data.bookmarked,
        previewImageUrl: data.preview_image_url,
        previewImageUrls: data.preview_image_urls?.length
          ? data.preview_image_urls
          : data.preview_image_url ? [data.preview_image_url] : [],
        userEmail: data.user_email,
        userName: data.user_name,
        profileImage: data.profile_image,
        createdAt: data.created_at,
      }
    : null;

  return { post, isLoading, isError };
}
