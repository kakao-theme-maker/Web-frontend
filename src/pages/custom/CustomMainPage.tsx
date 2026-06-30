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
import PreviewChatRoomList from "@/components/preview/PreviewChatRoomList";


const tabs: ICategoryTab[] = [
  { id: "chatRoom", icon: <TabsIcon />, label: "채팅", href: "/custom/chat-room" },
  { id: "chatRoomList", icon: <TabsIcon />, label: "채팅 목록", href: "/custom/chat-room-list" },
  { id: "feed", icon: <TabsIcon />, label: "소식", href: "/custom/feed" },
  { id: "friends", icon: <TabsIcon />, label: "친구", href: "/custom/friends" },
  { id: "header", icon: <TabsIcon />, label: "헤더", href: "/custom/header" },
  { id: "notice", icon: <TabsIcon />, label: "알림", href: "/custom/notice" },
  { id: "passcode", icon: <TabsIcon />, label: "잠금화면", href: "/custom/passcode" },
  { id: "tabBar", icon: <TabsIcon />, label: "탭", href: "/custom/tab-bar" },
];

export default function CustomMainPage() {
  return (
    <div className="flex items-center justify-center py-5">
      {/* <PreviewFriends /> */}
      {/* <PreviewPasscode /> */}
      {/* <PreviewChatRoom /> */}
      <PreviewChatRoomList />
      <div className="flex overflow-x-auto absolute bottom-0 w-full">
        {tabs.map(tab => (
          <CustomCategoryTab key={tab.id} icon={tab.icon} label={tab.label} href={tab.href} />
        ))}
      </div>
    </div>
  )
}
