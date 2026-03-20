import { useState } from 'react';
import { ActivityTab, KeywordTab } from "../../components/community";
import TabMenu from "../../components/common/TabMenu";
import type { TabId } from "../../types/community/post";

// 컴포넌트 외부로 이동 (불필요한 재생성 방지)
const tabs = [
  { id: 'activity', label: '활동' },
  { id: 'keyword', label: '키워드' },
];
// 확장 가능성을 염두에 두어 객체 매핑 구조로 설계
const TAB_COMPONENTS: Record<TabId, React.ReactNode> = {
  activity: <ActivityTab />,
  keyword: <KeywordTab />,
};

export default function Community() {
  // 탭 메뉴 상태값, 초기값은 activity: 활동
  const [activeTab, setActiveTab] = useState<TabId>('activity');

  return (
    <div>
      <TabMenu tabs={tabs} activeTab={activeTab} onTabChange={(id) => setActiveTab(id as TabId)} />
      <div className="flex-1">
        {TAB_COMPONENTS[activeTab]}
      </div>
    </div>
  )
}