import Text from '../../common/Text';
import type { IUserTheme } from '../../../types/community/theme';

const MAX_DOTS = 5;

interface IThemeBoardPreviewProps {
  selectedTheme: IUserTheme;
  currentImageIndex: number;
  onIndexChange: (index: number) => void;
}

export default function ThemeBoardPreview({
  selectedTheme,
  currentImageIndex,
  onIndexChange,
}: IThemeBoardPreviewProps) {
  const total = Math.max(selectedTheme.images.length, 1);
  const visibleCount = Math.min(MAX_DOTS, total);
  const startIndex = Math.min(
    Math.max(currentImageIndex - Math.floor(MAX_DOTS / 2), 0),
    Math.max(total - MAX_DOTS, 0),
  );

  return (
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
              onClick={() => onIndexChange(dotIndex)}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${isActive ? 'bg-primary' : 'bg-secondary-300'}`}
            />
          );
        })}
      </div>
    </div>
  );
}
