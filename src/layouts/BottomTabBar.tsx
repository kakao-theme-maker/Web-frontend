import { Link } from "react-router-dom";
import Text from "../components/common/Text";

// icons
import HomeIcon from  '../components/icons/bottom-tab-menu/bottom-home.svg?react';
import CommunityIcon from  '../components/icons/bottom-tab-menu/bottom-community.svg?react';
import NotifyIcon from  '../components/icons/bottom-tab-menu/bottom-notify.svg?react';
import ProfileIcon from  '../components/icons/bottom-tab-menu/bottom-profile.svg?react';

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
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  text: string
  href?: string
  isActive?: boolean
}

/**
 * 바텀 탭 메뉴 항목 컴포넌트
 * @param icon 아이콘 컴포넌트
 * @param text 탭 바 메뉴 텍스트
 * @param href 이동 경로
 * @param isActive 활성화 여부
 * @returns 탭 메뉴 아이템
 */
function BottomTabBarItem({ icon, text, href, isActive = false }: IBottomTabItem) {
  const iconClassName = `h-5 w-5 ${isActive ? "opacity-100 text-primary" : "opacity-90"}`;
  const Icon = icon;

  const content = (
    <>
      <Icon className={iconClassName} />
      <Text variant="REGULAR_12">{text}</Text>
    </>
  );

  return (
    <li className="flex flex-col items-center justify-center gap-1">
      {href ? <Link to={href} className="flex flex-col items-center justify-center gap-1">{content}</Link> : content}
    </li>
  );
}

export default function BottomTabBar({ isHome, isCommunity, isNotification, isMyPage }: IBottomTabBarProps) {
  const bottomTabBarItems: IBottomTabItem[] = [
    { icon: HomeIcon, text: "홈", href: "/", isActive: isHome },
    { icon: CommunityIcon, text: "게시글", href: "/community", isActive: isCommunity },
    { icon: NotifyIcon, text: "알림", href: "/notify", isActive: isNotification },
    { icon: ProfileIcon, text: "마이", href: "/mypage", isActive: isMyPage },
  ]

  return (
    <nav className="absolute bottom-0 left-0 right-0 border-t border-secondary-200 bg-white px-2 py-2">
      <ul className="grid grid-cols-4">
        {bottomTabBarItems.map((item) => (
          <BottomTabBarItem
            key={item.text}
            icon={item.icon}
            text={item.text}
            href={item.href}
            isActive={item.isActive}
          />
        ))}
      </ul>
    </nav>
  )
}
