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
};
