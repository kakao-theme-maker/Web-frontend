// ※ API 엔드포인트 확인 후 실제 경로로 교체 필요
import apiClient from './apiClient';
import type { IDesignBoardRaw, IDesignBoardDetailRaw, IUserDesignComponentRaw, IDesignBoardCreateResponseRaw } from '../../types/community/design';

export const DesignService = {
  getDesignBoards: (page: number, size: number) =>
    apiClient
      .get<IDesignBoardRaw[]>('/api/design-boards', { params: { page, size } })
      .then((res) => res.data),

  getDesignBoardDetail: (postId: number) =>
    apiClient
      .get<IDesignBoardDetailRaw>(`/api/design-boards/${postId}`)
      .then((res) => res.data),

  deleteDesignBoard: (postId: number) =>
    apiClient
      .delete(`/api/design-boards/${postId}`)
      .then((res) => res.data),

  getUserDesignComponents: (userEmail: string, page: number, size: number) =>
    apiClient
      .get<IUserDesignComponentRaw[]>(`/api/design-components/user/${userEmail}`, { params: { page, size } })
      .then((res) => res.data),

  createDesignBoard: (formData: FormData) =>
    apiClient
      .post<IDesignBoardCreateResponseRaw>('/api/design-boards', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data),
};
