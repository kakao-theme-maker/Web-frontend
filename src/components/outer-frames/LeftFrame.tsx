import AppRoutes from "../../routes/AppRoutes";
import { cn } from "../../utils/clsx/cs";

const LeftFrame = () => {
  return (
    <div className={cn("left__frame__wrapper", "flex flex-col items-center")}>
      <div
        className={cn(
          "title pretendard-700 text-[36px]",
          "mb-[20px] flex flex-col items-center"
        )}
      >
        <span
          className={cn(
            "bg-gradient-to-r text-transparent bg-clip-text from-[#8a01ff] to-[#2600ff]"
          )}
        >
          KOMENTUM
        </span>
        <span
          className={cn("secondary-title pretendard-300 text-[18px] block")}
        >
          카카오톡 테마 커스텀 서비스
        </span>
      </div>
      <div
        className={cn(
          "w-[370px] h-[650px] bg-gradient-to-b from-black to-[#b6b0b0] rounded-[36px] relative"
        )}
      >
        <div
          className={cn(
            "absolute top-[8px] bottom-[8px] left-[8px] right-[8px] bg-white rounded-[32px] overflow-hidden"
          )}
        >
          <AppRoutes />
        </div>
      </div>
    </div>
  );
};

export default LeftFrame;
