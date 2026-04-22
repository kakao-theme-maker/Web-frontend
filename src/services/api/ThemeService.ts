import apiClient from './ApiClient';
import type { IThemeBoardRaw, IThemeBoardDetailsRaw, IUserThemeRaw, IBoardCreateResponseRaw } from '../../types/community/theme';

interface IGetThemeBoardDetailsParams {
  pinnedPostId: number;
  page: number;
  size: number;
  sort?: 'asc' | 'desc';
}

export const ThemeService = {
  getThemeBoards: (page: number, size: number) =>
    apiClient
      .get<IThemeBoardRaw[]>('/api/theme-boards', { params: { page, size } })
      .then((res) => res.data),

  getThemeBoardDetails: ({ pinnedPostId, page, size, sort = 'desc' }: IGetThemeBoardDetailsParams) =>
    apiClient
      .get<IThemeBoardDetailsRaw[]>('/api/theme-boards/details', {
        params: { pinned_post_id: pinnedPostId, page, size, sort },
      })
      .then((res) => res.data),

  getUserThemes: (userEmail: string, page: number, size: number) =>
    apiClient
      .get<IUserThemeRaw[]>(`/api/themes/user/${userEmail}`, { params: { page, size } })
      .then((res) => res.data),

  createThemeBoard: (formData: FormData) =>
    apiClient
      .post<IBoardCreateResponseRaw>('/api/theme-boards', formData)
      .then((res) => res.data),

  updateThemeBoard: (postId: number, formData: FormData) =>
    apiClient
      .put<IBoardCreateResponseRaw>(`/api/theme-boards/${postId}`, formData)
      .then((res) => res.data),

  deleteThemeBoard: (postId: number) =>
    apiClient
      .delete(`/api/theme-boards/${postId}`)
      .then((res) => res.data),
};
