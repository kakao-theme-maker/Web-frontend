import { useState } from 'react';
import { ActivityTab, KeywordTab } from "../../components/community";
import TabMenu from "../../components/common/TabMenu";
import type { TabId } from "../../types/community/theme";
import { useThemeBoards } from "../../services/hooks/theme/useThemeBoards";

const tabs: { id: TabId; label: string }[] = [
  { id: 'activity', label: '활동' },
  { id: 'keyword', label: '키워드' },
];

export default function List() {
  const [activeTab, setActiveTab] = useState<TabId>('activity');
  const { boards, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useThemeBoards();

  return (
    <div>
      <TabMenu tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1">
        {activeTab === 'activity' && (
          <ActivityTab
            boards={boards}
            isLoading={isLoading}
            isError={isError}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
        {activeTab === 'keyword' && <KeywordTab />}
      </div>
    </div>
  );
}
