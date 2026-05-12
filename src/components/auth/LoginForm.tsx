import { Link } from 'react-router-dom';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import LoginLogoIcon from '../icons/login/login-logo.svg?react';
import LoginBottomIcon from '../icons/login/login-bottom.svg?react';
import KakaoLogo from '../icons/KakaoLogo';
import Text from '../common/Text';
import Button from '../common/Button';
import type { ILoginFormData } from '../../types/auth/types';

interface ILoginFormProps {
  register: UseFormRegister<ILoginFormData>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  errors: FieldErrors<ILoginFormData>;
  isSubmitting: boolean;
  onKakaoLogin: () => void;
  isLocalLoginEnabled: boolean;
}

export default function LoginForm({
  register,
  onSubmit,
  errors,
  isSubmitting,
  onKakaoLogin,
  isLocalLoginEnabled,
}: ILoginFormProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-white via-[#f0f5ff] to-[#dce8ff]">
      {/* 로고 영역 */}
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
      <div className="flex flex-col gap-3 px-8 pb-44">
        {isLocalLoginEnabled && (
          <>
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="이메일"
                aria-label="이메일"
                {...register('email', { required: true })}
                className="w-full rounded-xl border border-secondary-300 bg-white px-4 py-3 text-[14px] shadow-sm outline-none focus:border-primary"
              />
              <input
                type="password"
                placeholder="비밀번호"
                aria-label="비밀번호"
                {...register('password', { required: true })}
                className="w-full rounded-xl border border-secondary-300 bg-white px-4 py-3 text-[14px] shadow-sm outline-none focus:border-primary"
              />
              {errors.root && (
                <p className="text-center text-[12px] text-red-500">{errors.root.message}</p>
              )}
              <Button type="submit" isFullWidth disabled={isSubmitting} className="mt-1 shadow-sm">
                {isSubmitting ? '로그인 중...' : '로그인'}
              </Button>
              <p className="text-center text-[13px] text-gray-400">
                계정이 없으신가요?{' '}
                <Link to="/signup" className="font-semibold text-primary">
                  회원가입
                </Link>
              </p>
            </form>

            {/* 구분선 */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-[12px] text-gray-400">또는</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          </>
        )}

        {/* 카카오 로그인 버튼 */}
        <button
          type="button"
          onClick={onKakaoLogin}
          className="relative z-[999] flex w-full items-center justify-center gap-2 rounded-xl bg-[#FEE500] py-3 text-[14px] font-semibold text-[#191919] shadow-sm"
        >
          <KakaoLogo className="h-5 w-5" />
          카카오로 로그인
        </button>
      </div>

      {/* 하단 우측 일러스트 */}
      <div className="absolute bottom-0 right-0">
        <LoginBottomIcon className="h-44 w-44" />
      </div>
    </div>
  );
}
