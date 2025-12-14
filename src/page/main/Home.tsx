import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/clsx/cn";
import CommonHeader from "../../components/common/header-and-footer/CommonHeader";
import CommonTabs from "../../components/common/tabs/CommonTabs";
import SearchBox from "../../components/search-box/SearchBox";
import LoadingSkeleton from "../../components/common/loading-skeleton/LoadingSkeleton";
import Icon from "../../components/icons";
import CommonFooter from "../../components/common/header-and-footer/CommonFooter";

const Home = () => {
  const [currentTab, setCurrentTab] = useState("action");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  return (
    <div className={cn("w-full h-full flex flex-col relative")}>
      <div className="flex-1 overflow-y-auto">
        <CommonHeader title={"테마 커뮤니티"} />
        <div className="tabs__part flex border-b border-solid border-[#cacaca]">
          <CommonTabs
            content="활동"
            target="action"
            className="flex-1 text-center"
            setTarget={setCurrentTab}
            currentTab={currentTab}
          />
          <CommonTabs
            content="키워드"
            target="keyword"
            className="flex-1 text-center"
            setTarget={setCurrentTab}
            currentTab={currentTab}
          />
        </div>
        {currentTab === "action" && (
          <div className="home__contents py-[10px] px-[20px] pb-[80px]">
            <SearchBox />
            {loading ? <LoadingSkeleton /> : <></>}
          </div>
        )}
      </div>

      <button
        className={cn(
          "absolute bottom-[105px] right-[20px] z-20",
          "w-[105px] h-[46px] rounded-full text-white text-[14px]",
          "bg-[#0352FF] shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
          "flex items-center justify-center gap-2",
          "hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-shadow"
        )}
        onClick={() => navigate("/theme-write")}
      >
        <Icon icon={"PLUS"} className="w-[12px] h-[12px] fill-white" />
        <span>글쓰기</span>
      </button>

      <CommonFooter />
    </div>
  );
};

export default Home;
