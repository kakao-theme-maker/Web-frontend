import ButtonPreview from "./ButtonPreview";
import NavPreview from "./NavPreview";

export default function PreviewFeed() {
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


        {/* 오늘 생일 친구 더보기 버튼 */}
        <div className="flex justify-center py-2">
          <ButtonPreview label="오늘 생일 친구 더보기" />
        </div>
        {/* 새로운 친구 */}
        <section>새로운 친구 1</section>
        {/* 네비게이션 */}
        <NavPreview selectedTab="friends" />
      </div>
    </div>
  )
}
