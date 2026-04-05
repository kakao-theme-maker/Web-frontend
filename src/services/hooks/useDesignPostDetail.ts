import { useGetQuery } from '../api/useApi';
import { DesignService } from '../api/DesignService';
import type { IDesignBoardDetail } from '../../types/community/design';

export function useDesignPostDetail(postId: number) {
  const { data, isLoading, isError } = useGetQuery(
    ['design-board-detail', postId],
    () => DesignService.getDesignBoardDetail(postId),
    { enabled: !!postId },
  );

  const post: IDesignBoardDetail | null = data
    ? {
        boardId: data.post_id,
        designComponentId: data.design_component_id,
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
