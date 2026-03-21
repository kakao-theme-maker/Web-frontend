import axios from 'axios';
import { useAuthStore, REFRESH_TOKEN_KEY } from '../../stores/authStore';
import type { IApiError } from './types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── 요청 인터셉터 ────────────────────────────────────────────────────────────
// Zustand 메모리에서 accessToken을 읽어 Authorization 헤더에 자동 주입합니다.
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── 401 토큰 재발급 큐 ───────────────────────────────────────────────────────
// 재발급 중 동시에 실패한 요청들을 모아뒀다가 재발급 성공 후 일괄 재시도합니다.
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve(token!)));
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
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        useAuthStore.getState().clearAuth();
        isRefreshing = false;
        return Promise.reject(toApiError(error));
      }

      try {
        // 순환 참조 방지를 위해 axios raw 인스턴스로 직접 호출합니다.
        const { data } = await axios.post(`${BASE_URL}/api/auth/token`, { refreshToken });
        useAuthStore.getState().setAccessToken(data.accessToken, data.refreshToken);
        processQueue(null, data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
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
