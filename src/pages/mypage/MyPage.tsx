import { useState } from 'react';
import TabMenu from '../../components/common/TabMenu';
import ActivityTab from '../../components/mypage/ActivityTab';
import SavedTab from '../../components/mypage/SavedTab';
import CustomTab from '../../components/mypage/CustomTab';
import ProfileSection from '../../components/mypage/ProfileSection';
import { useUserProfile } from '../../services/hooks/user/useUserProfile';
import { useProfileEdit } from '../../services/hooks/user/useProfileEdit';
import type { MyPageTabId } from '../../types/mypage/types';

const MY_PAGE_TABS: { id: MyPageTabId; label: string }[] = [
  { id: 'activity', label: '내 활동' },
  { id: 'saved', label: '저장된' },
  { id: 'custom', label: '내 커스텀' },
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<MyPageTabId>('activity');
  const { profile, isLoading } = useUserProfile();
  const { updateImage, isImageUploading, updateName, isNameSaving } = useProfileEdit();

  const TAB_CONTENT: Record<MyPageTabId, React.ReactNode> = {
    activity: <ActivityTab />,
    saved: <SavedTab />,
    custom: <CustomTab />,
  };

  return (
    <main>
      <ProfileSection
        profile={profile}
        isLoading={isLoading}
        isImageUploading={isImageUploading}
        isNameSaving={isNameSaving}
        onImageChange={updateImage}
        onNameChange={updateName}
      />

      <TabMenu
        tabs={MY_PAGE_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cols={3}
        hasInactiveBorder
      />

      <div className="mt-2">
        {TAB_CONTENT[activeTab]}
      </div>
    </main>
  );
}
