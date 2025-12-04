import type { Dispatch, SetStateAction } from "react";
import { cn } from "../../../utils/clsx/cn";

const CommonTabs = ({
  content,
  target,
  className,
  setTarget,
  currentTab,
}: {
  content: string;
  target: string;
  className?: string;
  setTarget: Dispatch<SetStateAction<string>>;
  currentTab: string;
}) => {
  return (
    <div className={cn(className)}>
      <button
        onClick={() => setTarget(target)}
        className={cn(
          "py-[6px]",
          target === currentTab
            ? "text-[#0352ff] font-bold relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-[#0352ff]"
            : "text-[#c4c4c4]"
        )}
      >
        {content}
      </button>
    </div>
  );
};

export default CommonTabs;
