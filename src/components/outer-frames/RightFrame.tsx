import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/clsx/cs";
import Icon from "../icons";

const RightFrame = () => {
  const location = useLocation();

  return (
    <div className={cn("right__icon__wrapper")}>
      <Link
        to="/"
        className={cn(
          "w-[54px] h-[54px] bg-white shadow-md flex justify-center items-center rounded-full border border-solid border-black",
          `${location.pathname === "/" ? "bg-black" : ""}`
        )}
      >
        <Icon
          className={cn(
            "home__icon w-[32px] h-[32px]",
            `${location.pathname === "/" ? "fill-white" : ""}`
          )}
          icon={"HOME"}
          fill={true}
        />
      </Link>
    </div>
  );
};

export default RightFrame;
