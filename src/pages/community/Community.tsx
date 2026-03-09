import { useState } from 'react';
import CommunityPostGridItem from "../../components/community/CommunityPostGridItem";
import type { ICommunityPostItem } from "../../types/community/post";
import Text from "../../components/common/Text";
import SearchIcon from "../../components/icons/community/search.svg?react";

type TabId = 'activity' | 'keyword';
interface ITab {
  id: TabId
  label: string;
}
interface ITabMenuProps {
  tabs: ITab[];
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}

function SearchBar() {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if(!keyword.trim()) return; // 빈 값일 경우
  }

  return (
    <form 
      onSubmit={handleSearch}
      className="flex w-full items-center gap-2 rounded-lg bg-gray-100 mt-1 mb-3 px-4 py-1.5 focus-within:ring-2 focus-within:ring-primary"
    >
      <SearchIcon className="h-5 w-5" />
      
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색"
        className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
      />
      
      {/* 화면에는 보이지 않지만 엔터 키 제출을 가능하게 하는 숨겨진 버튼 */}
      <button type="submit" className="hidden">검색</button>
    </form>
  );
}

function TabMenu({ tabs, activeTab, onTabChange }: ITabMenuProps) {
  return(
    <div className="sticky top-0 z-10 grid grid-cols-2 bg-white text-center">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button 
            key={tab.id} onClick={() => onTabChange(tab.id)}
            className={`pt-4 pb-1 transition-colors ${isActive ? 'text-primary' : 'text-secondary-300'}`}
          >
            <span 
              className={`border-b-2 pb-1 px-1 transition-all ${isActive ? 'border-primary' : 'border-transparent'}`}
            >
              <Text variant="BOLD_15">{tab.label}</Text>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ActivityTab() {
  const postPlaceholders: ICommunityPostItem[] = Array.from({ length: 12 }, (_, index) => ({
    boardId: index + 1,
    themeComponentId: 1000 + index,
    title: `테마 미리보기 ${index + 1}`,
    previewImageUrl: "",
    userEmail: "test@theme.com",
    createdAt: "2026-03-04",
    prefers: 0,
  }));

  return (
    <>
      <main className="px-3 pb-24 pt-2">
        <SearchBar />
        <section className="grid grid-cols-2 gap-2">
          {postPlaceholders.map((item) => (
            <CommunityPostGridItem key={item.boardId} item={item} />
          ))}
        </section>
      </main>
      <button className="absolute bottom-16 right-4 flex h-9 items-center rounded-full bg-primary px-4 text-white shadow-sm">
        <span className="mr-1 text-base leading-none">+</span>
        <Text variant="REGULAR_14">글쓰기</Text>
      </button>
    </>
  );
}

function KeywordTab() {
  return (
    <>
    </>
  );
}

export default function Community() {
  // 탭 메뉴 상태값, 초기값은 activity: 활동
  const [activeTab, setActiveTab] = useState<TabId>('activity');
  // 탭 메뉴 데이터 (확장 가능성을 염두에 두어 배열로 관리)
  const tabs: ITab[] = [
    { id: 'activity', label: '활동' },
    { id: 'keyword', label: '키워드' },
  ];

  return (
    <>
      <TabMenu tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'activity' ? (
          <ActivityTab /> // 활동 컴포넌트
        ) : (
          <KeywordTab />  // 키워드 컴포넌트
      )}
    </>
  )
}