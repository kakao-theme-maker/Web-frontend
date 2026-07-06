import { Outlet } from "react-router-dom";
import TabsIcon from "@/components/icons/custom/tab.svg?react";
import type { ICategoryTab } from "@/types/custom/types";
import CustomCategoryTab from "@/components/custom/CustomCategoryTab";

const tabs: ICategoryTab[] = [
  { id: "passcode", icon: <TabsIcon />, label: "잠금화면", href: "/custom/passcode" },
  { id: "friends", icon: <TabsIcon />, label: "친구", href: "/custom/friends" },
  { id: "header", icon: <TabsIcon />, label: "헤더", href: "/custom/header" },
  { id: "tabBar", icon: <TabsIcon />, label: "탭", href: "/custom/tab-bar" },
  { id: "chatRoomList", icon: <TabsIcon />, label: "채팅 목록", href: "/custom/chat-room-list" },
  { id: "chatRoom", icon: <TabsIcon />, label: "채팅", href: "/custom/chat-room" },
  // { id: "feed", icon: <TabsIcon />, label: "소식", href: "/custom/feed" },
  { id: "notice", icon: <TabsIcon />, label: "알림", href: "/custom/notice" },
];

export default function CustomLayout() {
  return (
    <div>
      <div className="flex min-h-screen items-start justify-center bg-white py-4">
        <div id="phone-root" className="relative flex h-[700px] w-[340px] flex-col overflow-hidden border border-secondary-200">
          <div className="relative w-[90%] max-w-[330px] aspect-[390/700] 
        border border-gray-300 rounded-2xl p-1 text-xs overflow-hidden mx-auto">
            <Outlet />
          </div>
          <div className="flex overflow-x-auto absolute bottom-0 w-full">
            {tabs.map(tab => (
              <CustomCategoryTab key={tab.id} icon={tab.icon} label={tab.label} href={tab.href} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
