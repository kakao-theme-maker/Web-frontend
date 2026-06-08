import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ITabBarStyleMain {
  backgroundColor: string
  backgroundImage: string                          // -ios-background-image (top-center-crop)
  // 친구탭
  friendsNormalIconImage: string                   // -ios-friends-normal-icon-image
  friendsSelectedIconImage: string                 // -ios-friends-selected-icon-image
  // 채팅탭
  chatsNormalIconImage: string                     // -ios-chats-normal-icon-image
  chatsSelectedIconImage: string                   // -ios-chats-selected-icon-image
  // 지금
  nowNormalIconImage: string                       // -ios-now-normal-icon-image
  nowSelectedIconImage: string                     // -ios-now-selected-icon-image
  // 만화탭 (일본)
  piccomaNormalIconImage: string                   // -ios-piccoma-normal-icon-image
  piccomaSelectedIconImage: string                 // -ios-piccoma-selected-icon-image
  // 쇼핑탭
  shoppingNormalIconImage: string                  // -ios-shopping-normal-icon-image
  shoppingSelectedIconImage: string                // -ios-shopping-selected-icon-image
  // 콜탭
  callNormalIconImage: string                      // -ios-call-normal-icon-image
  callSelectedIconImage: string                    // -ios-call-selected-icon-image
  // 더보기탭
  moreNormalIconImage: string                      // -ios-more-normal-icon-image
  moreSelectedIconImage: string                    // -ios-more-selected-icon-image
  // 오픈채팅탭 (하위호환)
  openChatsNormalIconImage: string                 // -ios-openchats-normal-icon-image
  openChatsSelectedIconImage: string               // -ios-openchats-selected-icon-image
}

export interface TabBarStyleState {
  main: ITabBarStyleMain

  setMain: (style: Partial<ITabBarStyleMain>) => void
  resetMain: () => void
}

const DEFAULT_TAB_BAR_STYLE_MAIN: ITabBarStyleMain = {
  backgroundColor: '',
  backgroundImage: 'maintabBgImage.png',
  friendsNormalIconImage: 'maintabIcoFriends.png',
  friendsSelectedIconImage: 'maintabIcoFriendsSelected.png',
  chatsNormalIconImage: 'maintabIcoChats.png',
  chatsSelectedIconImage: 'maintabIcoChatsSelected.png',
  nowNormalIconImage: 'maintabIcoNow.png',
  nowSelectedIconImage: 'maintabIcoNowSelected.png',
  piccomaNormalIconImage: 'maintabIcoPiccoma.png',
  piccomaSelectedIconImage: 'maintabIcoPiccomaSelected.png',
  shoppingNormalIconImage: 'maintabIcoShopping.png',
  shoppingSelectedIconImage: 'maintabIcoShoppingSelected.png',
  callNormalIconImage: 'maintabIcoCall.png',
  callSelectedIconImage: 'maintabIcoCallSelected.png',
  moreNormalIconImage: 'maintabIcoMore.png',
  moreSelectedIconImage: 'maintabIcoMoreSelected.png',
  openChatsNormalIconImage: 'maintabIcoNow.png',
  openChatsSelectedIconImage: 'maintabIcoNowSelected.png',
}

export const useTabBarStyleStore = create<TabBarStyleState>()(
  persist(
    (set) => ({
      main: { ...DEFAULT_TAB_BAR_STYLE_MAIN },

      setMain: (style) =>
        set((state) => ({
          main: { ...state.main, ...style },
        })),

      resetMain: () => set({ main: { ...DEFAULT_TAB_BAR_STYLE_MAIN } }),
    }),
    {
      name: 'tab-bar-style',
    }
  )
)