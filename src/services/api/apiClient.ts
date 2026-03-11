import axios from 'axios';
import type { IApiError } from './types';

// 프로젝트 전역에서 사용하는 axios 인스턴스
const apiClient = axios.create({
  // .env의 VITE_API_BASE_URL 값을 기본 주소로 사용합니다.
  // 값이 없으면 빈 문자열('')로 fallback → 상대 경로로 요청됩니다.
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',

  // 요청이 10초(10,000ms) 안에 응답이 없으면 자동으로 실패 처리합니다.
  timeout: 10_000,

  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * [요청 인터셉터] 모든 요청이 서버로 나가기 전에 실행됩니다.
 *
 * localStorage에 accessToken이 저장되어 있으면
 * Authorization 헤더에 Bearer 토큰을 자동으로 추가합니다.
 * 로그인이 필요한 API에서 매번 토큰을 직접 넣지 않아도 됩니다.
 */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * [응답 인터셉터] 서버 응답이 돌아온 후 실행됩니다.
 *
 * 성공 응답(2xx): 그대로 통과시킵니다.
 * 실패 응답(4xx, 5xx): axios의 기본 에러 객체를 IApiError 형태로 변환해
 * 일관된 에러 구조를 보장합니다.
 *
 * 변환하지 않으면 에러 처리할 때마다 error.response?.data?.message 같은
 * 깊은 접근을 반복해야 하므로, 여기서 한 번에 정리합니다.
 */
apiClient.interceptors.response.use(
  (response) => response, // 성공 시 그대로 반환
  (error) => {
    const apiError: IApiError = {
      // 네트워크 오류 등 response 자체가 없을 때는 0으로 처리합니다.
      status: error.response?.status ?? 0,
      // 서버가 보낸 message가 있으면 사용하고, 없으면 axios 기본 메시지를 씁니다.
      message: error.response?.data?.message ?? error.message,
      // 필드별 유효성 에러가 있을 경우 함께 전달합니다.
      errors: error.response?.data?.errors,
    };
    return Promise.reject(apiError);
  },
);

export default apiClient;
