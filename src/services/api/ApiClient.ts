import axios from 'axios';
import { useAuthStore } from '../../stores/authStore';
import type { IApiError } from './types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  withCredentials: true,
});

// ─── 401 토큰 재발급 큐 ───────────────────────────────────────────────────────
// 재발급 중 동시에 실패한 요청들을 모아뒀다가 재발급 성공 후 일괄 재시도합니다.
let isRefreshing = false;
let failedQueue: Array<{ resolve: () => void; reject: (err: unknown) => void }> = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve()));
  failedQueue = [];
};

// ─── 응답 인터셉터 ────────────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401이고 아직 재시도하지 않은 요청만 처리합니다.
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 재발급 중인 경우 → 큐에 넣고 대기
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => apiClient(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 순환 참조 방지를 위해 axios raw 인스턴스로 직접 호출합니다.
        // httpOnly 쿠키가 자동으로 전송되므로 body에 토큰 불필요합니다.
        await axios.post(`${BASE_URL}/api/auth/token`, {}, { withCredentials: true });
        useAuthStore.getState().setAuthenticated();
        processQueue(null);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        // 서버 httpOnly 쿠키 무효화 (best-effort)
        // 순환 참조 방지를 위해 raw axios 사용, 실패해도 무시
        try {
          await axios.post(`${BASE_URL}/api/auth/local/sign-out`, {}, { withCredentials: true });
        } catch {
          // sign-out 실패는 무시 — 클라이언트 상태 초기화가 우선
        }

        useAuthStore.getState().clearAuth();
        return Promise.reject(toApiError(refreshError));
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(toApiError(error));
  },
);

const toApiError = (error: unknown): IApiError => {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status ?? 0,
      message: error.response?.data?.message ?? error.message,
      errors: error.response?.data?.errors,
    };
  }
  return { status: 0, message: '알 수 없는 오류가 발생했습니다.' };
};

export default apiClient;
