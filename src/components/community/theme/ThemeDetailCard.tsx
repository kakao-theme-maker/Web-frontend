import { useNavigate } from 'react-router-dom';
import type { IThemeBoardDetail } from '../../../types/community/theme';
import { useDeleteThemeBoard } from '../../../services/hooks/theme/useDeleteThemeBoard';
import BoardDetailCard from '../BoardDetailCard';

interface IThemeDetailCardProps {
  board: IThemeBoardDetail;
}

export default function ThemeDetailCard({ board }: IThemeDetailCardProps) {
  const navigate = useNavigate();
  const { deleteBoard } = useDeleteThemeBoard(() => navigate(-1));

  return (
    <BoardDetailCard
      board={board}
      downloadLabel="테마 다운로드"
      imageAlt="테마 미리보기"
      editPath={`/community/edit/${board.boardId}`}
      preferQueryKey={['theme-board-detail', board.boardId]}
      deleteBoard={deleteBoard}
    />
  );
}
