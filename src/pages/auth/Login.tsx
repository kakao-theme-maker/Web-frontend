import { useLogin } from '../../services/hooks/auth/useLogin';
import LoginForm from '../../components/auth/LoginForm';

export default function Login() {
  const { register, onSubmit, errors, isSubmitting } = useLogin();

  return (
    <LoginForm
      register={register}
      onSubmit={onSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
}
