import { DEFAULT_IMAGES } from "@/constants/defaultImages";
import { ArrowUp, ChevronLeft, Menu, Plus, Search, Smile } from "lucide-react";

export default function PreviewChatRoom() {
  return (
    <div className="w-[90%] max-w-[330px] aspect-[390/700] 
          border border-gray-300 rounded-2xl p-1 text-xs">
      <div className="flex flex-col relative w-full h-full rounded-2xl bg-gray-200">
        {/* <div className="absolute w-full ">
          <img src={DEFAULT_IMAGES.chatroomBg} className="w-full rounded-2xl" />
        </div> */}
        {/* 헤더 */}
        <header className="relative flex h-8 items-center p-4 pt-6 bg-[#ffe0e0] rounded-t-2xl">
          <ChevronLeft size={20} />
          <span className="absolute left-1/2 -translate-x-1/2">
            어피치
          </span>
          <div className="ml-auto flex gap-4">
            <Search size={16} />
            <Menu size={16} />
          </div>
        </header>
        {/* 배경 */}
        <div className="relative flex-1 min-h-0">
          <img
            src={DEFAULT_IMAGES.chatroomBg}
            className="w-full h-full object-cover"
          />
          <div className="absolute w-full h-full top-0 left-0 p-4 flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <img
                src={DEFAULT_IMAGES.profileImg01}
                className="w-8 h-8 object-cover rounded-xl"
              />
              <div className="flex flex-col">
                <span>어피치</span>
                <div
                  style={{
                    borderImage: `url(${DEFAULT_IMAGES.chatroomBubbleReceive01}) 30 30 30 30 fill / 20px 20px 20px 20px`,
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    display: 'inline-block',
                  }}
                >
                  <p className="my-1.5 mx-4 w-max">어피치피치한</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        {/* 채팅 입력 */}
        <div className="h-8 flex gap-2 items-center text-center p-2 bg-white">
          <div className="flex w-6 h-6 bg-gray-200 rounded-full items-center justify-center">
            <Plus size={16} /></div>
          <div className="flex flex-1 h-6 items-center justify-between px-2 bg-gray-100 rounded-full">
            <span>카카오톡 테마</span>
            <span><Smile size={20} /></span>
          </div>
          <span className="flex w-6 h-6 bg-gray-200 rounded-full items-center justify-center"><ArrowUp size={20} /> </span>

        </div>
      </div>
    </div>
  )
}
