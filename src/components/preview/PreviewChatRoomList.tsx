import NavPreview from './NavPreview'
import ButtonPreview from './ButtonPreview'
import { Menu, MessageCirclePlusIcon, Search, Settings } from 'lucide-react'
import ChatRoomListItem from './ChatRoomListItem'
import { useMainViewStyleStore } from '@/stores/mainViewStyleStore'

export default function PreviewChatRoomList() {
  const primary = useMainViewStyleStore(
    (state) => state.primary
  )

  return (
    <div className="w-[90%] max-w-[330px] aspect-[390/700] 
        border border-gray-300 rounded-2xl p-1 text-xs">
      <div className="relative w-full h-full rounded-2xl p-2"
        style={{
          backgroundColor: primary.backgroundColor,
        }}>
        {/* 헤더 */}
        <header className="flex gap-2 items-center p-2">
          <span className='text-lg'>채팅</span>
          <div className="ml-auto flex gap-2">
            <Search size={16} />
            <MessageCirclePlusIcon size={16} />
            <Settings size={16} />
          </div>
        </header>
        {/* 친구, 소식 버튼 */}
        <section className="flex gap-1 p-2">
          <ButtonPreview label="전체" />
          <ButtonPreview label="안읽음" />
          <ButtonPreview label="친구" />
          <Menu size={16} className='w-6 h-6 border rounded-full border-gray-700 p-1' />
        </section>
        {/* 광고 */}
        <section>
          <div className="relative flex w-full h-16 bg-gray-100 rounded-lg p-4 my-4">
            <p className="absolute">광고</p>
          </div>
        </section>
        {/* 채팅방 목록 */}
        <section className='flex flex-col gap-4'>
          <ChatRoomListItem />
          <ChatRoomListItem />
          <ChatRoomListItem />
        </section>
        {/* 네비게이션 */}
        <NavPreview />
      </div>
    </div>
  )
}
