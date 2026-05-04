import { useLocation, useNavigate } from 'react-router-dom';
import { ActivityTab } from "../../components/community";
import { DesignActivityTab } from "../../components/community/design";
import TabMenu from "../../components/common/TabMenu";
import type { TabId } from "../../types/community/theme";
import { useThemeBoards } from "../../services/hooks/theme/useThemeBoards";
import { useDesignBoards } from "../../services/hooks/design/useDesignBoards";

const TABS: { id: TabId; label: string }[] = [
  { id: 'activity', label: '테마' },
  { id: 'keyword', label: '디자인 에셋' },
];

export default function List() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeTab: TabId = pathname === '/community/design' ? 'keyword' : 'activity';
  const handleTabChange = (tabId: TabId) => {
    navigate(tabId === 'activity' ? '/community/theme' : '/community/design');
  };

  return (
    <div>
      <TabMenu tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex-1">
        {activeTab === 'activity' && <ThemeTabContent />}
        {activeTab === 'keyword' && <DesignAssetTabContent />}
      </div>
    </div>
  );
}

function ThemeTabContent() {
  const themeBoards = useThemeBoards();

  return <ActivityTab {...themeBoards} />;
}

function DesignAssetTabContent() {
  const designBoards = useDesignBoards();

  return <DesignActivityTab {...designBoards} />;
}
