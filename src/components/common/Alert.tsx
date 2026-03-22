import type { ReactNode } from "react";
import AlertIcon from "../icons/alert-confirm/alert.svg?react";

interface IAlertProps {
  message: ReactNode;
  onConfirm: () => void;
  confirmText?: string;
}

export default function Alert({ message, onConfirm, confirmText = "확인" }: IAlertProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="flex w-[280px] flex-col items-center gap-4 rounded-2xl bg-white px-6 py-6 shadow-lg">
        <AlertIcon />
        <p className="text-center text-[15px] font-medium leading-snug text-gray-800">
          {message}
        </p>
        <button
          onClick={onConfirm}
          className="w-full rounded-md bg-[#0352FF] py-2 text-[15px] font-semibold text-white"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}
