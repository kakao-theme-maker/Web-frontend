import Text from "../../common/Text";
import type { ITab, TabId } from "../../../types/community/post";

interface ITabMenuProps {
  tabs: ITab[];
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}

export default function TabMenu({ tabs, activeTab, onTabChange }: ITabMenuProps) {
  return(
    <div className="sticky top-0 z-10 grid grid-cols-2 bg-white text-center">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button 
            key={tab.id} onClick={() => onTabChange(tab.id)}
            className={`pt-4 pb-1 transition-colors ${isActive ? 'text-primary' : 'text-secondary-300'}`}
          >
            <span 
              className={`border-b-2 pb-1 px-1 transition-all ${isActive ? 'border-primary' : 'border-transparent'}`}
            >
              <Text variant="BOLD_15">{tab.label}</Text>
            </span>
          </button>
        );
      })}
    </div>
  );
}