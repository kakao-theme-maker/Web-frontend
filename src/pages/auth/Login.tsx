import { useLogin } from '../../services/hooks/auth/useLogin';
import { useKakaoLogin } from '../../services/hooks/auth/useKakaoLogin';
import LoginForm from '../../components/auth/LoginForm';

export default function Login() {
  const { register, onSubmit, errors, isSubmitting } = useLogin();
  const { handleKakaoLogin } = useKakaoLogin();

  return (
    <LoginForm
      register={register}
      onSubmit={onSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
      onKakaoLogin={handleKakaoLogin}
    />
  );
}
