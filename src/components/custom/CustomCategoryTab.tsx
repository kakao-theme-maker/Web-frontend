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
      className={`flex flex-col items-center cursor-pointer bg-blue-400
          py-4 gap-1
        ${isSelected ? "text-blue-500" : "text-gray-500"}`}
      onClick={onClick}
    >
      <span className="flex h-8 w-8 items-center justify-center">{icon}</span>
      <span className="text-white">{label}</span>
    </Link>
  );
}