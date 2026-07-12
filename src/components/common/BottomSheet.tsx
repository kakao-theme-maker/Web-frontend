// components/BottomSheet.tsx
import { motion, type PanInfo } from 'framer-motion';
import { useEffect, useState } from 'react';
import CustomCategoryTab from '../custom/CustomCategoryTab';
import type { ICategoryTab } from '@/types/custom/types';
import TabsIcon from "@/components/icons/custom/tab.svg?react";

const CONTAINER_HEIGHT = 700;
const SNAP_HEIGHTS = [0.2, 0.5, 0.9].map((r) => r * CONTAINER_HEIGHT); // [140, 350, 630]

const tabs: ICategoryTab[] = [
  { id: "passcode", icon: <TabsIcon />, label: "잠금화면", href: "/custom/passcode" },
  { id: "friends", icon: <TabsIcon />, label: "친구", href: "/custom/friends" },
  { id: "header", icon: <TabsIcon />, label: "헤더", href: "/custom/header" },
  { id: "tabBar", icon: <TabsIcon />, label: "탭", href: "/custom/tab-bar" },
  { id: "chatRoomList", icon: <TabsIcon />, label: "채팅 목록", href: "/custom/chat-room-list" },
  { id: "chatRoom", icon: <TabsIcon />, label: "채팅", href: "/custom/chat-room" },
  { id: "notice", icon: <TabsIcon />, label: "알림", href: "/custom/notice" },
];

interface BottomSheetProps {
  onHeightChange?: (height: number) => void;
}

export function BottomSheet({ onHeightChange }: BottomSheetProps) {
  const [index, setIndex] = useState(0);
  const [dragHeight, setDragHeight] = useState<number | null>(null);

  const baseHeight = SNAP_HEIGHTS[index];
  const currentHeight = dragHeight ?? baseHeight;

  useEffect(() => {
    onHeightChange?.(currentHeight);
  }, [currentHeight, onHeightChange]);

  const onDrag = (_: unknown, info: PanInfo) => {
    const newHeight = baseHeight - info.offset.y;
    const clamped = Math.min(
      Math.max(newHeight, SNAP_HEIGHTS[0]),
      SNAP_HEIGHTS[SNAP_HEIGHTS.length - 1]
    );
    setDragHeight(clamped);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const releasedHeight = baseHeight - info.offset.y;

    // 가장 가까운 스냅 지점 찾기
    let closest = 0;
    let minDiff = Infinity;
    SNAP_HEIGHTS.forEach((h, i) => {
      const diff = Math.abs(h - releasedHeight);
      if (diff < minDiff) {
        minDiff = diff;
        closest = i;
      }
    });

    setIndex(closest);
    setDragHeight(null);
  };

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 bg-gray-500 rounded-t-2xl overflow-hidden"
      animate={{ height: currentHeight }}
      transition={
        dragHeight !== null
          ? { duration: 0 }
          : { type: 'spring', damping: 30, stiffness: 300 }
      }
    >
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        className="flex justify-center py-3 cursor-grab active:cursor-grabbing"
      >
        <div className="h-1.5 w-12 rounded-full bg-gray-300" />
      </motion.div>

      <div className="p-4">
        {index === 0 ? (
          <div className="flex overflow-x-auto bottom-0 w-full">
            {tabs.map((tab) => (
              <CustomCategoryTab
                key={tab.id}
                icon={tab.icon}
                label={tab.label}
                href={tab.href}
              />
            ))}
          </div>
        ) : (
          <p>테스트</p>
        )}
      </div>
    </motion.div>
  );
}