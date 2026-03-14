import { useGetQuery } from '../api/useApi';
import type { IThemeBoardRaw, IThemeBoard } from '../../types/community/post';

const PAGE_NUMBER = 0;
const PAGE_SIZE = 200;

export function useCommunityPosts() {
  const { data, isLoading, isError } = useGetQuery<IThemeBoardRaw[]>(
    ['theme-boards'],
    '/api/theme-boards',
    { params: { pageNumber: PAGE_NUMBER, pageSize: PAGE_SIZE } },
  );

  const posts: IThemeBoard[] = (data ?? []).map((item) => ({
    boardId: item.post_id,
    themeComponentId: item.theme_component_id,
    title: item.title,
    prefers: item.prefers,
    previewImageUrl: item.preview_image_url,
    userEmail: item.user_email,
    createdAt: item.created_at,
  }));

  return { posts, isLoading, isError };
}
