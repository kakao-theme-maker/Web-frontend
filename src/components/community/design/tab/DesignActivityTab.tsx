import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DesignBoardGridItem from "../DesignBoardGridItem";
import SearchBar from "../../SearchBar";
import Text from "../../../common/Text";
import type { IDesignBoard } from "../../../../types/community/design";
import { useIntersectionObserver } from "../../../../services/hooks/common/useIntersectionObserver";

interface IDesignActivityTabProps {
  boards: IDesignBoard[];
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function DesignActivityTab({
  boards,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: IDesignActivityTabProps) {
  const navigate = useNavigate();

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const sentinelRef = useIntersectionObserver(handleIntersect);

  return (
    <>
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
              <DesignBoardGridItem key={item.boardId} item={item} />
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
      <button
        onClick={() => navigate('/design/write')}
        className="absolute bottom-16 right-4 flex h-9 items-center rounded-full bg-primary px-4 text-white shadow-sm"
      >
        <span className="mr-1 text-base leading-none">+</span>
        <Text variant="REGULAR_14">글쓰기</Text>
      </button>
    </>
  );
}
