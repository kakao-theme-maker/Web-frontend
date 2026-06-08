import { DEFAULT_IMAGES } from '@/constants/defaultImages'

export default function ChatRoomListItem() {
  return (
    <div className="flex flex-row gap-2">
      <img
        src={DEFAULT_IMAGES.profileImg01}
        className="w-10 h-10 object-cover rounded-xl"
      />
      <div className="flex-1 flex flex-col">
        <span>어피치</span>
        <span>오늘의 장보기 목록</span>
      </div>
      <div>
        <span className='text-gray-500'>오후 3:45</span>
      </div>
    </div>
  )
}
