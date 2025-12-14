import { useState } from "react";
import CommonHeader from "../../components/common/header-and-footer/CommonHeader";
import ThemeSelectCard from "../../components/common/theme-card/ThemeSelectCard";
import { cn } from "../../utils/clsx/cn";
import CommonFooter from "../../components/common/header-and-footer/CommonFooter";

// 임시 데이터
const MOCK_THEMES = [
  {
    id: "1",
    title: "테마 이름",
    date: "2025.02.01",
    thumbnail: "",
  },
  {
    id: "2",
    title: "테마 이름",
    date: "2025.02.01",
    thumbnail: "",
  },
  {
    id: "3",
    title: "테마 이름",
    date: "2025.02.01",
    thumbnail: "",
  },
  {
    id: "4",
    title: "테마 이름",
    date: "2025.02.01",
    thumbnail: "",
  },
];

const ThemeWrite = () => {
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [selected, setSelected] = useState<boolean>(false);

  const handleThemeSelect = (id: string) => {
    setSelectedThemeId(id);
  };

  const handleComplete = () => {
    if (selectedThemeId) {
      // 선택 완료 후 처리 로직
      setSelected(true);
    }
  };

  return (
    <div className={cn("w-full h-full flex flex-col")}>
      <div className={cn("flex-1 overflow-y-auto flex flex-col")}>
        <CommonHeader title={"글 작성"} hasBackIcon />
        {selectedThemeId && selected ? (
          <></>
        ) : (
          <div className="theme__write__contents px-[20px] flex-1">
            <h1 className="mt-[20px] text-[18px] font-semibold mb-[30px]">
              글을 작성할 테마를 선택하세요
            </h1>
            <div className="flex flex-col gap-[12px] pb-[20px]">
              {MOCK_THEMES.map((theme) => (
                <ThemeSelectCard
                  key={theme.id}
                  id={theme.id}
                  title={theme.title}
                  date={theme.date}
                  thumbnail={theme.thumbnail}
                  isSelected={selectedThemeId === theme.id}
                  onSelect={handleThemeSelect}
                />
              ))}
            </div>
            {/* 선택완료 버튼 */}
            <div className="mt-[10px] mb-[20px] text-right">
              <button
                onClick={handleComplete}
                disabled={!selectedThemeId}
                className={cn(
                  "w-[120px] h-[32px] rounded-[12px] text-[16px] font-semibold transition-all",
                  selectedThemeId
                    ? "bg-[#3182F6] text-white"
                    : "bg-[#F1F3F5] text-[#ADB5BD] cursor-not-allowed"
                )}
              >
                선택완료
              </button>
            </div>
          </div>
        )}
      </div>
      <CommonFooter />
    </div>
  );
};

export default ThemeWrite;
