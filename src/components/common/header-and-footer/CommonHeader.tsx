import { useNavigate } from "react-router-dom";
import { cn } from "../../../utils/clsx/cn";
import Icon from "../../icons";

const CommonHeader = ({
  hasBackIcon,
  title,
}: {
  hasBackIcon?: boolean;
  title: string;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "common__header w-full h-[40px] flex items-center justify-center gap-[16px] mb-[20px] relative"
      )}
    >
      {hasBackIcon ? (
        <button
          className={cn("absolute top-1/2 -translate-y-1/2 left-[22px]")}
          onClick={() => navigate(-1)}
        >
          <Icon
            icon={"HEADER_BACK_ICON"}
            className="back__icon w-[8px] h-[16px] fill-none"
          />
        </button>
      ) : (
        ""
      )}
      <div
        className={cn(
          "logo__title flex items-center gap-[12px]  justify-center cursor"
        )}
      >
        <Icon icon={"MAIN_ICON"} className="main__icon w-[30px] h-[30px]" />
        <span className={cn("font-bold")}>{title}</span>
      </div>
    </div>
  );
};

export default CommonHeader;
