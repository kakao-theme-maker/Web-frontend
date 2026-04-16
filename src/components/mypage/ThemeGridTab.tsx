import Text from '../common/Text';
import type { IThemeGridItem } from '../../types/mypage/types';

interface IThemeGridTabProps {
  themes: IThemeGridItem[];
  isLoading: boolean;
  emptyMessage: string;
}

export default function ThemeGridTab({ themes, isLoading, emptyMessage }: IThemeGridTabProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-2 px-4 pt-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-square animate-pulse rounded-sm bg-secondary-200" />
        ))}
      </div>
    );
  }

  return (
    <div>
      {themes.length === 0 ? (
        <div className="flex h-40 items-center justify-center">
          <Text variant="REGULAR_14" className="text-secondary-300">
            {emptyMessage}
          </Text>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 px-4">
          {themes.map((theme) => (
            <div key={theme.id} className="aspect-square rounded-sm bg-secondary-200" />
          ))}
        </div>
      )}
    </div>
  );
}
