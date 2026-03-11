import { Outlet, useLocation } from "react-router-dom";
import BottomTabBar from "./BottomTabBar";
import MobileHeader from "./MobileHeader";

export default function MobileLayout() {
  const { pathname } = useLocation()
  const isHome: boolean = pathname === "/"
  const isCommunity: boolean = pathname.startsWith("/community")
  const hasHeader: boolean = isHome || isCommunity
  const headerTitle: string = isCommunity ? "테마 커뮤니티" : "고정 헤더"

  // 뒤로가기 버튼을 보여주어야 하는 경로인지 판별
  // 현재 기준은 depth가 2이상인 경우 ('/'의 경우 0으로 보고, '/community'의 경우 1로 보고, '/community/6'의 경우 2로 봄)
  // 경로의 끝에 /가 올 경우 정확하게 처리하지 못할 수 있어 filter(Boolean)을 사용하여 빈 문자열을 제거
  const showBackArrow: boolean = pathname.split('/').filter(Boolean).length >= 2;

  return (
    <div className="flex min-h-screen items-start justify-center bg-white py-4">
      <div className="relative flex h-[700px] w-[340px] flex-col overflow-hidden border border-secondary-200">
        {hasHeader && <MobileHeader title={headerTitle} showBackArrow={showBackArrow} />}

        <div className="scrollbar-hidden flex-1 overflow-y-auto pb-16">
          <Outlet />
        </div>

        <BottomTabBar isHome={isHome} isCommunity={isCommunity} />
      </div>
    </div>
  )
}
