import CustomCategoryTab from "../../components/custom/CustomCategoryTab";
import type { ICategoryTab } from "../../types/custom/types";

import BackgroundIcon from "../../components/icons/custom/background.svg?react";
import ChatIcon from "../../components/icons/custom/chat.svg?react";
import ProfileIcon from "../../components/icons/custom/profile.svg?react";
import TabsIcon from "../../components/icons/custom/tab.svg?react";
import TextIcon from "../../components/icons/custom/text.svg?react";


const tabs: ICategoryTab[] = [
  { id: "background", icon: <BackgroundIcon />, label: "배경" },
  { id: "profile", icon: <ProfileIcon />, label: "프로필" },
  { id: "tabs", icon: <TabsIcon />, label: "탭" },
  { id: "chat", icon: <ChatIcon />, label: "채팅방" },

  { id: "text", icon: <TextIcon />, label: "텍스트" },
];

export default function CustomMainPage() {
  return (
    <div>
      CustomMain
      <div className="grid grid-cols-5 absolute bottom-0 w-full">
        {tabs.map(tab => (
          <CustomCategoryTab key={tab.id} icon={tab.icon} label={tab.label} />
        ))}
      </div>

    </div>
  )
}
