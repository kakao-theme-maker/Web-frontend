import { cn } from "../../../utils/clsx/cn";
import Icon, { type IconList } from "../../icons";
import { useNavigate } from "react-router-dom";

const FOOTER_MENUS: {
  key: string;
  icon: IconList;
  label: string;
  path: string;
}[] = [
  {
    key: "home",
    icon: "FOOTER_HOME",
    label: "홈",
    path: "/",
  },
  {
    key: "posts",
    icon: "FOOTER_NOTICE",
    label: "게시글",
    path: "/",
  },
  {
    key: "notice",
    icon: "FOOTER_RING",
    label: "알림",
    path: "/",
  },
  {
    key: "my",
    icon: "FOOTER_PEOPLE",
    label: "마이",
    path: "/",
  },
];

const CommonFooter = () => {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        "common__footer w-full h-[89px] pt-[15px] pb-[27px] pr-[34px] pl-[34px] flex items-center justify-between box-border",
        "bg-white"
      )}
    >
      {FOOTER_MENUS.map((item) => (
        <button
          key={item.key}
          className=" flex flex-col items-center gap-[9px] text-[12px] cursor-pointer"
          onClick={() => navigate(item.path)}
        >
          <Icon icon={item.icon} className="w-[24px] h-[24px]  " />
          <p>{item.label}</p>
        </button>
      ))}
    </div>
  );
};

export default CommonFooter;
