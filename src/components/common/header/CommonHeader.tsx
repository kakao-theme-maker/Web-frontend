import { cn } from "../../../utils/clsx/cn";
import Icon from "../../icons";

const CommonHeader = ({
  hasBackIcon,
  title,
}: {
  hasBackIcon?: boolean;
  title: string;
}) => {
  return (
    <div
      className={cn(
        "common__header w-full h-[40px] flex justify-center items-center gap-[16px] mb-[20px]"
      )}
    >
      <Icon icon={"MAIN_ICON"} className="main__icon w-[30px] h-[30px]" />
      <span className={cn("font-bold")}>{title}</span>
    </div>
  );
};

export default CommonHeader;
