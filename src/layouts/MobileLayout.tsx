import { Outlet, useLocation } from "react-router-dom";
import { useCallback, useMemo, useRef } from "react";
import BottomTabBar from "./BottomTabBar";
import MobileHeader from "./MobileHeader";

const COMMUNITY_LIST_PATHS = ["/community/theme", "/community/design"];
const COMMUNITY_WRITE_PATH_PATTERN = /^\/community\/(theme|design)\/write(\/select)?$/;
const COMMUNITY_EDIT_PATH_PATTERN = /^\/community\/(theme|design)\/edit\/[^/]+$/;
const COMMUNITY_DETAIL_PATH_PATTERN = /^\/community\/(theme|design)\/\d+$/;

function isCommunityListPath(pathname: string) {
  return COMMUNITY_LIST_PATHS.includes(pathname);
}

function isCommunityWritePath(pathname: string) {
  return COMMUNITY_WRITE_PATH_PATTERN.test(pathname);
}

function isCommunityEditPath(pathname: string) {
  return COMMUNITY_EDIT_PATH_PATTERN.test(pathname);
}

function isCommunityDetailPath(pathname: string) {
  return COMMUNITY_DETAIL_PATH_PATTERN.test(pathname);
}

export default function MobileLayout() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation()
  const pathSegments = pathname.split('/').filter(Boolean);
  const isHome: boolean = pathname === "/"
  const isCommunity: boolean = pathname.startsWith("/community")
  const isCommunityList: boolean = isCommunityListPath(pathname)
  const isNotification: boolean = pathname === "/notify"
  const isMyPage: boolean = pathname.startsWith("/mypage")
  const isCommunityWrite: boolean = isCommunityWritePath(pathname)
  const isCommunityEdit: boolean = isCommunityEditPath(pathname)
  const isCommunityDetail: boolean = isCommunityDetailPath(pathname)
  const hasHeader: boolean = isHome || isCommunity || isNotification || isMyPage
  const headerTitle: string = isCommunityWrite ? "글 작성" : isCommunityEdit ? "글 수정" : isHome ? "HOME" : isCommunity ? "커뮤니티" : isNotification ? "알림" : isMyPage ? "마이페이지" : "고정 헤더"

  // 뒤로가기 버튼을 보여주어야 하는 경로인지 판별
  // 현재 기준은 depth가 2이상인 경우 ('/'의 경우 0으로 보고, '/community'의 경우 1로 보고, '/community/theme/6'의 경우 3으로 봄)
  // 경로의 끝에 /가 올 경우 정확하게 처리하지 못할 수 있어 filter(Boolean)을 사용하여 빈 문자열을 제거
  const hasBackArrow: boolean = pathSegments.length >= 2 && !isCommunityList;
  const scrollToTop = useCallback(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  const outletContext = useMemo(() => ({ scrollToTop }), [scrollToTop]);

  return (
    <div className="flex min-h-screen items-start justify-center bg-white py-4">
      <div id="phone-root" className="relative flex h-[700px] w-[340px] flex-col overflow-hidden border border-secondary-200">
        {hasHeader && <MobileHeader title={headerTitle} hasBackArrow={hasBackArrow} hasMenuButton={isHome} />}

        <div
          ref={scrollContainerRef}
          className={`scrollbar-hidden flex-1 overflow-y-auto ${isCommunityDetail ? "" : "pb-16"}`}
        >
          <Outlet context={outletContext} />
        </div>

        <BottomTabBar isHome={isHome} isCommunity={isCommunity} isNotification={isNotification} isMyPage={pathname.startsWith("/mypage")} />
      </div>
    </div>
  )
}
