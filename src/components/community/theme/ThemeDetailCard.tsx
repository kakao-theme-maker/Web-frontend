import { useNavigate } from 'react-router-dom';
import type { IThemeBoardDetail } from '../../../types/community/theme';
import { useDeleteThemeBoard } from '../../../services/hooks/theme/useDeleteThemeBoard';
import { QUERY_KEYS } from '../../../constants/queryKeys';
import BoardDetailCard from '../BoardDetailCard';

interface IThemeDetailCardProps {
  board: IThemeBoardDetail;
  pinnedPostId: number;
}

export default function ThemeDetailCard({ board, pinnedPostId }: IThemeDetailCardProps) {
  const navigate = useNavigate();
  const { deleteBoard } = useDeleteThemeBoard(() => navigate(-1));

  return (
    <BoardDetailCard
      board={board}
      downloadLabel="테마 다운로드"
      imageAlt="테마 미리보기"
      editPath={`/community/theme/edit/${board.boardId}`}
      preferQueryKey={QUERY_KEYS.themeBoardDetails(pinnedPostId)}
      deleteBoard={deleteBoard}
    />
  );
}
