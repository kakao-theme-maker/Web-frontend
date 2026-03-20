import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BackArrowIcon from "../../components/icons/header/back-arrow.svg?react";
import type { ISignUpFormData } from "../../types/auth/types";
import Text from "../../components/common/Text";
import Button from "../../components/common/Button";

const ID_PATTERN = /^[a-zA-Z0-9]{6,12}$/;
const PW_PATTERN =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()\-_=+\[\]{};':"\\|,.<>/?]{8,20}$/;

const CHECKBOXES = [
  { key: "age" as const, label: "만 14세 이상입니다." },
  { key: "terms" as const, label: "서비스 이용약관에 동의" },
  { key: "privacy" as const, label: "개인정보 수집 이용에 동의" },
];

export default function SignUp() {
  const navigate = useNavigate();
  const [checks, setChecks] = useState({ age: false, terms: false, privacy: false });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ISignUpFormData>({ mode: "onChange" });

  const allChecked = CHECKBOXES.every(({ key }) => checks[key]);
  const isSubmittable = isValid && allChecked;

  const toggleCheck = (key: keyof typeof checks) =>
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));

  const onSubmit = (_data: ISignUpFormData) => {
    // UI only
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* 헤더 */}
      <header className="flex shrink-0 items-center justify-between px-4 pt-10 pb-2">
        <button onClick={() => navigate(-1)} className="p-1">
          <BackArrowIcon />
        </button>
      </header>

      {/* 컨텐츠 */}
      <div className="scrollbar-hidden flex-1 overflow-y-auto px-6 pb-8">
        <section className="flex flex-col gap-2">
          <Text variant="BOLD_24" className="text-primary">KOMENTUM</Text>
          <Text variant="BOLD_20">회원가입</Text>
        </section>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-3">
          {/* 이름 */}
          <input
            type="text"
            placeholder="이름"
            {...register("name", { required: true })}
            className="w-full rounded-lg border border-secondary-300 px-4 py-2 text-[14px] outline-none focus:border-primary"
          />

          {/* 아이디 */}
          <div>
            <input
              type="text"
              placeholder="아이디"
              {...register("userId", { required: true, pattern: ID_PATTERN })}
              className={`w-full rounded-lg border px-4 py-2 text-[14px] outline-none focus:border-primary ${
                errors.userId ? "border-red-400" : "border-secondary-300"
              }`}
            />
            <p className={`mt-1 text-[12px] ${errors.userId ? "text-red-500" : "text-gray-400"}`}>
              6-12자 영문, 숫자로 입력해 주세요
            </p>
          </div>

          {/* 비밀번호 */}
          <input
            type="password"
            placeholder="비밀번호"
            {...register("password", { required: true, pattern: PW_PATTERN })}
            className={`w-full rounded-lg border px-4 py-2 text-[14px] outline-none focus:border-primary ${
              errors.password ? "border-red-400" : "border-secondary-300"
            }`}
          />

          {/* 비밀번호 확인 */}
          <div>
            <input
              type="password"
              placeholder="비밀번호 확인"
              {...register("passwordConfirm", {
                required: true,
                validate: (value) => value === watch("password"),
              })}
              className={`w-full rounded-lg border px-4 py-2 text-[14px] outline-none focus:border-primary ${
                errors.passwordConfirm ? "border-red-400" : "border-secondary-300"
              }`}
            />
            <p
              className={`mt-1 text-[12px] ${
                errors.password || errors.passwordConfirm ? "text-red-500" : "text-gray-400"
              }`}
            >
              비밀번호는 영문 대소문자, 숫자, 특수문자를 조합하여 8-20자로 입력해 주세요
            </p>
          </div>

          {/* 체크박스 */}
          <div className="mt-3 flex flex-col gap-2">
            {CHECKBOXES.map(({ key, label }) => (
              <label key={key} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={checks[key]}
                  onChange={() => toggleCheck(key)}
                  className="h-4 w-4 cursor-pointer accent-primary"
                />
                <span className="text-[14px] text-gray-700">{label}</span>
              </label>
            ))}
          </div>

          {/* 제출 버튼 */}
          <Button type="submit" fullWidth disabled={!isSubmittable} className="mt-4">
            다음
          </Button>
        </form>
      </div>
    </div>
  );
}
