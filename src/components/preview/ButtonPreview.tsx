
interface IButtonPreviewProps {
  label: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
};

export default function ButtonPreview({
  label, icon, isSelected }: IButtonPreviewProps) {
  return (
    <button className="h-6 border border-black rounded-3xl px-2 py-0.5">
      {label}
    </button>
  )
}
