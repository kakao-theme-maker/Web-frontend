import apiClient from './apiClient';
import type { ICommentRaw } from '../../types/community/theme';

export const BoardInteractionService = {
  preferBoard: (boardId: number) =>
    apiClient
      .post(`/api/posts/${boardId}/prefer`)
      .then((res) => res.data),

  unpreferBoard: (boardId: number) =>
    apiClient
      .delete(`/api/posts/${boardId}/prefer`)
      .then((res) => res.data),

  getComments: (boardId: number, pageNumber: number, pageSize: number) =>
    apiClient
      .get<ICommentRaw[]>(`/api/posts/${boardId}/comments`, { params: { pageNumber, pageSize } })
      .then((res) => res.data),

  createComment: (boardId: number, content: string) =>
    apiClient
      .post<ICommentRaw>(`/api/posts/${boardId}/comments`, { content })
      .then((res) => res.data),

  deleteComment: (commentId: number) =>
    apiClient
      .delete<ICommentRaw>(`/api/posts/comments/${commentId}`)
      .then((res) => res.data),

  updateComment: (commentId: number, content: string) =>
    apiClient
      .put<ICommentRaw>(`/api/posts/comments/${commentId}`, { content })
      .then((res) => res.data),
};
