import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useThemeBoardEdit } from '../../services/hooks/useThemeBoardEdit';
import BoardWriteForm from '../../components/community/BoardWriteForm';
import type { IThemeBoardDetail } from '../../types/community/theme';

interface IBoardThemeEditLocationState {
  post: IThemeBoardDetail;
}

export default function BoardThemeEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as IBoardThemeEditLocationState | null;

  useEffect(() => {
    if (!state?.post) {
      navigate(-1);
    }
  }, [state, navigate]);

  const post = state?.post;
  const { handleSubmit, ...formProps } = useThemeBoardEdit(post!);

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
              <img src={post.previewImageUrl} alt="테마 미리보기" className="h-full w-full object-cover" />
            </div>
          </div>
        ) : null
      }
    />
  );
}
