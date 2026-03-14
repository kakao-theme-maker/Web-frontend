import apiClient from './apiClient';
import type { IAuthTokens } from '../../types/auth/types';

export const AuthService = {
  /**
   * 로그인: 아이디/비밀번호로 토큰 발급
   */
  login: (email: string, password: string) =>
    apiClient.post<IAuthTokens>('/api/auth/local/sign-in', { email, password }),

  /**
   * 회원가입: 이메일/비밀번호로 계정 생성
   */
  signUp: (email: string, password: string) =>
    apiClient.post('/api/auth/local/sign-up', { email, password }),

  /**
   * 토큰 재발급: refreshToken으로 accessToken + refreshToken 모두 재발급
   * (apiClient 인터셉터에서도 직접 axios를 사용하지만,
   *  앱 초기화 시 UseAuthInit에서는 이 메서드를 사용합니다)
   */
  refresh: (refreshToken: string) =>
    apiClient.post<IAuthTokens>('/api/auth/token', { refreshToken }),

  /**
   * dev 전용: 테스트 토큰 발급 (개발 서버에서만 사용)
   */
  getDevToken: () =>
    apiClient.post<IAuthTokens>('/dev/users/auth'),
};
