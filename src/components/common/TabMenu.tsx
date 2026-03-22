import Text from "./Text";
import { cn } from "../../utils/cn";

interface ITab<T extends string> {
  id: T;
  label: string;
}

interface ITabMenuProps<T extends string> {
  tabs: ITab<T>[];
  activeTab: T;
  onTabChange: (id: T) => void;
  cols?: 2 | 3 | 4;
  showInactiveBorder?: boolean;
}

const GRID_COLS_CLASS: Record<2 | 3 | 4, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export default function TabMenu<T extends string>({ tabs, activeTab, onTabChange, cols = 2, showInactiveBorder = false }: ITabMenuProps<T>) {
  return (
    <div className={cn("sticky top-0 z-10 grid bg-white text-center", GRID_COLS_CLASS[cols])}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn("pt-4 pb-1 transition-colors", isActive ? "text-primary" : "text-secondary-300")}
          >
            <span
              className={cn("border-b-2 pb-1 px-1 transition-all", isActive ? "border-primary" : showInactiveBorder ? "border-secondary-200" : "border-transparent")}
            >
              <Text variant={isActive ? "SEMIBOLD_14" : "REGULAR_14"}>{tab.label}</Text>
            </span>
          </button>
        );
      })}
    </div>
  );
}
