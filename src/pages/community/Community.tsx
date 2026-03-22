import { useState } from 'react';
import { ActivityTab, KeywordTab } from "../../components/community";
import TabMenu from "../../components/common/TabMenu";
import type { TabId } from "../../types/community/post";
import { useCommunityPosts } from "../../services/hooks/useCommunityPosts";

const tabs: { id: TabId; label: string }[] = [
  { id: 'activity', label: '활동' },
  { id: 'keyword', label: '키워드' },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState<TabId>('activity');
  const { posts, isLoading, isError } = useCommunityPosts();

  return (
    <div>
      <TabMenu tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1">
        {activeTab === 'activity' && (
          <ActivityTab posts={posts} isLoading={isLoading} isError={isError} />
        )}
        {activeTab === 'keyword' && <KeywordTab />}
      </div>
    </div>
  );
}