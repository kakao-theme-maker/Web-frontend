import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { usePostMutation } from "../../api/useApi";
import { AuthService } from "../../api/AuthService";
import type { ISignUpFormData } from "../../../types/auth/types";

export function useSignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ISignUpFormData>({ mode: 'onChange' });


  const isSubmittable = isValid;

  const { mutate: signUpMutate } = usePostMutation<void, ISignUpFormData>(
    ({ email, password }) => AuthService.signUp(email, password),
    {
      onSuccess: () => navigate("/login"),
      onError: () => setError("root", { message: "회원가입에 실패했습니다. 다시 시도해 주세요." }),
    },
  );

  const onSubmit = handleSubmit((formData) => signUpMutate(formData));

  return { register, watch, onSubmit, errors, isSubmitting, isSubmittable };
}
