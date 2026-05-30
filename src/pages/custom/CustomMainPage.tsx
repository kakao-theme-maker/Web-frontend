import CustomCategoryTab from "@/components/custom/CustomCategoryTab";
import type { ICategoryTab } from "@/types/custom/types";

import BackgroundIcon from "@/components/icons/custom/background.svg?react";
import ChatIcon from "@/components/icons/custom/chat.svg?react";
import ProfileIcon from "@/components/icons/custom/profile.svg?react";
import TabsIcon from "@/components/icons/custom/tab.svg?react";
import TextIcon from "@/components/icons/custom/text.svg?react";
import PreviewFriends from "@/components/preview/PreviewFriends";
import PreviewPasscode from "@/components/preview/PreviewPasscode";
import PreviewChatRoom from "@/components/preview/PreviewChatRoom";


const tabs: ICategoryTab[] = [
  { id: "background", icon: <BackgroundIcon />, label: "배경", href: "/custom/background" },
  { id: "profile", icon: <ProfileIcon />, label: "프로필", href: "/custom/profile" },
  { id: "tabs", icon: <TabsIcon />, label: "탭", href: "/custom/tabs" },
  { id: "chat", icon: <ChatIcon />, label: "채팅방", href: "/custom/chat" },
  { id: "text", icon: <TextIcon />, label: "텍스트", href: "/custom/text" },
];

export default function CustomMainPage() {
  return (
    <div className="flex items-center justify-center py-5">
      {/* <PreviewFriends /> */}
      {/* <PreviewPasscode /> */}
      <PreviewChatRoom />
      <div className="grid grid-cols-5 absolute bottom-0 w-full">
        {tabs.map(tab => (
          <CustomCategoryTab key={tab.id} icon={tab.icon} label={tab.label} href={tab.href} />
        ))}
      </div>
    </div>
  )
}
