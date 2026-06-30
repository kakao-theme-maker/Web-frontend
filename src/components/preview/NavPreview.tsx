import { useTabBarStyleStore } from '@/stores/tabBarStyleStore'

interface INavPreviewProps {
  selectedTab: 'friends' | 'chats' | 'openchats' | 'shopping' | 'more'
}

export default function NavPreview({ selectedTab }: INavPreviewProps) {
  const main = useTabBarStyleStore(
    (state) => state.main
  )

  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="relative w-full">
        <img src={main.backgroundImage} className="w-full"
          style={{
            backgroundColor: main.backgroundColor,
            backgroundImage: `url(${main.backgroundImage})`,
          }} />
        <nav className="absolute inset-0 grid grid-cols-5 justify-items-center items-center text-center text-gray-900">
          <img
            src={
              selectedTab === 'friends'
                ? main.friendsSelectedIconImage
                : main.friendsNormalIconImage
            }
            className="w-7"
          />

          <img
            src={
              selectedTab === 'chats'
                ? main.chatsSelectedIconImage
                : main.chatsNormalIconImage
            }
            className="w-7"
          />

          <img
            src={
              selectedTab === 'openchats'
                ? main.openChatsSelectedIconImage
                : main.openChatsNormalIconImage
            }
            className="w-7"
          />

          <img
            src={
              selectedTab === 'shopping'
                ? main.shoppingSelectedIconImage
                : main.shoppingNormalIconImage
            }
            className="w-7"
          />

          <img
            src={
              selectedTab === 'more'
                ? main.moreSelectedIconImage
                : main.moreNormalIconImage
            }
            className="w-7"
          />
        </nav>
      </div>
    </div>
  )
}