import { useState } from 'react';
import { DesignActivityTab } from "../../components/community/design";
import { KeywordTab } from "../../components/community";
import TabMenu from "../../components/common/TabMenu";
import type { TabId } from "../../types/community/theme";
import { useDesignPosts } from "../../services/hooks/useDesignPosts";

const tabs: { id: TabId; label: string }[] = [
  { id: 'activity', label: '활동' },
  { id: 'keyword', label: '키워드' },
];

export default function List() {
  const [activeTab, setActiveTab] = useState<TabId>('activity');
  const { posts, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useDesignPosts();

  return (
    <div>
      <TabMenu tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1">
        {activeTab === 'activity' && (
          <DesignActivityTab
            posts={posts}
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
