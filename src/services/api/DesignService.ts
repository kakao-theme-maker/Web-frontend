// ※ API 엔드포인트 확인 후 실제 경로로 교체 필요
import apiClient from './ApiClient';
import type { IDesignBoardRaw, IDesignBoardDetailsRaw, IUserDesignComponentRaw, IDesignBoardCreateResponseRaw } from '../../types/community/design';

interface IGetDesignBoardDetailsParams {
  pinnedPostId: number;
  page: number;
  size: number;
  sort?: 'asc' | 'desc';
}

export const DesignService = {
  getDesignBoards: (page: number, size: number) =>
    apiClient
      .get<IDesignBoardRaw[]>('/api/design-boards', { params: { page, size } })
      .then((res) => res.data),

  getDesignBoardDetails: ({ pinnedPostId, page, size, sort = 'desc' }: IGetDesignBoardDetailsParams) =>
    apiClient
      .get<IDesignBoardDetailsRaw[]>('/api/design-boards/details', {
        params: { pinned_post_id: pinnedPostId, page, size, sort },
      })
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
      .post<IDesignBoardCreateResponseRaw>('/api/design-boards', formData)
      .then((res) => res.data),

  updateDesignBoard: (postId: number, formData: FormData) =>
    apiClient
      .patch<IDesignBoardCreateResponseRaw>(`/api/design-boards/${postId}`, formData)
      .then((res) => res.data),
};
