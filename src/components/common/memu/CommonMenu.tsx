import { useState } from "react";
import Icon from "../../icons";

type MenuItem = {
  label: string;
  onClick?: () => void;
};

interface CommonMenuProps {
  menuList: MenuItem[];
}

const CommonMenu = (prop: CommonMenuProps) => {
  const [isClick, setIsClick] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsClick((prev) => !prev)}
        className={`
         ${
           isClick
             ? "bg-[#0352FF] w-[32px] h-[32px] rounded-full flex justify-center items-center text-[white]"
             : ""
         }`}
      >
        <Icon
          icon={"MYPAGE_GROUP"}
          className={`w-[12px] h-[12px]${isClick ? " fill-white" : ""} `}
        />
      </button>
      {isClick && (
        <>
          <div className="absolute right-0 rounded-[16px] w-[105px] mt-[10px] border-[0.5px] border-[#C4C4C4]  bg-[white] z-10 ">
            {prop.menuList.map((item, idx) => (
              <p
                key={idx}
                className="flex justify-center align-center pt-[10px] pb-[10px] text-[12px] font-medium  border-b-[0.5px] last:border-b-0"
                onClick={() => {
                  item.onClick?.();
                }}
              >
                {item.label}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CommonMenu;
