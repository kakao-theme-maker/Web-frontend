import { useFeatureStyleStore } from "@/stores/featureStyleStore";
import ButtonPreview from "./ButtonPreview";
import { useMainViewStyleStore } from "@/stores/mainViewStyleStore";

interface IFriendChipProps {
  label?: string;
  variant?: "horizontal" | "vertical" | "full";
  description?: string;
  isSelected?: boolean;
}

export default function FriendChip({
  label,
  variant = "full",
  description,
  isSelected = false,
}: IFriendChipProps) {
  const profile = useFeatureStyleStore(
    (state) => state.defaultProfile
  )

  const primary = useMainViewStyleStore(
    (state) => state.primary
  )

  return (
    <div className="relative">
      {variant === "horizontal" && (
        <div className="flex gap-2 justify-center items-center">
          <img
            src={profile.profileImages}
            className="w-10 h-10 rounded-xl"
          />
          <span style={{ color: primary.textColor }}>{label}</span>
        </div>
      )}

      {variant === "vertical" && (
        <div className="flex flex-col gap-1 justify-center items-center">
          <img
            src={profile.profileImages}
            className="w-9 h-9 rounded-xl"
          />
          <span style={{ color: primary.textColor }}
            className="text-[10px]">{label}</span>
        </div>
      )}

      {variant === "full" && (
        <div className="flex w-full gap-2 items-center p-1">
          <img
            src={profile.profileImages}
            className="w-8 h-8 rounded-xl"
          />
          <div className="flex-1 flex flex-col">
            <span style={{ color: primary.textColor }}>{label}</span>
            <span style={{ color: primary.descriptionTextColor }}
              className="text-[10px]">{description}</span>
          </div>

          <ButtonPreview label="선물하기" size="md" />
        </div>
      )}
      <div className="absolute -inset-x-2 inset-y-0"
        style={{
          backgroundColor: isSelected ? primary.selectedBackgroundColor : "transparent",
          opacity: isSelected ? primary.selectedBackgroundAlpha : 0,
        }} />
    </div>

  );
}