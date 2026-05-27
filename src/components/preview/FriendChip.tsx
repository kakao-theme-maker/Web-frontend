import ButtonPreview from "./ButtonPreview";

interface IFriendChipProps {
  label?: string;
  variant?: "horizontal" | "vertical" | "full";
  description?: string;
}

export default function FriendChip({
  label,
  variant = "full",
  description,
}: IFriendChipProps) {
  return (
    <>
      {variant === "horizontal" && (
        <div className="flex gap-2 justify-center items-center">
          <div className="w-10 h-10 rounded-2xl bg-gray-400" />
          <span>{label}</span>
        </div>
      )}

      {variant === "vertical" && (
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="w-10 h-10 rounded-2xl bg-gray-400" />
          <span>{label}</span>
        </div>
      )}

      {variant === "full" && (
        <div className="flex w-full gap-2 items-center p-1">
          <div className="w-8 h-8 rounded-xl bg-gray-400" />

          <div className="flex-1 flex flex-col">
            <span>{label}</span>
            <span>{description}</span>
          </div>

          <ButtonPreview label="선물하기" />
        </div>
      )}
    </>
  );
}