import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import maintabBgImage from '@/assets/images/maintabBgImage.png';
import maintabIcoFriends from '@/assets/images/maintabIcoFriends.png';
import maintabIcoFriendsSelected from '@/assets/images/maintabIcoFriendsSelected.png';
import maintabIcoChats from '@/assets/images/maintabIcoChats.png';
import maintabIcoChatsSelected from '@/assets/images/maintabIcoChatsSelected.png';
import maintabIcoNow from '@/assets/images/maintabIcoNow.png';
import maintabIcoNowSelected from '@/assets/images/maintabIcoNowSelected.png';
// import maintabIcoPiccoma from '@/assets/images/maintabIcoPiccoma.png';
// import maintabIcoPiccomaSelected from '@/assets/images/maintabIcoPiccomaSelected.png';
import maintabIcoShopping from '@/assets/images/maintabIcoShopping.png';
import maintabIcoShoppingSelected from '@/assets/images/maintabIcoShoppingSelected.png';
import maintabIcoCall from '@/assets/images/maintabIcoCall.png';
import maintabIcoCallSelected from '@/assets/images/maintabIcoCallSelected.png';
import maintabIcoMore from '@/assets/images/maintabIcoMore.png';
import maintabIcoMoreSelected from '@/assets/images/maintabIcoMoreSelected.png';

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
  // piccomaNormalIconImage: string                   // -ios-piccoma-normal-icon-image
  // piccomaSelectedIconImage: string                 // -ios-piccoma-selected-icon-image
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
  backgroundImage: maintabBgImage,
  friendsNormalIconImage: maintabIcoFriends,
  friendsSelectedIconImage: maintabIcoFriendsSelected,
  chatsNormalIconImage: maintabIcoChats,
  chatsSelectedIconImage: maintabIcoChatsSelected,
  nowNormalIconImage: maintabIcoNow,
  nowSelectedIconImage: maintabIcoNowSelected,
  // piccomaNormalIconImage: maintabIcoPiccoma,
  // piccomaSelectedIconImage: maintabIcoPiccomaSelected,
  shoppingNormalIconImage: maintabIcoShopping,
  shoppingSelectedIconImage: maintabIcoShoppingSelected,
  callNormalIconImage: maintabIcoCall,
  callSelectedIconImage: maintabIcoCallSelected,
  moreNormalIconImage: maintabIcoMore,
  moreSelectedIconImage: maintabIcoMoreSelected,
  openChatsNormalIconImage: maintabIcoNow,
  openChatsSelectedIconImage: maintabIcoNowSelected
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