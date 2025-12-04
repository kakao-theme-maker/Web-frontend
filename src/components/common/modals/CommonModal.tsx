import { cn } from "../../../utils/clsx/cn";
import Icon from "../../icons";

const CommonModal = ({
  isWarning,
  content,
  warningButton,
  onFirst,
  onSecond,
}: {
  isWarning?: boolean;
  content: React.ReactNode;
  warningButton?: string[];
  onFirst?: () => void;
  onSecond?: () => void;
}) => {
  return (
    <div
      className={cn(
        "common__modal__cm",
        "w-[280px] py-[20px] bg-white rounded-[10px]",
        "flex flex-col items-center"
      )}
    >
      {isWarning ? (
        <Icon icon={"WARNING"} className="warning__icon w-[100px] h-[100px]" />
      ) : (
        <div></div>
      )}
      <div className="modal__content">{content}</div>
      <div className="modal__buttons mt-[20px] flex gap-[10px]">
        {warningButton ? (
          warningButton.map((wb: string, i: number) => (
            <button
              key={wb}
              className={`w-[100px] py-[6px] rounded-[6px] ${
                i === 0 ? "bg-[#0352ff] text-white" : ""
              }
              ${i === 1 ? "border border-solid border-[#0352ff]" : ""}`}
              onClick={i === 0 ? onFirst : onSecond}
            >
              {wb}
            </button>
          ))
        ) : (
          <button>확인</button>
        )}
      </div>
    </div>
  );
};

export default CommonModal;
