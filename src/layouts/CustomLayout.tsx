import { Outlet } from "react-router-dom";
import TabsIcon from "@/components/icons/custom/tab.svg?react";
import type { ICategoryTab } from "@/types/custom/types";
import { BottomSheet } from "@/components/common/BottomSheet";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [sheetHeight, setSheetHeight] = useState(140);
  const [previewScale, setPreviewScale] = useState(0.9);

  useEffect(() => {
    const availableHeight = 700 - sheetHeight; // 바텀시트 뺀 나머지 공간
    const newScale = Math.max(0.5, availableHeight / 700);
    setPreviewScale(newScale);
  }, [sheetHeight]);

  return (
    <div>
      <div className="flex min-h-screen items-start justify-center bg-white py-4">
        <div id="phone-root" ref={containerRef}
          className="relative flex h-[700px] w-[340px] flex-col overflow-hidden border border-secondary-200">
          {/* 헤더 */}
          <div className="flex justify-between items-center p-2">
            <ChevronLeft size={24} className="s text-gray-500"
              onClick={() => navigate("/custom")} />
            <p className="text-center text-sm font-semibold py-2">Untitled</p>
            <EllipsisVertical size={24} className="text-gray-500" />
          </div>
          <div className="relative w-[90%] max-w-[330px] aspect-[390/700]  origin-top
        border border-gray-300 rounded-2xl p-1 text-xs overflow-hidden mx-auto"
            style={{ transform: `scale(${previewScale})` }}>
            <Outlet />
          </div>
          <BottomSheet onHeightChange={setSheetHeight} />
        </div>
      </div>
    </div>
  )
}
