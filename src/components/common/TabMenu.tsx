import Text from "./Text";

interface ITab {
  id: string;
  label: string;
}

interface ITabMenuProps {
  tabs: ITab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  cols?: 2 | 3 | 4;
  showInactiveBorder?: boolean;
}

const GRID_COLS_CLASS: Record<2 | 3 | 4, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export default function TabMenu({ tabs, activeTab, onTabChange, cols = 2, showInactiveBorder = false }: ITabMenuProps) {
  return (
    <div className={`sticky top-0 z-10 grid ${GRID_COLS_CLASS[cols]} bg-white text-center`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pt-4 pb-1 transition-colors ${isActive ? "text-primary" : "text-secondary-300"}`}
          >
            <span
              className={`border-b-2 pb-1 px-1 transition-all ${isActive ? "border-primary" : showInactiveBorder ? "border-secondary-200" : "border-transparent"}`}
            >
              <Text variant={isActive ? "SEMIBOLD_14" : "REGULAR_14"}>{tab.label}</Text>
            </span>
          </button>
        );
      })}
    </div>
  );
}
