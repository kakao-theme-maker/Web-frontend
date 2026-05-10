import { ActivityTab, CommunityTabs } from "../../components/community";
import { useThemeBoards } from "../../services/hooks/theme/useThemeBoards";

export default function List() {
  const themeBoards = useThemeBoards();

  return (
    <div>
      <CommunityTabs activeTab="theme" />
      <div className="flex-1">
        <ActivityTab {...themeBoards} />
      </div>
    </div>
  );
}
