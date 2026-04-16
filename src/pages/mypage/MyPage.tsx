import { useState } from 'react';
import Text from '../../components/common/Text';
import TabMenu from '../../components/common/TabMenu';
import UserStats from './UserStats';
import ActivityTab from '../../components/mypage/ActivityTab';
import ThemeGridTab from '../../components/mypage/ThemeGridTab';
import ProfileImageEditor from '../../components/mypage/ProfileImageEditor';
import InlineNameEditor from '../../components/mypage/InlineNameEditor';
import { useUserProfile } from '../../services/hooks/user/useUserProfile';
import { useProfileEdit } from '../../services/hooks/user/useProfileEdit';
import { useSavedPosts } from '../../services/hooks/useSavedPosts';
import { usePreferredPosts } from '../../services/hooks/usePreferredPosts';
import type { MyPageTabId } from '../../types/mypage/types';

const MY_PAGE_TABS: { id: MyPageTabId; label: string }[] = [
  { id: 'activity', label: '내 활동' },
  { id: 'saved', label: '저장된' },
  { id: 'liked', label: '좋아요' },
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<MyPageTabId>('activity');
  const { profile, isLoading } = useUserProfile();
  const { updateImage, isImageUploading, updateName, isNameSaving } = useProfileEdit();
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
        <ProfileImageEditor
          profileImage={profile?.profileImage}
          isLoading={isLoading}
          isUploading={isImageUploading}
          onImageChange={updateImage}
        />

        <div className="mt-2 flex flex-col items-center">
          {isLoading ? (
            <div className="h-5 w-24 rounded bg-secondary-200 animate-pulse" />
          ) : (
            <>
              <InlineNameEditor
                name={profile?.name ?? ''}
                isSaving={isNameSaving}
                onNameChange={updateName}
              />
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
