import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { UserService } from '../../services/api/UserService';

export default function KakaoCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  useEffect(() => {
    const handleCallback = async () => {
      const error = searchParams.get('error');

      if (error) {
        navigate('/login', { replace: true });
        return;
      }

      try {
        const data = await UserService.getMe();
        setAuthenticated(data.user_email);
        navigate('/', { replace: true });
      } catch {
        navigate('/login', { replace: true });
      }
    };

    handleCallback();
  }, [searchParams, navigate, setAuthenticated]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
