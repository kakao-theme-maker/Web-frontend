import { Link } from "react-router-dom";

interface ICustomCategoryTabProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isSelected?: boolean;
  onClick?: () => void;
};

export default function CustomCategoryTab({
  icon,
  label,
  href,
  isSelected = false,
  onClick,
}: ICustomCategoryTabProps) {
  return (
    <Link
      to={href}
      className={`w-16 flex-shrink-0 flex flex-col items-center cursor-pointer
          py-4 gap-2
        ${isSelected ? "text-blue-500" : "text-white"}`}
      onClick={onClick}
    >
      <span className="flex h-8 w-8 items-center justify-center">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}