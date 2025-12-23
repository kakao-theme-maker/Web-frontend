import { useRef } from "react";

interface CommonBtnProps {
  btnName: string;
  btnClass?: string;
  func?: () => void;
}

const CommonBtn = ({ btnName, btnClass, func }: CommonBtnProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const btnClick = async () => {
    if (func) {
      btnRef.current!.disabled = true;
      await func();
      if (btnRef.current) {
        btnRef.current!.disabled = false;
      }
    }
  };

  return (
    <button
      ref={btnRef}
      onClick={btnClick}
      className={`w-full bg-[#0352FF] text-[#fff] bold-500 text-[15px] text-center pt-[9px] pb-[9px] rounded-[5px] ${btnClass}`}
    >
      {btnName}
    </button>
  );
};

export default CommonBtn;
