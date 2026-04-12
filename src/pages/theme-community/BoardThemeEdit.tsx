import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useThemeBoardEdit } from '../../services/hooks/theme/useThemeBoardEdit';
import BoardWriteForm from '../../components/community/BoardWriteForm';
import type { IThemeBoardDetail } from '../../types/community/theme';

interface IBoardThemeEditLocationState {
  board: IThemeBoardDetail;
}

export default function BoardThemeEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as IBoardThemeEditLocationState | null;

  useEffect(() => {
    if (!state?.board) {
      navigate(-1);
    }
  }, [state, navigate]);

  const board = state?.board;
  const { handleSubmit, ...formProps } = useThemeBoardEdit(board!);

  if (!board) return null;

  return (
    <BoardWriteForm
      {...formProps}
      onSubmit={handleSubmit}
      submitLabel="수정완료"
      preview={
        board.previewImageUrl ? (
          <div className="mb-5">
            <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-xl bg-secondary-200">
              <img src={board.previewImageUrl} alt="테마 미리보기" className="h-full w-full object-cover" />
            </div>
          </div>
        ) : null
      }
    />
  );
}
