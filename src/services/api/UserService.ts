import apiClient from './ApiClient';
import type { IUserProfileRaw, IUserPostListItemRaw } from '../../types/mypage/types';

export const UserService = {
  getMe: () =>
    apiClient
      .get<IUserProfileRaw>('/api/users/me')
      .then((res) => res.data),

  getSavedPosts: () =>
    apiClient
      .get<IUserPostListItemRaw[]>('/api/users/me/saved-posts')
      .then((res) => res.data),

  getPreferredPosts: () =>
    apiClient
      .get<IUserPostListItemRaw[]>('/api/users/me/prefered-posts')
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
