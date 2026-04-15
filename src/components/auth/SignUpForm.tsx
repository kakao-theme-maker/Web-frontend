import { useNavigate } from 'react-router-dom';
import type { UseFormRegister, UseFormWatch, FieldErrors } from 'react-hook-form';
import BackArrowIcon from '../icons/header/back-arrow.svg?react';
import Text from '../common/Text';
import Button from '../common/Button';
import type { ISignUpFormData } from '../../types/auth/types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PW_PATTERN =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()\-_=+[\]{};':"\\|,.<>/?]{8,20}$/;

const CHECKBOXES = [
  { key: 'age' as const, label: '만 14세 이상입니다.' },
  { key: 'terms' as const, label: '서비스 이용약관에 동의' },
  { key: 'privacy' as const, label: '개인정보 수집 이용에 동의' },
];

interface ISignUpFormProps {
  register: UseFormRegister<ISignUpFormData>;
  watch: UseFormWatch<ISignUpFormData>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  errors: FieldErrors<ISignUpFormData>;
  isSubmitting: boolean;
  isSubmittable: boolean;
}

export default function SignUpForm({ register, watch, onSubmit, errors, isSubmitting, isSubmittable }: ISignUpFormProps) {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-white">
      {/* 헤더 */}
      <header className="flex shrink-0 items-center justify-between px-4 pt-10 pb-2">
        <button onClick={() => navigate(-1)} className="p-1">
          <BackArrowIcon />
        </button>
      </header>

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto px-6 pb-8 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
        <section className="flex flex-col gap-2">
          <Text variant="BOLD_24" className="text-primary">KOMENTUM</Text>
          <Text variant="BOLD_20">회원가입</Text>
        </section>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
          {/* 이름 */}
          <input
            type="text"
            placeholder="이름"
            {...register('name', { required: true })}
            className="w-full rounded-lg border border-secondary-300 px-4 py-2 text-[14px] outline-none focus:border-primary"
          />

          {/* 이메일 */}
          <div>
            <input
              type="text"
              placeholder="이메일"
              {...register('email', { required: true, pattern: EMAIL_PATTERN })}
              className={`w-full rounded-lg border px-4 py-2 text-[14px] outline-none focus:border-primary ${
                errors.email && watch('email') ? 'border-red-400' : 'border-secondary-300'
              }`}
            />
            <p className={`mt-1 text-[12px] ${errors.email && watch('email') ? 'text-red-500' : 'text-gray-400'}`}>
              올바른 이메일 형식으로 입력해 주세요
            </p>
          </div>

          {/* 비밀번호 */}
          <input
            type="password"
            placeholder="비밀번호"
            {...register('password', { required: true, pattern: PW_PATTERN })}
            className={`w-full rounded-lg border px-4 py-2 text-[14px] outline-none focus:border-primary ${
              errors.password && watch('password') ? 'border-red-400' : 'border-secondary-300'
            }`}
          />

          {/* 비밀번호 확인 */}
          <div>
            <input
              type="password"
              placeholder="비밀번호 확인"
              {...register('passwordConfirm', {
                required: true,
                validate: (value) => value === watch('password'),
              })}
              className={`w-full rounded-lg border px-4 py-2 text-[14px] outline-none focus:border-primary ${
                errors.passwordConfirm && watch('passwordConfirm') ? 'border-red-400' : 'border-secondary-300'
              }`}
            />
            <p
              className={`mt-1 text-[12px] ${
                (errors.password && watch('password')) || (errors.passwordConfirm && watch('passwordConfirm'))
                  ? 'text-red-500'
                  : 'text-gray-400'
              }`}
            >
              {errors.passwordConfirm && watch('passwordConfirm') && !errors.password
                ? '비밀번호가 일치하지 않습니다'
                : '비밀번호는 영문 대소문자, 숫자, 특수문자를 조합하여 8-20자로 입력해 주세요'}
            </p>
          </div>

          {/* 체크박스 */}
          <div className="mt-3 flex flex-col gap-2">
            {CHECKBOXES.map(({ key, label }) => (
              <label key={key} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  {...register(key, { required: true })}
                  className="h-4 w-4 cursor-pointer accent-primary"
                />
                <span className="text-[14px] text-gray-700">{label}</span>
              </label>
            ))}
          </div>

          {errors.root && (
            <p className="text-center text-[12px] text-red-500">{errors.root.message}</p>
          )}

          {/* 제출 버튼 */}
          <Button type="submit" fullWidth disabled={!isSubmittable || isSubmitting} className="mt-4">
            {isSubmitting ? '처리 중...' : '다음'}
          </Button>
        </form>
      </div>
    </div>
  );
}
