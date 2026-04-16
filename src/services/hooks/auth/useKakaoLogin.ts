import { AuthService } from '../../api/AuthService';

export function useKakaoLogin() {
  const handleKakaoLogin = () => {
    window.location.href = AuthService.getKakaoLoginUrl();
  };

  return { handleKakaoLogin };
}
