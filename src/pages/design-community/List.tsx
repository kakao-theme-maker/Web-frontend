import { DesignActivityTab } from "../../components/community/design";
import { CommunityTabs } from "../../components/community";
import { useDesignBoards } from "../../services/hooks/design/useDesignBoards";

export default function List() {
  const designBoards = useDesignBoards();

  return (
    <div>
      <CommunityTabs activeTab="design" />
      <div className="flex-1">
        <DesignActivityTab {...designBoards} />
      </div>
    </div>
  );
}
