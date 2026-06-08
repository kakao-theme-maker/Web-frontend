
interface IButtonPreviewProps {
  label: string;
  textColor?: string;
  bgColor?: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
};

export default function ButtonPreview({
  label, textColor, bgColor, icon, isSelected }: IButtonPreviewProps) {
  return (
    <button className="h-7 border  border-black rounded-3xl px-3 py-1"
      style={{
        color: isSelected ? bgColor : textColor,
        backgroundColor: isSelected ? textColor : bgColor,
        borderColor: `${textColor}30`,
      }}>
      {label}
    </button>
  )
}
