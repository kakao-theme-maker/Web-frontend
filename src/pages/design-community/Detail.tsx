import { useParams } from "react-router-dom";
import { DesignDetailCard } from "../../components/community/design";
import { useDesignBoardDetails } from "../../services/hooks/design/useDesignBoardDetails";
import BoardSwipeDetailView from "../../components/community/BoardSwipeDetailView";

export default function Detail() {
  const { boardId } = useParams();
  const numericBoardId = Number(boardId);

  const { boards, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDesignBoardDetails(numericBoardId);

  return (
    <BoardSwipeDetailView
      boards={boards}
      isLoading={isLoading}
      isError={isError}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      renderBoard={(board) => <DesignDetailCard board={board} pinnedPostId={numericBoardId} />}
    />
  );
}
