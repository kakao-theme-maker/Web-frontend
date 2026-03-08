import { useState } from 'react';
import CommunityPostGridItem from "../../components/community/CommunityPostGridItem";
import type { ICommunityPostItem } from "../../types/community/post";
import Text from "../../components/common/Text";
import SearchIcon from "../../components/icons/community/search.svg?react";

const postPlaceholders: ICommunityPostItem[] = Array.from({ length: 12 }, (_, index) => ({
  boardId: index + 1,
  themeComponentId: 1000 + index,
  title: `테마 미리보기 ${index + 1}`,
  previewImageUrl: "",
  userEmail: "test@theme.com",
  createdAt: "2026-03-04",
  prefers: 0,
}));

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

export default function Community() {
  return (
    <>
        <div className="sticky top-0 z-10 grid grid-cols-2 bg-white text-center text-[14px] font-bold">
          <button className="border-b-2 border-primary py-2 text-primary">
            <Text variant="BOLD_16">활동</Text>
          </button>
          <button className="border-b-2 border-secondary-300 py-2 text-secondary-300">
            <Text variant="BOLD_16">키워드</Text>
          </button>
        </div>

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
  )
}