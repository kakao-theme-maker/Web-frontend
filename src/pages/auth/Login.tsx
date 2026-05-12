import { useLogin } from '../../services/hooks/auth/useLogin';
import { useKakaoLogin } from '../../services/hooks/auth/useKakaoLogin';
import LoginForm from '../../components/auth/LoginForm';

export default function Login() {
  const { register, onSubmit, errors, isSubmitting } = useLogin();
  const { handleKakaoLogin } = useKakaoLogin();
  const localLoginEnv = import.meta.env.VITE_ENABLE_LOCAL_LOGIN;
  const isLocalLoginEnabled =
    localLoginEnv === 'true' || (localLoginEnv !== 'false' && import.meta.env.DEV);

  return (
    <LoginForm
      register={register}
      onSubmit={onSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
      onKakaoLogin={handleKakaoLogin}
      isLocalLoginEnabled={isLocalLoginEnabled}
    />
  );
}
