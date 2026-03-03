import { Outlet, useLocation } from "react-router-dom";
import BottomTabBar from "./BottomTabBar";
import MobileHeader from "./MobileHeader";

export default function MobileLayout() {
  const { pathname } = useLocation()
  const isHome: boolean = pathname === "/"
  const isCommunity: boolean = pathname.startsWith("/community")
  const hasHeader: boolean = isHome || isCommunity

  return (
    <div className="flex min-h-screen items-start justify-center bg-white py-4">
      <div className="relative h-[700px] w-[340px] overflow-hidden border border-secondary-200">
        <div className="scrollbar-hidden h-full overflow-y-auto pb-16">
          {hasHeader && <MobileHeader title="고정 헤더" />}
          <Outlet />
        </div>

        <BottomTabBar isHome={isHome} isCommunity={isCommunity} />
      </div>
    </div>
  )
}
