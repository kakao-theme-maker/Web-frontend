import { useState } from 'react';
import SearchIcon from "../../components/icons/community/search.svg?react";

export default function SearchBar() {
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