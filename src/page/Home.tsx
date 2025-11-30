// Page Home

import { useState } from "react";
import CommonHeader from "../components/common/header/CommonHeader";
import CommonTabs from "../components/common/tabs/CommonTabs";
import { cn } from "../utils/clsx/cn";
import SearchBox from "../components/search-box/SearchBox";

const Home = () => {
  const [currentTab, setCurrentTab] = useState("action");

  return (
    <div className={cn("w-full h-full pt-[40px] flex flex-col")}>
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
        <div className="home__contents flex-1 py-[10px] px-[20px]">
          <SearchBox />
        </div>
      )}
    </div>
  );
};

export default Home;
