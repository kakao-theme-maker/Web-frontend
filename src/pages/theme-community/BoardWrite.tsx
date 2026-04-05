import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBoardWrite } from '../../services/hooks/useBoardWrite';
import BoardWriteForm from '../../components/community/BoardWriteForm';
import Text from '../../components/common/Text';
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
  const imageCount = selectedTheme?.images.length ?? 1;

  const { handleSubmit, ...formProps } = useBoardWrite(selectedTheme!);

  if (!selectedTheme) return null;

  const MAX_DOTS = 5;
  const total = Math.max(imageCount, 1);
  const visibleCount = Math.min(MAX_DOTS, total);
  const startIndex = Math.min(
    Math.max(currentImageIndex - Math.floor(MAX_DOTS / 2), 0),
    Math.max(total - MAX_DOTS, 0),
  );

  return (
    <BoardWriteForm
      {...formProps}
      onSubmit={handleSubmit}
      preview={
        <div className="mb-5 flex flex-col items-center">
          <div className="flex h-44 w-full items-center justify-center rounded-xl bg-secondary-200">
            <Text variant="REGULAR_14" className="text-secondary-400">
              {selectedTheme.themeName}
            </Text>
          </div>
          <div className="mt-2 flex gap-1.5">
            {Array.from({ length: visibleCount }, (_, i) => {
              const dotIndex = startIndex + i;
              const isActive = dotIndex === currentImageIndex;
              return (
                <button
                  key={dotIndex}
                  type="button"
                  onClick={() => setCurrentImageIndex(dotIndex)}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${isActive ? 'bg-primary' : 'bg-secondary-300'}`}
                />
              );
            })}
          </div>
        </div>
      }
    />
  );
}
