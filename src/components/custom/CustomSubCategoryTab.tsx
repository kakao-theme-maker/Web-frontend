interface ICustomSubCategoryTabProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
};

export default function CustomSubCategoryTab(
  { label, isSelected = false, onClick }: ICustomSubCategoryTabProps
) {
  return (
    <div
      className={`flex flex-col items-center cursor-pointer bg-blue-400
      py-4 gap-1
    ${isSelected ? "text-white" : "text-gray-500"}`}
      onClick={onClick}>{label}</div>
  )
}
