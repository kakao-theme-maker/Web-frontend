import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { AuthService } from '../../services/api/AuthService';

export default function KakaoCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  useEffect(() => {
    const handleCallback = async () => {
      console.log("TEST");
      const error = searchParams.get('error');

      if (error) {
        navigate('/login', { replace: true });
        return;
      }

      try {
        // 백엔드가 이미 httpOnly 쿠키를 설정한 상태이므로 refresh로 인증 확인
        const data = await AuthService.refresh();
        setAuthenticated(data?.email);
        navigate('/', { replace: true });
      } catch {
        navigate('/login', { replace: true });
      }
    };

    handleCallback();
  }, [navigate, searchParams, setAuthenticated]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
