import ButtonPreview from "./ButtonPreview"
import FriendChip from "./FriendChip"

export default function PreviewFriends() {
  return (
    <div className="w-[90%] max-w-[330px] aspect-[390/700] 
      border border-gray-300 rounded-2xl p-1 text-xs">
      <div className="relative w-full h-full rounded-2xl bg-gray-200 p-2">
        {/* 헤더 */}
        <header className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded-xl bg-gray-400" />
          <span>어피치</span>
          <div className="ml-auto flex gap-2">
            <span>돋보기</span>
            <span>친구추가</span>
            <span>선물</span>
            <span>세팅</span>
          </div>
        </header>
        {/* 친구, 소식 버튼 */}
        <section className="flex gap-1 py-4">
          <ButtonPreview label="친구" />
          <ButtonPreview label="소식" />
        </section>
        {/* 광고 */}
        <section>
          <div className="relative flex w-full h-16 bg-gray-400 rounded-lg p-4">
            <p className="absolute">광고</p>
          </div>
        </section>
        {/* 업데이트한 친구 */}
        <section className="flex flex-col gap-2 py-3">
          <p>업데이트한 친구 4</p>
          <div className="flex gap-3">
            <FriendChip label="춘식이" variant="vertical" />
            <FriendChip label="라이언" variant="vertical" />
            <FriendChip label="카카오" variant="vertical" />
          </div>
        </section>
        <hr className="border-black py-1" />
        {/* 생일인 친구 */}
        <section >
          <p>생일인 친구 8</p>
          <div>
            <FriendChip label="스카피" description="오늘 · 내게 생일 선물 준 친구" />
            <FriendChip label="죠르디" description="오늘 · 내게 생일 선물 준 친구" />
            <FriendChip label="라이언" description="오늘" />
            <FriendChip label="춘식이" description="오늘" />
          </div>
        </section>
        {/* 오늘 생일 친구 더보기 버튼 */}
        <div className="flex justify-center py-2">
          <ButtonPreview label="오늘 생일 친구 더보기" />
        </div>
        {/* 새로운 친구 */}
        <section>새로운 친구 1</section>
        {/* 네비게이션 */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col ">
          <nav className="h-8 grid grid-cols-5 items-center text-center text-gray-900 bg-gray-500 rounded-b-2xl">
            <span>friends</span>
            <span>chats</span>
            <span>openchats</span>
            <span>shopping</span>
            <span>more</span>
          </nav>
        </div>
      </div>
    </div>
  )
}
