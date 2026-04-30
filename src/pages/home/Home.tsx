import { useLayoutEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import HomeTabs, { type HomeTabId } from '../../components/home/HomeTabs';
import HomeThemeGrid from '../../components/home/HomeThemeGrid';
import PreparingTab from '../../components/home/PreparingTab';

interface IMobileLayoutOutletContext {
  scrollToTop: () => void;
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
