import apiClient from './apiClient';
import type { IThemeBoardItem } from '../../types/community/post';

export const CommunityService = {
  getThemeBoards: (pageNumber: number, pageSize: number) =>
    apiClient.get<IThemeBoardItem[]>('/api/theme-boards', {
      params: { pageNumber, pageSize },
    }),
};
