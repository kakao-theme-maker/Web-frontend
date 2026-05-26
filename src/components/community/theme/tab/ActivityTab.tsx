import { useCallback } from "react";
import ThemeBoardGridItem from "../ThemeBoardGridItem";
import SearchBar from "../../SearchBar";
import type { IThemeBoard } from "../../../../types/community/theme";
import { useIntersectionObserver } from "../../../../services/hooks/common/useIntersectionObserver";

interface IActivityTabProps {
  boards: IThemeBoard[];
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function ActivityTab({
  boards,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: IActivityTabProps) {
  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const sentinelRef = useIntersectionObserver(handleIntersect);

  return (
    <main className="px-3 pb-24 pt-2">
      <SearchBar />
      {isLoading && (
        <div className="flex justify-center py-10">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
      {isError && (
        <p className="py-10 text-center text-[13px] text-red-400">
          게시글을 불러오지 못했습니다.
        </p>
      )}
      {!isLoading && !isError && (
        <section className="grid grid-cols-2 gap-2">
          {boards.map((item) => (
            <ThemeBoardGridItem key={item.boardId} item={item} />
          ))}
        </section>
      )}
      <div ref={sentinelRef} className="h-1" />
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </main>
  );
}
