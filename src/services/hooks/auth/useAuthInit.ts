import { useEffect, useState } from 'react';
import { useAuthStore, REFRESH_TOKEN_KEY } from '../../../stores/authStore';
import { AuthService } from '../../api/AuthService';

/**
 * 앱 최초 마운트 시 localStorage의 refreshToken을 확인하고,
 * 유효하면 새 토큰 쌍을 발급받아 Zustand store에 저장합니다.
 *
 * 초기화가 완료되기 전까지 isInitialized = false를 반환해
 * ProtectedRoutes가 /login으로 섣불리 리다이렉트하지 않도록 합니다.
 */
export function useAuthInit() {
  const [isInitialized, setIsInitialized] = useState(false);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const init = async () => {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

      if (refreshToken) {
        try {
          const data = await AuthService.refresh(refreshToken);
          setAccessToken(data.accessToken, data.refreshToken);
        } catch {
          // refreshToken이 만료되었거나 유효하지 않으면 비인증 상태 유지
          localStorage.removeItem(REFRESH_TOKEN_KEY);
        }
      }

      setIsInitialized(true);
    };

    init();
  }, [setAccessToken]);

  return isInitialized;
}
