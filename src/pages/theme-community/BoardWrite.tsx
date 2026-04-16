import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBoardWrite } from '../../services/hooks/theme/useBoardWrite';
import BoardWriteForm from '../../components/community/BoardWriteForm';
import ThemeBoardPreview from '../../components/community/theme/ThemeBoardPreview';
import type { IUserTheme } from '../../types/community/theme';

interface IBoardWriteLocationState {
  selectedTheme: IUserTheme;
}

export default function BoardWrite() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as IBoardWriteLocationState | null;

  useEffect(() => {
    if (!state?.selectedTheme) {
      navigate('/community/write', { replace: true });
    }
  }, [state, navigate]);

  const selectedTheme = state?.selectedTheme;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { handleSubmit, ...formProps } = useBoardWrite(selectedTheme!);

  if (!selectedTheme) return null;

  return (
    <BoardWriteForm
      {...formProps}
      onSubmit={handleSubmit}
      preview={
        <ThemeBoardPreview
          selectedTheme={selectedTheme}
          currentImageIndex={currentImageIndex}
          onIndexChange={setCurrentImageIndex}
        />
      }
    />
  );
}
