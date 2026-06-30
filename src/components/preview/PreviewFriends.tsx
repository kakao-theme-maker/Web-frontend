import { useMainViewStyleStore } from "@/stores/mainViewStyleStore"
import ButtonPreview from "./ButtonPreview"
import FriendChip from "./FriendChip"
import NavPreview from "./NavPreview"
import { useFeatureStyleStore } from "@/stores/featureStyleStore"
import { Gift, Search, Settings, UserPlus } from "lucide-react"

export default function PreviewFriends() {
  const primary = useMainViewStyleStore(
    (state) => state.primary
  )

  const section = useMainViewStyleStore(
    (state) => state.sectionTitleStyle
  )
  const profile = useFeatureStyleStore(
    (state) => state.defaultProfile
  )

  return (
    <div className="w-[90%] max-w-[330px] aspect-[390/700] 
      border border-gray-300 rounded-2xl p-1 text-xs">
      <div className="relative w-full h-full rounded-2xl p-2"
        style={{
          backgroundColor: primary.backgroundColor,
        }}>
        {/* 헤더 */}
        <header className="flex gap-2 items-center">
          <img
            src={profile.profileImages}
            className="w-7 h-7 rounded-xl"
          />
          <span className='font-semibold text-base' style={{ color: primary.textColor }}>어피치</span>
          <div className="ml-auto flex gap-3">
            <Search size={16} color={primary.textColor} />
            <UserPlus size={16} color={primary.textColor} />
            <Gift size={16} color={primary.textColor} />
            <Settings size={16} color={primary.textColor} />
          </div>
        </header>
        {/* 친구, 소식 버튼 */}
        <section className="flex gap-1 py-4">
          <ButtonPreview label="친구" isSelected />
          <ButtonPreview label="소식" />
        </section>
        {/* 광고 */}
        <section>
          <div className="relative flex w-full h-16 bg-gray-100 rounded-lg p-4">
            <p className="absolute">광고</p>
          </div>
        </section>
        {/* 업데이트한 친구 */}
        <section className="flex flex-col gap-2 py-3">
          <p style={{ color: section.textColor }} className="font-light text-[10px]">업데이트한 친구 4</p>
          <div className="flex gap-3">
            <FriendChip label="춘식이" variant="vertical" />
            <FriendChip label="라이언" variant="vertical" />
            <FriendChip label="카카오" variant="vertical" />
          </div>
        </section>
        <hr className="py-1"
          style={{
            borderColor: section.borderColor,
            opacity: section.borderAlpha,
          }} />
        {/* 생일인 친구 */}
        <section >
          <p style={{ color: section.textColor }} className="font-light text-[10px]">생일인 친구 8</p>
          <div>
            <FriendChip label="스카피" description="오늘 · 내게 생일 선물 준 친구" />
            <FriendChip label="죠르디" description="오늘 · 내게 생일 선물 준 친구" isSelected />
            <FriendChip label="라이언" description="오늘" />
            <FriendChip label="춘식이" description="오늘" />
          </div>
        </section>
        {/* 오늘 생일 친구 더보기 버튼 */}
        <div className="flex justify-center py-2">
          <ButtonPreview label="오늘 생일 친구 더보기" size="md" />
        </div>
        {/* 새로운 친구 */}
        {/* <section>새로운 친구 1</section> */}
        {/* 네비게이션 */}
        <NavPreview selectedTab="friends" />
      </div>
    </div>
  )
}
