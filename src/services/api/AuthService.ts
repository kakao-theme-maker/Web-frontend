import apiClient from './ApiClient';
import type { IAuthResponse } from '../../types/auth/types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export const AuthService = {
  /**
   * 로그인: 아이디/비밀번호로 인증 (서버가 httpOnly 쿠키로 토큰 설정)
   */
  login: (email: string, password: string) =>
    apiClient
      .post<IAuthResponse>('/api/auth/local/sign-in', { email, password })
      .then((res) => res.data),

  /**
   * 회원가입: 이메일/비밀번호로 계정 생성
   */
  signUp: (email: string, password: string) =>
    apiClient
      .post('/api/auth/local/sign-up', { email, password })
      .then((res) => res.data),

  /**
   * 로그아웃: 서버에서 httpOnly 쿠키 무효화
   */
  logout: () =>
    apiClient
      .post('/api/auth/local/sign-out')
      .then((res) => res.data),

  /**
   * 카카오 로그인 URL: 백엔드가 카카오 OAuth 페이지로 리다이렉트
   */
  getKakaoLoginUrl: () => `${BASE_URL}/oauth2/authorization/kakao`,

  /**
   * dev 전용: 테스트 토큰 발급 (개발 서버에서만 사용)
   */
  getDevToken: () =>
    apiClient
      .post<IAuthResponse>('/dev/users/auth')
      .then((res) => res.data),
};
