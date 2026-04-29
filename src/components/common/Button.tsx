import { cn } from "../../utils/cn";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary";
  size?: "md" | "sm";
  isFullWidth?: boolean;
}

const VARIANT_CLASS: Record<NonNullable<IButtonProps["variant"]>, string> = {
  primary: "bg-primary text-white",
};

const SIZE_CLASS: Record<NonNullable<IButtonProps["size"]>, string> = {
  md: "py-2 px-4 rounded-lg text-[15px] font-semibold",
  sm: "py-2 px-4 rounded-[5px] text-xs font-medium",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isFullWidth = false,
  disabled,
  className,
  ...props
}: IButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "transition-colors",
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        isFullWidth && "w-full",
        disabled ? "cursor-not-allowed bg-secondary-300" : "",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
