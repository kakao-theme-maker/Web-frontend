import { cn } from "../../utils/clsx/cs";
import ICONS from "./constants";
import type { IconList } from "./constants";

export type IconProps = {
  icon: IconList;
  className?: string;
  fill?: boolean;
};

const Icon = ({ icon, className }: IconProps) => {
  const iconData = ICONS[icon];
  const svgOptions = iconData.svgOptions || {};
  const shouldFill = iconData?.fill ?? true;

  return (
    <svg
      className={cn(className, shouldFill ? "fill-current" : "")}
      fill="#000"
      xmlns="http://www.w3.org/2000/svg"
      {...svgOptions} // 먼저 spread
      viewBox={svgOptions.viewBox || "0 0 20 20"}
    >
      {iconData.icon}
    </svg>
  );
};

export default Icon;
