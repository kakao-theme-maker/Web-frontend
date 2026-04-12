import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDesignBoardEdit } from '../../services/hooks/design/useDesignBoardEdit';
import BoardWriteForm from '../../components/community/BoardWriteForm';
import type { IDesignBoardDetail } from '../../types/community/design';

interface IBoardDesignEditLocationState {
  post: IDesignBoardDetail;
}

export default function BoardDesignEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as IBoardDesignEditLocationState | null;

  useEffect(() => {
    if (!state?.post) {
      navigate(-1);
    }
  }, [state, navigate]);

  const post = state?.post;
  const { handleSubmit, ...formProps } = useDesignBoardEdit(post!);

  if (!post) return null;

  return (
    <BoardWriteForm
      {...formProps}
      onSubmit={handleSubmit}
      submitLabel="수정완료"
      preview={
        post.previewImageUrl ? (
          <div className="mb-5">
            <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-xl bg-secondary-200">
              <img src={post.previewImageUrl} alt="디자인 미리보기" className="h-full w-full object-cover" />
            </div>
          </div>
        ) : null
      }
    />
  );
}
