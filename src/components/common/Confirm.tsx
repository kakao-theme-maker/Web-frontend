import type { ReactNode } from "react";
import ConfirmIcon from "../icons/alert-confirm/confirm.svg?react";

interface IConfirmProps {
  message: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  onClose?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Confirm({
  message,
  onConfirm,
  onCancel,
  onClose,
  confirmText = "확인",
  cancelText = "취소",
}: IConfirmProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onClose ?? onCancel}>
      <div className="flex w-[280px] flex-col items-center gap-4 rounded-2xl bg-white px-6 py-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <ConfirmIcon />
        <p className="text-center text-[15px] font-medium leading-snug text-gray-800">
          {message}
        </p>
        <div className="flex w-full gap-2">
          <button
            onClick={onConfirm}
            className="flex-1 rounded-md bg-[#0352FF] py-2 text-[15px] font-semibold text-white"
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 rounded-md bg-gray-100 py-2 text-[15px] font-semibold text-gray-700"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
