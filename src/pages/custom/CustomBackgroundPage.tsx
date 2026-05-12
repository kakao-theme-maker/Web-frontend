import CustomAsset from "@/components/custom/CustomAsset";
import CustomSubCategoryTab from "@/components/custom/CustomSubCategoryTab";
import type { ISubCategoryTab } from "@/types/custom/types";
import { useNavigate } from "react-router-dom";
import BackArrowIcon from "@/components/icons/header/back-arrow.svg?react";

const tabs: ISubCategoryTab[] = [
  { id: "background", label: "배경" },
  { id: "profile", label: "프로필" },
  { id: "tabs", label: "탭" },
];


export default function CustomBackgroundPage() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="flex shrink-0 items-center justify-between px-4 pt-10 pb-2">
        <button onClick={() => navigate(-1)} className="p-1">
          <BackArrowIcon />
        </button>
      </header>

      <div className="absolute bottom-0 w-full flex flex-col">

        <div className="grid grid-cols-5 bg-blue-400">
          {tabs.map(tab => (
            <CustomSubCategoryTab key={tab.id} label={tab.label} />
          ))}

        </div>
        {/* 예시용 */}
        <div className="w-full h-48 bg-blue-400 p-4 grid grid-cols-4 gap-4 overflow-y-auto">
          <CustomAsset />
          <CustomAsset />
          <CustomAsset />
          <CustomAsset />
          <CustomAsset />
          <CustomAsset />
          <CustomAsset />
          <CustomAsset />
          <CustomAsset />
        </div>
      </div>
    </div>

  )
}
