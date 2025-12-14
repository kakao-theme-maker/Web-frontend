import { cn } from "../../../utils/clsx/cn";
import Icon from "../../icons";

interface ThemeSelectCardProps {
  id: string;
  title: string;
  date: string;
  thumbnail?: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  imageSize?: {
    width: number;
    height: number;
  };
}

const ThemeSelectCard = ({
  id,
  title,
  date,
  thumbnail,
  isSelected,
  onSelect,
  imageSize = { width: 76, height: 81 },
}: ThemeSelectCardProps) => {
  return (
    <button
      onClick={() => onSelect(id)}
      className={cn(
        "w-full px-[20px] py-[16px] rounded-[12px] flex items-center gap-[16px]",
        "border border-solid transition-all",
        isSelected
          ? "bg-[#3182F6] border-[#3182F6]"
          : "bg-white border-[#E5E8EB]"
      )}
    >
      {/* 체크박스 */}
      <div
        className={cn(
          "w-[24px] h-[24px] rounded-[6px] flex items-center justify-center flex-shrink-0",
          "border-2 border-solid transition-all",
          isSelected
            ? "bg-white border-white"
            : "bg-transparent border-[#D1D5DB]"
        )}
      >
        {isSelected && (
          <Icon icon="CHECK" className="w-[16px] h-[16px] text-[#3182F6]" />
        )}
      </div>

      {/* 텍스트 영역 */}
      <div className="flex-1 text-left">
        <h3
          className={cn(
            "text-[16px] font-semibold mb-[4px]",
            isSelected ? "text-white" : "text-[#1F2937]"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-[14px]",
            isSelected ? "text-white/80" : "text-[#6B7280]"
          )}
        >
          {date}
        </p>
      </div>

      {/* 썸네일 이미지 */}
      <div
        className={cn(
          "rounded-[8px] flex-shrink-0 overflow-hidden",
          "bg-[#F3F4F6]"
        )}
        style={{
          width: `${imageSize.width}px`,
          height: `${imageSize.height}px`,
        }}
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#E5E8EB]"></div>
        )}
      </div>
    </button>
  );
};

export default ThemeSelectCard;
