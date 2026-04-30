import Text from '../common/Text';
import { cn } from '../../utils/cn';

export type HomeTabId = 'create' | 'popular' | 'bookmarked';

const TABS: { id: HomeTabId; label: string }[] = [
  { id: 'create', label: '테마 제작' },
  { id: 'popular', label: '인기 테마' },
  { id: 'bookmarked', label: '저장 테마' },
];

interface IHomeTabsProps {
  activeTab: HomeTabId;
  onTabChange: (tab: HomeTabId) => void;
}

export default function HomeTabs({ activeTab, onTabChange }: IHomeTabsProps) {
  return (
    <div className="sticky top-0 z-20 grid grid-cols-3 bg-white px-4 pt-5 text-center">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn('pb-2 transition-colors', isActive ? 'text-primary' : 'text-black')}
          >
            <span
              className={cn(
                'inline-flex border-b-2 px-1 pb-2',
                isActive ? 'border-primary' : 'border-transparent',
              )}
            >
              <Text variant={isActive ? 'SEMIBOLD_15' : 'LIGHT_15'}>{tab.label}</Text>
            </span>
          </button>
        );
      })}
    </div>
  );
}
