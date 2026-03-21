import apiClient from './apiClient';
import type { IAuthTokens } from '../../types/auth/types';

export const AuthService = {
  /**
   * 로그인: 아이디/비밀번호로 토큰 발급
   */
  login: (email: string, password: string) =>
    apiClient
      .post<IAuthTokens>('/api/auth/local/sign-in', { email, password })
      .then((res) => res.data),

  /**
   * 회원가입: 이메일/비밀번호로 계정 생성
   */
  signUp: (email: string, password: string) =>
    apiClient
      .post('/api/auth/local/sign-up', { email, password })
      .then((res) => res.data),

  /**
   * 토큰 재발급: refreshToken으로 accessToken + refreshToken 모두 재발급
   */
  refresh: (refreshToken: string) =>
    apiClient
      .post<IAuthTokens>('/api/auth/token', { refreshToken })
      .then((res) => res.data),

  /**
   * dev 전용: 테스트 토큰 발급 (개발 서버에서만 사용)
   */
  getDevToken: () =>
    apiClient
      .post<IAuthTokens>('/dev/users/auth')
      .then((res) => res.data),
};
