import apiClient from './ApiClient';
import type { IUserProfileRaw, IMyUploadPostRaw, ICustomComponentRaw } from '../../types/mypage/types';

interface IGetMyUploadPostsParams {
  page: number;
  size: number;
  sort?: 'asc' | 'desc';
}

interface IGetCustomComponentsParams {
  page: number;
  size: number;
  sort?: string[];
}

export const UserService = {
  getMe: () =>
    apiClient
      .get<IUserProfileRaw>('/api/users/me')
      .then((res) => res.data),

  getMyUploadPosts: ({ page, size, sort = 'desc' }: IGetMyUploadPostsParams) =>
    apiClient
      .get<IMyUploadPostRaw[]>('/api/users/me/upload-posts', { params: { page, size, sort } })
      .then((res) => res.data),

  getBookmarkedPosts: ({ page, size, sort = 'desc' }: IGetMyUploadPostsParams) =>
    apiClient
      .get<IMyUploadPostRaw[]>('/api/users/me/bookmarked-posts', { params: { page, size, sort } })
      .then((res) => res.data),

  getCustomComponents: ({ page, size, sort }: IGetCustomComponentsParams) =>
    apiClient
      .get<ICustomComponentRaw[]>('/api/users/me/custom-components', { params: { page, size, sort } })
      .then((res) => res.data),

  updateProfileImage: (file: File) => {
    const formData = new FormData();
    formData.append('profile_image', file);
    return apiClient
      .patch<IUserProfileRaw>('/api/users/me/profile-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data);
  },

  updateName: (name: string) =>
    apiClient
      .patch<IUserProfileRaw>('/api/users/me/name', { name })
      .then((res) => res.data),
};
