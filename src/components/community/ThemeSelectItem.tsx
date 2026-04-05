import { cn } from '../../utils/cn';
import Text from '../common/Text';
import type { IUserTheme } from '../../types/community/theme';

interface IThemeSelectItemProps {
  theme: IUserTheme;
  isSelected: boolean;
  onSelect: (themeComponentId: number) => void;
}

export default function ThemeSelectItem({ theme, isSelected, onSelect }: IThemeSelectItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(theme.themeComponentId)}
      className={cn(
        'flex w-full items-center justify-between rounded-xl border px-4 py-3 transition-colors',
        isSelected
          ? 'border-primary bg-primary text-white'
          : 'border-secondary-200 bg-white text-black',
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded border-2',
            isSelected ? 'border-white bg-white' : 'border-secondary-300 bg-white',
          )}
        >
          {isSelected && (
            <svg viewBox="0 0 12 10" className="h-3 w-3" fill="none">
              <path
                d="M1 5l3.5 3.5L11 1"
                stroke="#4F46E5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <div className="flex flex-col items-start">
          <Text
            variant="SEMIBOLD_14"
            className={isSelected ? 'text-white' : 'text-black'}
          >
            {theme.themeName}
          </Text>
          <Text
            variant="REGULAR_12"
            className={isSelected ? 'text-blue-100' : 'text-secondary-400'}
          >
            {theme.versionName}
          </Text>
        </div>
      </div>

      <div
        className={cn(
          'h-14 w-14 flex-shrink-0 rounded-lg',
          isSelected ? 'bg-white/30' : 'bg-secondary-200',
        )}
      />
    </button>
  );
}
