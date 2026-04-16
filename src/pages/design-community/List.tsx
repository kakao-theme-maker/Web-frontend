import { useState } from 'react';
import { DesignActivityTab } from "../../components/community/design";
import { KeywordTab } from "../../components/community";
import TabMenu from "../../components/common/TabMenu";
import type { TabId } from "../../types/community/theme";
import { useDesignBoards } from "../../services/hooks/design/useDesignBoards";

const TABS: { id: TabId; label: string }[] = [
  { id: 'activity', label: '활동' },
  { id: 'keyword', label: '키워드' },
];

export default function List() {
  const [activeTab, setActiveTab] = useState<TabId>('activity');
  const { boards, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useDesignBoards();

  return (
    <div>
      <TabMenu tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1">
        {activeTab === 'activity' && (
          <DesignActivityTab
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
