import HeaderIcon from "../components/icons/header/header.svg?react";
import BackArrowIcon from "../components/icons/header/back-arrow.svg?react";
import Text from "../components/common/Text";
import { useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";

interface IMobileHeaderProps {
  title: string;
  showBackArrow?: boolean;
  showMenuButton?: boolean;
  className?: string;
}

export default function MobileHeader({ title, showBackArrow, showMenuButton, className }: IMobileHeaderProps) {
  const navigate = useNavigate();
  return (
    <header className={cn("relative flex shrink-0 items-center justify-center bg-white px-4 pt-10", className)}>
      <div className="absolute left-4 flex h-6 w-6 items-center justify-center">
        {showBackArrow && (
          <button type="button" onClick={() => navigate(-1)} className="p-1" aria-label="뒤로가기">
            <BackArrowIcon />
          </button>
        )}
        {showMenuButton && !showBackArrow && (
          <button type="button" className="flex h-6 w-6 flex-col justify-center gap-[5px]" aria-label="메뉴 열기">
            <span className="h-[2px] w-[18px] rounded-full bg-black" />
            <span className="h-[2px] w-[18px] rounded-full bg-black" />
            <span className="h-[2px] w-[18px] rounded-full bg-black" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <HeaderIcon className="h-5 w-6" />
        <Text variant="SEMIBOLD_15">{title}</Text>
      </div>

      <div className="absolute right-4 w-6" />
    </header>
  )
}
