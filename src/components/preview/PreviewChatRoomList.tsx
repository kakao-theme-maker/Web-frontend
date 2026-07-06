import NavPreview from './NavPreview'
import ButtonPreview from './ButtonPreview'
import { BellOff, Menu, MessageCirclePlusIcon, Pin, Search, Settings } from 'lucide-react'
import { useMainViewStyleStore } from '@/stores/mainViewStyleStore'
import { useFeatureStyleStore } from '@/stores/featureStyleStore'

export default function PreviewChatRoomList() {
  const primary = useMainViewStyleStore(
    (state) => state.primary
  )

  const header = useMainViewStyleStore(
    (state) => state.headerStyle
  )

  const profile = useFeatureStyleStore(
    (state) => state.defaultProfile
  )

  return (

    <div className="relative w-full h-full rounded-2xl p-2"
      style={{ backgroundColor: primary.backgroundColor, }}>
      {/* 헤더 */}
      <header className="flex gap-2 items-center p-2"
        style={{ color: header.textColor }}>
        <span className='text-lg font-semibold'>채팅</span>
        <div className="ml-auto flex gap-3">
          <Search size={16} />
          <MessageCirclePlusIcon size={16} />
          <Settings size={16} />
        </div>
      </header>
      {/* 친구, 소식 버튼 */}
      <section className="flex gap-1 p-1">
        <ButtonPreview label="전체" />
        <ButtonPreview label="안읽음" />
        <ButtonPreview label="친구" isSelected />
        <Menu size={16} className='w-6 h-6 border rounded-full border-gray-700 p-1' />
      </section>
      {/* 광고 */}
      <section className='p-1'>
        <div className="relative flex w-full h-16 bg-gray-100 rounded-lg p-4 mb-2">
          <p className="absolute">광고</p>
        </div>
      </section>
      {/* 채팅방 목록 */}
      <section className='flex flex-col'>
        {/* 목록 아이템 */}
        <div className="flex flex-row items-center gap-2 px-1 py-2">
          <img
            src={profile.profileImages}
            className="w-10 h-10 object-cover rounded-2xl"
          />
          <div className="flex-1 flex flex-col">
            <div className='flex items-center gap-1'
              style={{ color: primary.textColor }}>
              <span className='w-3 h-3 flex items-center justify-center text-white rounded-full text-[8px]'
                style={{ backgroundColor: primary.textColor }}>나</span>
              <span>어피치</span>
              <Pin
                size={10}
                fill={primary.textColor}
                style={{ opacity: 0.4 }}
              />
              <span className='ml-auto text-[10px]' style={{ opacity: 0.4 }}>오후 12:30</span>
            </div>
            <span
              className='text-[11px]'
              style={{ color: primary.paragraphTextColor }}>오늘의 장보기 목록</span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 px-1 py-2">
          <img
            src={profile.profileImages}
            className="w-10 h-10 object-cover rounded-2xl"
          />
          <div className="flex-1 flex flex-col">
            <div className='flex items-center gap-1'
              style={{ color: primary.textColor }}>

              <span>춘식이</span>
              <BellOff
                size={10}
                fill={primary.textColor}
                style={{ opacity: 0.4 }}
              />
              <span className='ml-auto text-[10px]' style={{ opacity: 0.4 }}>오후 12:30</span>
            </div>
            <div className='flex'>
              <span
                className='text-[11px]'
                style={{ color: primary.paragraphTextColor }}>좋은 하루 보내~
              </span>
              <span className='px-1.5 py-0 ml-auto bg-orange-600 text-[10px] text-white rounded-full'>2</span>


            </div>

          </div>

        </div>

        <div className="flex flex-row relative items-center gap-2 px-1 py-2">
          <div className='absolute -inset-x-1 inset-y-0 rounded-2xl'
            style={{ backgroundColor: primary.selectedBackgroundColor, opacity: primary.selectedBackgroundAlpha }}></div>
          <img
            src={profile.profileImages}
            className="w-10 h-10 object-cover rounded-2xl"
          />
          <div className="flex-1 flex flex-col">
            <div className='flex items-center gap-1'
              style={{ color: primary.highlightedTextColor }}>
              <span>탄천 러닝함께해요</span>
              <span
                style={{ opacity: 0.4 }}
              >34</span>
              <span className='ml-auto text-[10px]' style={{ opacity: 0.4 }}>오후 12:30</span>
            </div>
            <div className='flex'>
              <span
                className='text-[11px]'
                style={{ color: primary.paragraphHighlightedTextColor }}>
                러닝이 최고죠
              </span>
              <span className='px-1.5 py-0 ml-auto bg-orange-600 text-[10px] text-white rounded-full'>10</span>
            </div>

          </div>
        </div>

      </section>
      {/* 네비게이션 */}
      <NavPreview selectedTab='chats' />
    </div>

  )
}
