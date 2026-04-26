import { useCallback, useLayoutEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Text from '../../components/common/Text';
import { useIntersectionObserver } from '../../services/hooks/common/useIntersectionObserver';
import {
  type HomeThemeListType,
  useHomeThemes,
} from '../../services/hooks/theme/useHomeThemes';
import type { IHomeTheme } from '../../types/community/theme';
import { cn } from '../../utils/cn';

type HomeTabId = 'create' | 'popular' | 'bookmarked';

interface IMobileLayoutOutletContext {
  scrollToTop: () => void;
}

const TABS: { id: HomeTabId; label: string }[] = [
  { id: 'create', label: '테마 제작' },
  { id: 'popular', label: '인기 테마' },
  { id: 'bookmarked', label: '저장 테마' },
];

function HomeTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: HomeTabId;
  onTabChange: (tab: HomeTabId) => void;
}) {
  return (
    <div className="sticky top-0 z-20 grid grid-cols-3 bg-white px-4 pt-5 text-center">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn("pb-2 transition-colors", isActive ? "text-primary" : "text-black")}
          >
            <span
              className={cn(
                "inline-flex border-b-2 px-1 pb-2",
                isActive ? "border-primary" : "border-transparent",
              )}
            >
              <Text variant={isActive ? "SEMIBOLD_15" : "LIGHT_15"}>{tab.label}</Text>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function HomeThemeCard({ theme }: { theme: IHomeTheme }) {
  return (
    <article className="aspect-[94/173] overflow-hidden rounded-[5px] border border-secondary-200 bg-[#f9f9fb]">
      {theme.previewImageUrl ? (
        <img src={theme.previewImageUrl} alt={theme.themeName} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full bg-[#f9f9fb]" aria-label={theme.themeName} />
      )}
    </article>
  );
}

function ThemeCardSkeleton() {
  return <div className="aspect-[94/173] animate-pulse rounded-[5px] border border-secondary-200 bg-[#f9f9fb]" />;
}

function HomeThemeGrid({ type }: { type: HomeThemeListType }) {
  const { themes, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useHomeThemes(type);

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const sentinelRef = useIntersectionObserver(handleIntersect);
  const emptyMessage = type === 'popular' ? '인기 테마가 없습니다.' : '저장한 테마가 없습니다.';

  if (isLoading) {
    return (
      <section className="grid grid-cols-3 gap-x-[15px] gap-y-10 px-[22px] pt-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <ThemeCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[280px] items-center justify-center">
        <Text variant="REGULAR_14" className="text-red-400">
          테마 목록을 불러올 수 없습니다.
        </Text>
      </div>
    );
  }

  if (themes.length === 0) {
    return (
      <div className="flex min-h-[280px] items-center justify-center">
        <Text variant="REGULAR_14" className="text-secondary-300">
          {emptyMessage}
        </Text>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-3 gap-x-[15px] gap-y-10 px-[22px] pt-3">
      {themes.map((theme) => (
        <HomeThemeCard key={theme.themeComponentId} theme={theme} />
      ))}
      <div ref={sentinelRef} className="col-span-3 h-1" />
      {isFetchingNextPage && (
        <div className="col-span-3 flex justify-center py-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </section>
  );
}

function PreparingTab() {
  return (
    <div className="flex min-h-[360px] items-center justify-center">
      <Text variant="REGULAR_15" className="text-black">
        아직 준비중입니다...
      </Text>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<HomeTabId>('popular');
  const { scrollToTop } = useOutletContext<IMobileLayoutOutletContext>();

  useLayoutEffect(() => {
    scrollToTop();
  }, [activeTab, scrollToTop]);

  return (
    <main className="min-h-full bg-white">
      <HomeTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'create' && <PreparingTab />}
      {activeTab === 'popular' && <HomeThemeGrid type="popular" />}
      {activeTab === 'bookmarked' && <HomeThemeGrid type="bookmarked" />}
    </main>
  );
}
