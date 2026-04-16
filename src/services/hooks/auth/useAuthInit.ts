import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../stores/authStore';
import { UserService } from '../../api/UserService';

/**
 * 앱 최초 마운트 시 사용자 정보를 조회해 인증 상태를 복구합니다.
 * httpOnly 쿠키 방식이므로 쿠키가 유효하면 서버가 자동으로 인증을 처리합니다.
 *
 * 초기화가 완료되기 전까지 isInitialized = false를 반환해
 * ProtectedRoutes가 /login으로 섣불리 리다이렉트하지 않도록 합니다.
 */
export function useAuthInit() {
  const [isInitialized, setIsInitialized] = useState(false);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await UserService.getMe();
        setAuthenticated(data.user_email);
      } catch {
        // 쿠키가 없거나 만료된 경우 → 비인증 상태 유지
      }

      setIsInitialized(true);
    };

    init();
  }, [setAuthenticated]);

  return isInitialized;
}
