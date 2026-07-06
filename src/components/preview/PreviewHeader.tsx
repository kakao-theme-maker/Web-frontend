import HeaderPreview from "./HeaderPreview";
import PreviewChatRoomList from "./PreviewChatRoomList";

export default function PreviewHeader() {
  return (
    <div className="absolute inset-1">
      <PreviewChatRoomList />
      <div className='absolute inset-0
            bg-black/50 rounded-2xl'/>
      <div className="absolute top-0 w-full">
        <HeaderPreview />
      </div>
    </div>
  )
}
