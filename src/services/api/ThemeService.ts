import apiClient from './apiClient';
import type { IThemeBoardRaw, IThemeBoardDetailRaw, ICommentRaw, IUserThemeRaw, IBoardCreateResponseRaw } from '../../types/community/theme';

export const ThemeService = {
  getThemeBoards: (page: number, size: number) =>
    apiClient
      .get<IThemeBoardRaw[]>('/api/theme-boards', { params: { page, size } })
      .then((res) => res.data),

  getThemeBoardDetail: (postId: number) =>
    apiClient
      .get<IThemeBoardDetailRaw>(`/api/theme-boards/${postId}`)
      .then((res) => res.data),

  getComments: (postId: number, pageNumber: number, pageSize: number) =>
    apiClient
      .get<ICommentRaw[]>(`/api/posts/${postId}/comments`, { params: { pageNumber, pageSize } })
      .then((res) => res.data),

  createComment: (postId: number, content: string) =>
    apiClient
      .post<ICommentRaw>(`/api/posts/${postId}/comments`, { content })
      .then((res) => res.data),

  deleteComment: (commentId: number) =>
    apiClient
      .delete<ICommentRaw>(`/api/posts/comments/${commentId}`)
      .then((res) => res.data),

  updateComment: (commentId: number, content: string) =>
    apiClient
      .put<ICommentRaw>(`/api/posts/comments/${commentId}`, { content })
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

  preferPost: (postId: number) =>
    apiClient
      .post(`/api/posts/${postId}/prefer`)
      .then((res) => res.data),

  unpreferPost: (postId: number) =>
    apiClient
      .delete(`/api/posts/${postId}/prefer`)
      .then((res) => res.data),
};
