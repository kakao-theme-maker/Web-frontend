import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../stores/authStore";
import { usePostMutation } from "../api/useApi";
import { AuthService } from "../api/AuthService";
import type { ILoginFormData, IAuthTokens } from "../../types/auth/types";

export function useLogin() {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ILoginFormData>();

  const { mutate: loginMutate } = usePostMutation<IAuthTokens, ILoginFormData>(
    ({ email, password }) => AuthService.login(email, password),
    {
      onSuccess: (data) => {
        setAccessToken(data.accessToken, data.refreshToken);
        navigate("/");
      },
      onError: () => {
        setError("root", { message: "아이디 또는 비밀번호가 올바르지 않습니다." });
      },
    },
  );

  const onSubmit = handleSubmit((formData) => loginMutate(formData));

  return { register, handleSubmit, onSubmit, errors, isSubmitting };
}
