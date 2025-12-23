import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import CommonHeader from "../../components/common/header-and-footer/CommonHeader";
import CommonTabs from "../../components/common/tabs/CommonTabs";
import { useState } from "react";
import { Skeleton } from "../../components/ui/skeleton";
import CommonBtn from "../../components/common/button/CommonBtn";
import CommonMenu from "../../components/common/memu/CommonMenu";

const MOCK_THEMES = {
  id: "1",
  src: "https://github.com/shadcn.png",
  name: "정현진",
  email: "jhj0987@naver.com",
  upload: "1",
  following: "2",
  follow: "2",
};

const MOCK_CONTENT_THEMES = [
  {
    id: "1",
    profile_img: "https://github.com/shadcn.png",
    name: "정현진",
    date: "jhj0987@naver.com",
    content_img: "1",
  },
  {
    id: "2",
    profile_img: "https://github.com/shadcn.png",
    name: "김용명",
    date: "jhj0987@naver.com",
    content_img: "1",
  },
  {
    id: "1",
    profile_img: "https://github.com/shadcn.png",
    name: "박진주",
    date: "jhj0987@naver.com",
    content_img: "https://github.com/shadcn.png",
  },
];

const MyPage = () => {
  const [currentTab, setCurrentTab] = useState<string>("action");
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <CommonHeader title="마이페이지" />
      <div className="flex flex-col items-center gap-[13px] text-center">
        <Avatar className="w-[85px] h-[85px]">
          <AvatarImage src={MOCK_THEMES.src} alt="@shadcn" />
        </Avatar>
        <div className="flex flex-col gap-[3px]">
          <p className="font-semibold">{MOCK_THEMES.name}</p>
          <p className="text-[#C4C4C4] text-[12px] font-light">
            {MOCK_THEMES.email}
          </p>
        </div>
        <div className="flex justify-between  w-[245px] mr-auto ml-auto mb-[15px]">
          <div>
            <p className="text-[15px]">업로드</p>
            <p className="font-semibold">{MOCK_THEMES.upload}</p>
          </div>
          <div className="border border-r-0 border-[#D4D4D4] height-[42px]"></div>
          <div>
            <p className="text-[15px]">팔로잉</p>
            <p className="font-semibold">{MOCK_THEMES.following}</p>
          </div>
          <div className="border border-r-0 border-[#D4D4D4] height-[42px]"></div>
          <div>
            <p className="text-[15px]">팔로워</p>
            <p className="font-semibold">{MOCK_THEMES.follow}</p>
          </div>
        </div>
      </div>

      <CommonBtn btnName="프로필 수정" />
      <div className="flex pr-[38px] pl-[38px] mt-[20px]">
        {[ 
          { content: "활동", target: "action" },
          { content: "저장된", target: "save" },
          { content: "좋아요", target: "like" },
        ].map((tab) => (
          <CommonTabs
            key={tab.target}
            content={tab.content}
            target={tab.target}
            className="flex-1 text-center"
            setTarget={setCurrentTab}
            currentTab={currentTab}
          />
        ))}
      </div>
      <div>
        {currentTab === "action" &&
          MOCK_CONTENT_THEMES.map((item) => (
            <div key={item.id} className="mt-[20px]">
              <div className="flex justify-between items-center pl-[22px] pr-[30px] pb-[12px] ">
                <div className="flex items-center gap-[11px]">
                  <div className="w-[39px] h-[40px]  rounded-full">
                    <img
                      src={item.profile_img}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-[#484A50] text-[15px] font-bold">
                      {item.name}
                    </p>
                    <p className="text-[#484A50] text-[10px]">{item.date}</p>
                  </div>
                </div>
                <CommonMenu
                  menuList={[
                    { label: "수정하기" },
                    { label: "삭제하기" },
                    { label: "댓글제한" },
                  ]}
                />
              </div>
              <div>
                {loading ? (
                  <Skeleton className={"aspect-[5/5]"} />
                ) : (
                  <img src={item.content_img} />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyPage;
