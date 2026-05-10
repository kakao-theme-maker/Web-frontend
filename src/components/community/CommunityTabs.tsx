import { useNavigate } from 'react-router-dom';
import TabMenu from '../common/TabMenu';
import type { CommunityTabId } from '../../types/community/common';

const TABS: { id: CommunityTabId; label: string }[] = [
  { id: 'theme', label: '테마' },
  { id: 'design', label: '디자인 에셋' },
];

interface ICommunityTabsProps {
  activeTab: CommunityTabId;
}

export default function CommunityTabs({ activeTab }: ICommunityTabsProps) {
  const navigate = useNavigate();

  const handleTabChange = (tabId: CommunityTabId) => {
    navigate(tabId === 'theme' ? '/community/theme' : '/community/design');
  };

  return <TabMenu tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />;
}
