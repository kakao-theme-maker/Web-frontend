import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../stores/authStore";
import { AuthService } from "../api/AuthService";
import type { ILoginFormData } from "../../types/auth/types";

export function useLogin() {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ILoginFormData>();

  const onSubmit = async ({ email, password }: ILoginFormData) => {
    try {
      const { data } = await AuthService.login(email, password);
      setAccessToken(data.accessToken, data.refreshToken);
      navigate("/");
    } catch {
      setError("root", { message: "아이디 또는 비밀번호가 올바르지 않습니다." });
    }
  };

  return { register, handleSubmit, onSubmit, errors, isSubmitting };
}
