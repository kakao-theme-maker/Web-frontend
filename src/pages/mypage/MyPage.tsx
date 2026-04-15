import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from '../../components/common/Text';
import TabMenu from '../../components/common/TabMenu';
import Button from '../../components/common/Button';
import UserStats from './UserStats';
import ActivityTab from '../../components/mypage/ActivityTab';
import ThemeGridTab from '../../components/mypage/ThemeGridTab';
import { useUserProfile } from '../../services/hooks/user/useUserProfile';
import { useSavedPosts } from '../../services/hooks/useSavedPosts';
import { usePreferredPosts } from '../../services/hooks/usePreferredPosts';
import type { MyPageTabId } from '../../types/mypage/types';

const MY_PAGE_TABS: { id: MyPageTabId; label: string }[] = [
  { id: 'activity', label: '내 활동' },
  { id: 'saved', label: '저장된' },
  { id: 'liked', label: '좋아요' },
];

export default function MyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<MyPageTabId>('activity');
  const { profile, isLoading } = useUserProfile();
  const { posts: savedPosts, isLoading: isSavedLoading } = useSavedPosts();
  const { posts: preferredPosts, isLoading: isPreferredLoading } = usePreferredPosts();

  const TAB_CONTENT: Record<MyPageTabId, React.ReactNode> = {
    activity: <ActivityTab />,
    saved: <ThemeGridTab key="saved" themes={savedPosts} isLoading={isSavedLoading} emptyMessage="저장된 테마가 없습니다." />,
    liked: <ThemeGridTab key="liked" themes={preferredPosts} isLoading={isPreferredLoading} emptyMessage="좋아요한 테마가 없습니다." />,
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

        <Button fullWidth className="mt-4" onClick={() => navigate('/mypage/profile-edit')}>
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
      <div className="mt-2">{TAB_CONTENT[activeTab]}</div>
    </main>
  );
}
