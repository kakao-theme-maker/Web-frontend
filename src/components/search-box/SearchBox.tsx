import { cn } from "../../utils/clsx/cn";
import Icon from "../icons";

const SearchBox = () => {
  return (
    <div
      className={cn(
        "w-full h-[36px] bg-[#f8f7f7] rounded-[3px] overflow-hidden relative"
      )}
    >
      <input
        type="text"
        className="w-full h-full bg-transparent outline-none pl-[40px] text-[14px]"
        placeholder="검색"
      />
      <button className="absolute top-0 bottom-0 my-auto left-[10px]">
        <Icon
          icon={"SEARCH"}
          className={"search__icon w-[17px] h-[17px] fill-none"}
        />
      </button>
    </div>
  );
};

export default SearchBox;
