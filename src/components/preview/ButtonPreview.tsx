import { useMainViewStyleStore } from "@/stores/mainViewStyleStore";

type ButtonSize = "sm" | "md" | "lg";

interface IButtonPreviewProps {
  label: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
  size?: ButtonSize;
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-5 px-2 py-0.5 text-[10px] font-normal",
  md: "h-6 px-2.5 py-1 text-xs font-light",
  lg: "h-7 px-3 py-1 text-xs",
};

export default function ButtonPreview({
  label, icon, isSelected, size = "lg" }: IButtonPreviewProps) {
  const primary = useMainViewStyleStore(
    (state) => state.primary
  )

  return (
    <button className={`border border-black rounded-3xl ${sizeStyles[size]}`}
      style={{
        color: isSelected ? primary.backgroundColor : primary.textColor,
        backgroundColor: isSelected ? primary.textColor : primary.backgroundColor,
        borderColor: `${primary.textColor}30`,
      }}>
      {label}
    </button>
  )
}