import apiClient from './apiClient';
import type { IUserProfileRaw } from '../../types/mypage/types';

export const UserService = {
  getMe: () =>
    apiClient
      .get<IUserProfileRaw>('/api/users/me')
      .then((res) => res.data),
};
