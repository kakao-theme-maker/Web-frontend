import { useState } from 'react';
import { cn } from '../../utils/cn';
import Text from '../common/Text';
import type { IThemeGridItem, IThemeCategory } from '../../types/mypage/types';

const THEME_CATEGORIES: IThemeCategory[] = [
  { id: 'all', label: '전체' },
  { id: 'cute', label: '귀여움' },
  { id: 'fancy', label: '화려함' },
  { id: 'game', label: '게임' },
  { id: 'animal', label: '동물' },
  { id: 'classic', label: '클래식' },
];

interface IThemeGridTabProps {
  themes: IThemeGridItem[];
  isLoading: boolean;
  emptyMessage: string;
}

export default function ThemeGridTab({ themes, isLoading, emptyMessage }: IThemeGridTabProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? themes
      : themes.filter((t) => t.categoryId === activeCategory);

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
      {/* 필터 칩 */}
      <div className="flex flex-wrap gap-2 px-4 py-3">
        {THEME_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'shrink-0 rounded-full border px-3 py-1 text-xs transition-colors',
                isActive
                  ? 'border-primary bg-primary text-white'
                  : 'border-secondary-300 bg-white text-secondary-400',
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 그리드 */}
      {filtered.length === 0 ? (
        <div className="flex h-40 items-center justify-center">
          <Text variant="REGULAR_14" className="text-secondary-300">
            {emptyMessage}
          </Text>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 px-4">
          {filtered.map((theme) => (
            <div key={theme.id} className="aspect-square rounded-sm bg-secondary-200" />
          ))}
        </div>
      )}
    </div>
  );
}
