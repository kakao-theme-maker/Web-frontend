import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../../stores/authStore";
import { usePostMutation } from "../../api/useApi";
import { AuthService } from "../../api/AuthService";
import type { ILoginFormData, IAuthResponse } from "../../../types/auth/types";

export function useLogin() {
  const navigate = useNavigate();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ILoginFormData>();

  const { mutate: loginMutate } = usePostMutation<IAuthResponse, ILoginFormData>(
    ({ email, password }) => AuthService.login(email, password),
    {
      onSuccess: (_data, variables) => {
        setAuthenticated(variables.email);
        navigate("/");
      },
      onError: () => {
        setError("root", { message: "아이디 또는 비밀번호가 올바르지 않습니다." });
      },
    },
  );

  const onSubmit = handleSubmit((formData) => loginMutate(formData));

  return { register, onSubmit, errors, isSubmitting };
}
