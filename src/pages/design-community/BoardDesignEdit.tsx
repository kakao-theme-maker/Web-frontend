import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDesignBoardEdit } from '../../services/hooks/design/useDesignBoardEdit';
import BoardWriteForm from '../../components/community/BoardWriteForm';
import type { IDesignBoardDetail } from '../../types/community/design';

interface IBoardDesignEditLocationState {
  board: IDesignBoardDetail;
}

export default function BoardDesignEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as IBoardDesignEditLocationState | null;

  useEffect(() => {
    if (!state?.board) {
      navigate(-1);
    }
  }, [state, navigate]);

  const board = state?.board;
  const { handleSubmit, ...formProps } = useDesignBoardEdit(board!);

  if (!board) return null;

  return (
    <BoardWriteForm
      {...formProps}
      onSubmit={handleSubmit}
      submitLabel="수정완료"
      preview={
        board.previewImageUrls?.[0] ? (
          <div className="mb-5">
            <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-xl bg-secondary-200">
              <img src={board.previewImageUrls[0]} alt="디자인 미리보기" className="h-full w-full object-cover" />
            </div>
          </div>
        ) : null
      }
    />
  );
}
