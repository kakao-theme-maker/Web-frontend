import { Link } from "react-router-dom";
import LoginLogoIcon from "../../components/icons/login/login-logo.svg?react";
import LoginBottomIcon from "../../components/icons/login/login-bottom.svg?react";
import Text from "../../components/common/Text";
import { useLogin } from "../../services/hooks/useLogin";

export default function Login() {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useLogin();

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-white via-[#f0f5ff] to-[#dce8ff]">
      {/* 로고 영역 - 상단 중앙 */}
      <div className="flex flex-col items-center justify-center gap-3 pt-20 pb-12">
        <div className="flex">
          <Text variant="REGULAR_16" className="text-primary">내&nbsp;</Text>
          <Text variant="BOLD_16" className="text-primary">스타일,&nbsp;</Text>
          <Text variant="REGULAR_16" className="text-primary">내&nbsp;</Text>
          <Text variant="BOLD_16" className="text-primary">카카오톡</Text>
        </div>
        <div className="flex flex-col items-center gap-2">
          <LoginLogoIcon className="h-24 w-24" />
          <Text variant="BOLD_24" className="text-primary">KOMENTUM</Text>
        </div>
      </div>

      {/* 폼 영역 */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 px-8 pb-44">
        <input
          type="text"
          placeholder="이메일"
          {...register("email", { required: true })}
          className="w-full rounded-xl border border-secondary-300 bg-white px-4 py-3 text-[14px] shadow-sm outline-none focus:border-primary"
        />
        <input
          type="password"
          placeholder="비밀번호"
          {...register("password", { required: true })}
          className="w-full rounded-xl border border-secondary-300 bg-white px-4 py-3 text-[14px] shadow-sm outline-none focus:border-primary"
        />
        {errors.root && (
          <p className="text-center text-[12px] text-red-500">{errors.root.message}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 w-full rounded-xl bg-primary py-3 text-[15px] font-semibold text-white shadow-sm disabled:opacity-60"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>
        <p className="text-center text-[13px] text-gray-400">
          계정이 없으신가요?{" "}
          <Link to="/signup" className="font-semibold text-primary">
            회원가입
          </Link>
        </p>
      </form>

      {/* 하단 우측 일러스트 */}
      <div className="absolute bottom-0 right-0">
        <LoginBottomIcon className="h-44 w-44" />
      </div>
    </div>
  );
}
