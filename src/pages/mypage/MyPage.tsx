import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Text from "../../components/common/Text";
import TabMenu from "../../components/common/TabMenu";
import MoreMenu from "../../components/common/MoreMenu";
import Button from "../../components/common/Button";
import UserStats from "./UserStats";
import { useUserProfile } from "../../services/hooks/user/useUserProfile";
import { useSavedPosts } from "../../services/hooks/useSavedPosts";
import { usePreferredPosts } from "../../services/hooks/usePreferredPosts";
import type { MyPageTabId, IMyPageBoard, IThemeGridItem, IThemeCategory } from "../../types/mypage/types";

// 탭 목록
const MY_PAGE_TABS: { id: MyPageTabId; label: string }[] = [
  { id: "activity", label: "내 활동" },
  { id: "saved", label: "저장된" },
  { id: "liked", label: "좋아요" },
];

const THEME_CATEGORIES: IThemeCategory[] = [
  { id: "all", label: "전체" },
  { id: "cute", label: "귀여움" },
  { id: "fancy", label: "화려함" },
  { id: "game", label: "게임" },
  { id: "animal", label: "동물" },
  { id: "classic", label: "클래식" },
];

const MOCK_BOARDS: IMyPageBoard[] = [
  { id: 1, author: "다현", date: "3월 25일" },
  { id: 2, author: "다현", date: "3월 20일" },
];


// 마이페이지 내 활동 게시글 카드
interface IMyPageBoardCardProps {
  board: IMyPageBoard;
}

function MyPageBoardCard({ board }: IMyPageBoardCardProps) {
  const moreMenuItems = [
    { id: "edit", label: "수정하기", onClick: () => {} },
    { id: "delete", label: "삭제하기", onClick: () => {} },
    { id: "comment-restrict", label: "댓글 제한", onClick: () => {} },
  ];

  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-secondary-300" />
          <div className="flex flex-col">
            <Text variant="BOLD_15">{board.author}</Text>
            <Text variant="REGULAR_10" className="text-secondary-400">
              {board.date}
            </Text>
          </div>
        </div>
        <MoreMenu items={moreMenuItems} />
      </div>
      <div className="mt-3 h-[180px] w-full rounded-md bg-secondary-200" />
    </div>
  );
}

// 내 활동 탭
function ActivityTab() {
  if (MOCK_BOARDS.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Text variant="REGULAR_14" className="text-secondary-300">
          아직 활동이 없습니다.
        </Text>
      </div>
    );
  }

  return (
    <div>
      {MOCK_BOARDS.map((board) => (
        <MyPageBoardCard key={board.id} board={board} />
      ))}
    </div>
  );
}

// 그리드 탭 (저장된 / 좋아요 공용)
interface IThemeGridTabProps {
  themes: IThemeGridItem[];
  isLoading: boolean;
  emptyMessage: string;
}

function ThemeGridTab({ themes, isLoading, emptyMessage }: IThemeGridTabProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-2 px-4 pt-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-square animate-pulse rounded-sm bg-secondary-200" />
        ))}
      </div>
    );
  }

  if (themes.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Text variant="REGULAR_14" className="text-secondary-300">
          {emptyMessage}
        </Text>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 px-4 pt-3">
      {themes.map((theme) => (
        <div key={theme.id} className="aspect-square overflow-hidden rounded-sm bg-secondary-200">
          {theme.previewImageUrl && (
            <img src={theme.previewImageUrl} alt="" className="h-full w-full object-cover" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function MyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<MyPageTabId>("activity");
  const { profile, isLoading } = useUserProfile();
  const { posts: savedPosts, isLoading: isSavedLoading } = useSavedPosts();
  const { posts: preferredPosts, isLoading: isPreferredLoading } = usePreferredPosts();

  const TAB_CONTENT: Record<MyPageTabId, React.ReactNode> = {
    activity: <ActivityTab />,
    saved: <ThemeGridTab themes={savedPosts} isLoading={isSavedLoading} emptyMessage="저장된 테마가 없습니다." />,
    liked: <ThemeGridTab themes={preferredPosts} isLoading={isPreferredLoading} emptyMessage="좋아요한 테마가 없습니다." />,
  };

  return (
    <main>
      {/* 프로필 섹션 */}
      <section className="flex flex-col items-center px-5 pt-6 pb-1">
        {isLoading ? (
          <div className="h-20 w-20 rounded-full bg-secondary-200 animate-pulse" />
        ) : profile?.profileImage ? (
          <img
            src={profile.profileImage}
            alt="프로필 이미지"
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-secondary-300" />
        )}

        <div className="mt-2 flex flex-col items-center">
          {isLoading ? (
            <div className="h-5 w-24 rounded bg-secondary-200 animate-pulse" />
          ) : (
            <>
              <Text variant="SEMIBOLD_16">{profile?.name}</Text>
              <Text variant="LIGHT_12" className="text-secondary-400">
                {profile?.userEmail}
              </Text>
            </>
          )}
        </div>

        {isLoading ? (
          <div className="mt-3 h-10 w-full rounded bg-secondary-200 animate-pulse" />
        ) : (
          <UserStats
            uploads={profile?.uploads ?? 0}
            following={profile?.following ?? 0}
            followers={profile?.followers ?? 0}
          />
        )}

        <Button fullWidth className="mt-4" onClick={() => navigate("/mypage/profile-edit")}>
          <Text variant="LIGHT_14" className="text-white">프로필 수정</Text>
        </Button>
      </section>

      {/* 탭 메뉴 */}
      <TabMenu
        tabs={MY_PAGE_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cols={3}
        showInactiveBorder
      />

      {/* 탭 컨텐츠 */}
      <div className='mt-2'>{TAB_CONTENT[activeTab]}</div>
    </main>
  );
}
