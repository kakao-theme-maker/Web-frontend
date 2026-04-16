import { useSignUp } from '../../services/hooks/auth/useSignUp';
import SignUpForm from '../../components/auth/SignUpForm';

export default function SignUp() {
  const { register, watch, onSubmit, errors, isSubmitting, isSubmittable } = useSignUp();

  return (
    <SignUpForm
      register={register}
      watch={watch}
      onSubmit={onSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
      isSubmittable={isSubmittable}
    />
  );
}
