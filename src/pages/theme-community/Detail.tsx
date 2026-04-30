import { useParams } from "react-router-dom";
import ThemeDetailCard from "../../components/community/theme/ThemeDetailCard";
import { useThemeBoardDetails } from "../../services/hooks/theme/useThemeBoardDetails";
import BoardSwipeDetailView from "../../components/community/BoardSwipeDetailView";

export default function Detail() {
  const { boardId } = useParams();
  const numericBoardId = Number(boardId);

  const { boards, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useThemeBoardDetails(numericBoardId);

  return (
    <BoardSwipeDetailView
      boards={boards}
      isLoading={isLoading}
      isError={isError}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      renderBoard={(board) => <ThemeDetailCard board={board} pinnedPostId={numericBoardId} />}
    />
  );
}
