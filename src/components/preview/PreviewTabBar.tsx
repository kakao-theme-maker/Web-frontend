import { useTabBarStyleStore } from "@/stores/tabBarStyleStore";
import PreviewChatRoomList from "./PreviewChatRoomList";
import NavPreview from "./NavPreview";

export default function PreviewTabBar() {
  const tabBar = useTabBarStyleStore(
    (state) => state.main
  )

  return (
    <div className="absolute inset-1">
      <PreviewChatRoomList />
      <div className='absolute inset-0
          bg-black/50 rounded-2xl'/>
      <div className="absolute bottom-0 w-full">
        <NavPreview selectedTab="friends" />
      </div>
    </div>
  )
}
