import apiClient from './apiClient';
import type { IThemeBoardRaw, IThemeBoardDetailRaw } from '../../types/community/post';

export const CommunityService = {
  getThemeBoards: (pageNumber: number, pageSize: number) =>
    apiClient
      .get<IThemeBoardRaw[]>('/api/theme-boards', { params: { pageNumber, pageSize } })
      .then((res) => res.data),

  getThemeBoardDetail: (postId: number) =>
    apiClient
      .get<IThemeBoardDetailRaw>(`/api/theme-boards/${postId}`)
      .then((res) => res.data),
};
