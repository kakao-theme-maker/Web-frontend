import { useNavigate } from 'react-router-dom';
import type { IDesignBoardDetail } from '../../../types/community/design';
import { useDeleteDesignBoard } from '../../../services/hooks/design/useDeleteDesignBoard';
import BoardDetailCard from '../BoardDetailCard';

interface IDesignDetailCardProps {
  board: IDesignBoardDetail;
  pinnedPostId: number;
}

export default function DesignDetailCard({ board, pinnedPostId }: IDesignDetailCardProps) {
  const navigate = useNavigate();
  const { deleteBoard } = useDeleteDesignBoard(() => navigate(-1));

  return (
    <BoardDetailCard
      board={board}
      downloadLabel="디자인 다운로드"
      imageAlt="디자인 미리보기"
      editPath={`/design/edit/${board.boardId}`}
      preferQueryKey={['design-board-details', pinnedPostId]}
      deleteBoard={deleteBoard}
    />
  );
}
