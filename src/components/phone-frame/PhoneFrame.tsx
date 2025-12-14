import AppRoutes from "../../routes/AppRoutes";
import { cn } from "../../utils/clsx/cn";

const PhoneFrame = () => {
  return (
    <div
      className={cn(
        "w-phone-primary h-phone-primary rounded-[2.1rem] bg-transparent relative overflow-hidden",
        "border-solid border border-[rgba(255,255,255,0.05)]",
        "shadow-[0_10px_30px_rgba(0,0,0,.7),inset_0_1px_2px_rgba(255,255,255,.25),inset_0_-1px_2px_rgba(0,0,0,.7),inset_0_0_15px_rgba(255,255,255,.05)]"
      )}
    >
      <div
        className={cn(
          "safe-area",
          "h-full h-full p-[0.5rem] rounded-[2.1rem] bg-[#333] relative overflow-hidden"
        )}
      >
        <div
          className={cn(
            "notch",
            "w-[120px] h-[26px] bg-[#333] absolute left-[0] right-[0] mx-auto rounded-[0.85rem] box-border p-[8px] z-10"
          )}
        >
          <div
            className={cn(
              "notch_camera",
              "bg-pink-200 h-full aspect-square rounded-full"
            )}
          ></div>
        </div>
        <div
          className={cn(
            "screen-area",
            "bg-white h-full rounded-[1.5rem] overflow-x-hidden overflow-y-auto pt-[40px]",
            "custom-scrollbar-container"
          )}
        >
          <AppRoutes />
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
