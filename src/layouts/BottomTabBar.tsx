import { useCallback, useEffect, useRef, useState } from "react";
import type { FunctionComponent, SVGProps } from "react";
import { Link } from "react-router-dom";
import Text from "../components/common/Text";
import { useOutsideClick } from "../services/hooks/common/useOutsideClick";
import { cn } from "../utils/cn";

// icons
import HomeIcon from  '../components/icons/bottom-tab-menu/bottom-home.svg?react';
import CommunityIcon from  '../components/icons/bottom-tab-menu/bottom-community.svg?react';
import NotifyIcon from  '../components/icons/bottom-tab-menu/bottom-notify.svg?react';
import ProfileIcon from  '../components/icons/bottom-tab-menu/bottom-profile.svg?react';
import PlusIcon from '../components/icons/bottom-tab-menu/plus.svg?react';

const ACTION_MENU_ITEMS = [
  { id: "theme-create", label: "테마 만들기", href: "/themes/list" },
  { id: "theme-share", label: "테마 공유" },
  { id: "design-share", label: "디자인 공유" },
] as const;

const ACTION_MENU_ITEM_GAP = 104;
const ACTION_MENU_MAX_SPREAD = 124;
const ACTION_MENU_OUTER_Y = -84;
const ACTION_MENU_CENTER_Y = -118;
const CLOSED_ACTION_MENU_TRANSFORM = "translate(-50%, -32px) scale(0.75)";

function getActionMenuTransform(index: number, itemCount: number, isOpen: boolean) {
  if (!isOpen) return CLOSED_ACTION_MENU_TRANSFORM;
  if (itemCount === 1) return `translate(-50%, ${ACTION_MENU_CENTER_Y}px) scale(1)`;

  const centerOffset = (itemCount - 1) / 2;
  const relativeIndex = index - centerOffset;
  const spread = Math.min(centerOffset * ACTION_MENU_ITEM_GAP, ACTION_MENU_MAX_SPREAD);
  const distanceFromCenter = Math.abs(relativeIndex) / centerOffset;
  const x = (relativeIndex / centerOffset) * spread;
  const y = ACTION_MENU_CENTER_Y + (ACTION_MENU_OUTER_Y - ACTION_MENU_CENTER_Y) * distanceFromCenter;

  return `translate(calc(-50% + ${x}px), ${y}px) scale(1)`;
}

/**
 * 바텀 탭 메뉴 컴포넌트 인터페이스
 * @param isHome 홈 활성화 여부
 * @param isCommunity 게시글 활성화 여부
 */
interface IBottomTabBarProps {
  isHome: boolean
  isCommunity: boolean
  isNotification: boolean
  isMyPage: boolean
}

/**
 * 바텀 탭 메뉴 항목 인터페이스
 * @param icon 아이콘 컴포넌트
 * @param text 탭 바 메뉴 텍스트
 * @param href 이동 경로
 * @param isActive 활성화 여부
 */
interface IBottomTabItem {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>
  text: string
  href?: string
  isActive?: boolean
  onClick?: () => void
}

/**
 * 바텀 탭 메뉴 항목 컴포넌트
 * @param icon 아이콘 컴포넌트
 * @param text 탭 바 메뉴 텍스트
 * @param href 이동 경로
 * @param isActive 활성화 여부
 * @returns 탭 메뉴 아이템
 */
function BottomTabBarItem({ icon, text, href, isActive = false, onClick }: IBottomTabItem) {
  const iconClassName = `h-5 w-5 ${isActive ? "opacity-100 text-primary" : "opacity-90"}`;
  const Icon = icon;

  const content = (
    <>
      <Icon className={iconClassName} />
      <Text variant="REGULAR_12">{text}</Text>
    </>
  );

  return (
    <li className="flex min-h-11 flex-col items-center justify-center gap-1">
      {href ? (
        <Link to={href} onClick={onClick} className="flex h-full w-full flex-col items-center justify-center gap-1">
          {content}
        </Link>
      ) : (
        content
      )}
    </li>
  );
}

export default function BottomTabBar({ isHome, isCommunity, isNotification, isMyPage }: IBottomTabBarProps) {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const closeActionMenu = useCallback(() => setIsActionMenuOpen(false), []);

  useOutsideClick(containerRef, closeActionMenu);

  useEffect(() => {
    if (!isActionMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeActionMenu();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeActionMenu, isActionMenuOpen]);

  const bottomTabBarItems: IBottomTabItem[] = [
    { icon: HomeIcon, text: "홈", href: "/", isActive: isHome },
    { icon: CommunityIcon, text: "게시글", href: "/community", isActive: isCommunity },
    { icon: NotifyIcon, text: "알림", href: "/notify", isActive: isNotification },
    { icon: ProfileIcon, text: "마이", href: "/mypage", isActive: isMyPage },
  ]

  return (
    <nav ref={containerRef} className="absolute bottom-0 left-0 right-0 z-20 border-t border-secondary-200 bg-white px-2 py-2">
      <div id="bottom-action-menu" className="absolute left-0 right-0 top-0">
        {ACTION_MENU_ITEMS.map((item, index) => {
          const actionMenuItemClassName = cn(
            "absolute left-1/2 top-0 z-10 flex h-9 min-w-[84px] items-center justify-center whitespace-nowrap rounded-full border border-secondary-200 bg-white px-2.5 text-primary shadow-md transition-all duration-200 ease-out",
            isActionMenuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          );
          const actionMenuItemStyle = {
            transform: getActionMenuTransform(index, ACTION_MENU_ITEMS.length, isActionMenuOpen),
          };

          if ("href" in item) {
            return (
              <Link
                key={item.id}
                to={item.href}
                onClick={closeActionMenu}
                style={actionMenuItemStyle}
                className={actionMenuItemClassName}
              >
                <Text variant="MEDIUM_12">{item.label}</Text>
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={closeActionMenu}
              style={actionMenuItemStyle}
              className={actionMenuItemClassName}
            >
              <Text variant="MEDIUM_12">{item.label}</Text>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setIsActionMenuOpen((prev) => !prev)}
        aria-controls="bottom-action-menu"
        aria-expanded={isActionMenuOpen}
        aria-label="핵심 기능 메뉴"
        className="absolute left-1/2 top-0 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform active:scale-95"
      >
        <PlusIcon className={cn("h-[38px] w-[38px] transition-transform duration-200", isActionMenuOpen && "rotate-45")} />
      </button>

      <ul className="grid grid-cols-5">
        {bottomTabBarItems.slice(0, 2).map((item) => (
          <BottomTabBarItem
            key={item.text}
            icon={item.icon}
            text={item.text}
            href={item.href}
            isActive={item.isActive}
            onClick={closeActionMenu}
          />
        ))}
        <li className="min-h-11" aria-hidden="true" />
        {bottomTabBarItems.slice(2).map((item) => (
          <BottomTabBarItem
            key={item.text}
            icon={item.icon}
            text={item.text}
            href={item.href}
            isActive={item.isActive}
            onClick={closeActionMenu}
          />
        ))}
      </ul>
    </nav>
  )
}
