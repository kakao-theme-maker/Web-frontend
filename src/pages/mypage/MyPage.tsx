import { useState } from "react";
import Text from "../../components/common/Text";
import TabMenu from "../../components/common/TabMenu";
import MoreMenu from "../../components/common/MoreMenu";
import Button from "../../components/common/Button";
import type { MyPageTabId, IMyPagePost, IUserProfile } from "../../types/mypage/types";

// 탭 목록
const MY_PAGE_TABS = [
  { id: "activity", label: "내 활동" },
  { id: "saved", label: "저장된" },
  { id: "liked", label: "좋아요" },
];

// 목 데이터
const MOCK_USER: IUserProfile = {
  name: "다현",
  email: "dkwls5471@kookmin.ac.kr",
  uploadCount: 3,
  followingCount: 122,
  followerCount: 122,
};

const MOCK_POSTS: IMyPagePost[] = [
  { id: 1, author: "다현", date: "3월 25일" },
  { id: 2, author: "다현", date: "3월 20일" },
];

// 통계 아이템 컴포넌트
interface IStatItemProps {
  label: string;
  value: number;
}

function StatItem({ label, value }: IStatItemProps) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <Text variant="REGULAR_14">
        {label}
      </Text>
      <Text variant="SEMIBOLD_15">{value}</Text>
    </div>
  );
}

// 마이페이지 게시글 카드 컴포넌트
interface IMyPagePostCardProps {
  post: IMyPagePost;
}

function MyPagePostCard({ post }: IMyPagePostCardProps) {
  const moreMenuItems = [
    { label: "수정하기", onClick: () => {} },
    { label: "삭제하기", onClick: () => {} },
  ];

  return (
    <div className="px-4 py-3">
      {/* 작성자 정보 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-secondary-300" />
          <div className="flex flex-col">
            <Text variant="BOLD_15">{post.author}</Text>
            <Text variant="REGULAR_10" className="text-secondary-400">
              {post.date}
            </Text>
          </div>
        </div>
        <MoreMenu items={moreMenuItems} />
      </div>

      {/* 테마 미리보기 이미지 */}
      <div className="mt-3 h-[180px] w-full rounded-md bg-secondary-200" />
    </div>
  );
}

// 탭 컨텐츠 컴포넌트
interface ITabContentProps {
  posts: IMyPagePost[];
  emptyMessage: string;
}

function TabContent({ posts, emptyMessage }: ITabContentProps) {
  if (posts.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Text variant="REGULAR_14" className="text-secondary-300">
          {emptyMessage}
        </Text>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <MyPagePostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<MyPageTabId>("activity");

  const TAB_CONTENT: Record<MyPageTabId, React.ReactNode> = {
    activity: <TabContent posts={MOCK_POSTS} emptyMessage="아직 활동이 없습니다." />,
    saved: <TabContent posts={[]} emptyMessage="저장된 테마가 없습니다." />,
    liked: <TabContent posts={[]} emptyMessage="좋아요한 테마가 없습니다." />,
  };

  return (
    <main>
      {/* 프로필 섹션 */}
      <section className="flex flex-col items-center px-5 pt-6 pb-1">
        {/* 프로필 이미지 */}
        <div className="h-20 w-20 rounded-full bg-secondary-300" />

        {/* 이름 & 이메일 */}
        <div className="mt-3 flex flex-col items-center gap-1">
          <Text variant="SEMIBOLD_16">{MOCK_USER.name}</Text>
          <Text variant="LIGHT_12" className="text-secondary-400">
            {MOCK_USER.email}
          </Text>
        </div>

        {/* 통계 */}
        <div className="mt-4 flex w-full items-center justify-around">
          <StatItem label="업로드" value={MOCK_USER.uploadCount} />
          <div className="h-8 w-px bg-secondary-200" />
          <StatItem label="팔로잉" value={MOCK_USER.followingCount} />
          <div className="h-8 w-px bg-secondary-200" />
          <StatItem label="팔로워" value={MOCK_USER.followerCount} />
        </div>

        {/* 프로필 수정 버튼 */}
        <Button fullWidth className="mt-4">
          <Text variant="LIGHT_14" className='text-white'>프로필 수정</Text>
        </Button>
      </section>

      {/* 탭 메뉴 */}
      <TabMenu
        tabs={MY_PAGE_TABS}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as MyPageTabId)}
        cols={3}
        showInactiveBorder
      />

      {/* 탭 컨텐츠 */}
      <div>{TAB_CONTENT[activeTab]}</div>
    </main>
  );
}
