import HeaderIcon from "../components/icons/header/header.svg?react";
import BackArrowIcon from "../components/icons/header/back-arrow.svg?react";
import Text from "../components/common/Text";
import { useNavigate } from "react-router-dom";

interface IMobileHeaderProps {
  title: string;
  showBackArrow?: boolean;
}

export default function MobileHeader({ title, showBackArrow }: IMobileHeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="relative flex shrink-0 items-center justify-center bg-white px-4 pt-10">
      {/* 왼쪽 영역: 뒤로가기 버튼 */}
      <div className="absolute left-4">
        {showBackArrow && (
          <button onClick={() => navigate(-1)} className="p-1">
            <BackArrowIcon />
          </button>
        )}
      </div>

      {/* 중앙 영역: 로고+제목 */}
      <div className="flex items-center gap-2">
        <HeaderIcon className="h-5 w-6" />
        <Text variant="SEMIBOLD_15">{title}</Text>
      </div>

      {/* 오른쪽 영역(현재 비어있음) */}
      <div className="absolute right-4 w-6" />
    </header>
  )
}
