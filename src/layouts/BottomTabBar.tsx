import { Link } from "react-router-dom";
import HomeIcon from "../components/icons/bottom-tab-menu/bottom-home.png";
import CommunityIcon from "../components/icons/bottom-tab-menu/bottom-community.png";
import NotificationIcon from "../components/icons/bottom-tab-menu/bottom-notify.png";
import ProfileIcon from "../components/icons/bottom-tab-menu/bottom-profile.png";
import HomeActiveIcon from "../components/icons/bottom-tab-menu/bottom-home-active.png";
import CommunityActiveIcon from "../components/icons/bottom-tab-menu/bottom-community-active.png";
import NotificationActiveIcon from "../components/icons/bottom-tab-menu/bottom-notify-active.png";
import ProfileActiveIcon from "../components/icons/bottom-tab-menu/bottom-profile-active.png";

/**
 * 바텀 탭 메뉴 컴포넌트 인터페이스
 * @param isHome 홈 활성화 여부
 * @param isCommunity 게시글 활성화 여부
 */
interface IBottomTabBarProps {
  isHome: boolean
  isCommunity: boolean
}

/**
 * 바텀 탭 메뉴 항목 인터페이스
 * @param iconSrc 아이콘 이미지 경로
 * @param iconSrcActive 활성화 아이콘 이미지 경로
 * @param text 탭 바 메뉴 텍스트
 * @param href 이동 경로
 * @param isActive 활성화 여부
 */
interface IBottomTabItem {
  iconSrc: string
  iconSrcActive: string
  text: string
  href?: string
  isActive?: boolean
}

/**
 * 바텀 탭 메뉴 항목 컴포넌트
 * @param iconSrc 아이콘 이미지 경로
 * @param text 탭 바 메뉴 텍스트
 * @param href 이동 경로
 * @param isActive 활성화 여부
 * @returns 탭 메뉴 아이템
 */
function BottomTabBarItem({ iconSrc, iconSrcActive, text, href, isActive = false }: IBottomTabItem) {
  const textClassName = `text-[12px]`
  const iconClassName = `h-5 w-5 ${isActive ? "opacity-100" : "opacity-90"}`

  const content = (
    <>
      <img src={isActive ? iconSrcActive : iconSrc} alt={text} className={iconClassName} />
      <span className={textClassName}>{text}</span>
    </>
  )

  return (
    <li className="flex flex-col items-center justify-center gap-1">
      {href ? <Link to={href} className="flex flex-col items-center justify-center gap-1">{content}</Link> : content}
    </li>
  )
}

export default function BottomTabBar({ isHome, isCommunity }: IBottomTabBarProps) {
  const bottomTabBarItems: IBottomTabItem[] = [
    { iconSrc: HomeIcon, iconSrcActive: HomeActiveIcon, text: "홈", href: "/", isActive: isHome },
    { iconSrc: CommunityIcon, iconSrcActive: CommunityActiveIcon, text: "게시글", href: "/community", isActive: isCommunity },
    { iconSrc: NotificationIcon, iconSrcActive: NotificationActiveIcon, text: "알림" },
    { iconSrc: ProfileIcon, iconSrcActive: ProfileActiveIcon, text: "마이" },
  ]

  return (
    <nav className="absolute bottom-0 left-0 right-0 border-t border-secondary-200 bg-white px-2 py-2">
      <ul className="grid grid-cols-4">
        {bottomTabBarItems.map((item) => (
          <BottomTabBarItem
            key={item.text}
            iconSrc={item.iconSrc}
            iconSrcActive={item.iconSrcActive}
            text={item.text}
            href={item.href}
            isActive={item.isActive}
          />
        ))}
      </ul>
    </nav>
  )
}
