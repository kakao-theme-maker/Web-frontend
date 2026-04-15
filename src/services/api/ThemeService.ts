import apiClient from './apiClient';
import type { IThemeBoardRaw, IThemeBoardDetailRaw, IUserThemeRaw, IBoardCreateResponseRaw } from '../../types/community/theme';

export const ThemeService = {
  getThemeBoards: (page: number, size: number) =>
    apiClient
      .get<IThemeBoardRaw[]>('/api/theme-boards', { params: { page, size } })
      .then((res) => res.data),

  getThemeBoardDetail: (postId: number) =>
    apiClient
      .get<IThemeBoardDetailRaw>(`/api/theme-boards/${postId}`)
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
