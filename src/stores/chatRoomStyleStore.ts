import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import chatroomBgImage from '@/assets/images/chatroomBgImage.png'
import chatroomBubbleSend01 from '@/assets/images/chatroomBubbleSend01.png'
import chatroomBubbleSend01Selected from '@/assets/images/chatroomBubbleSend01Selected.png'
import chatroomBubbleSend02 from '@/assets/images/chatroomBubbleSend02.png'
import chatroomBubbleSend02Selected from '@/assets/images/chatroomBubbleSend02Selected.png'
import chatroomBubbleReceive01 from '@/assets/images/chatroomBubbleReceive01.png'
import chatroomBubbleReceive01Selected from '@/assets/images/chatroomBubbleReceive01Selected.png'
import chatroomBubbleReceive02 from '@/assets/images/chatroomBubbleReceive02.png'
import chatroomBubbleReceive02Selected from '@/assets/images/chatroomBubbleReceive02Selected.png'


/* BackgroundStyle-ChatRoom */
interface IChatRoomBackgroundStyle {
  backgroundColor: string                              // background-color
  backgroundImage: string                              // -ios-background-image
}

/* InputBarStyle-Chat */
interface IInputBarStyleChat {
  // 입력창 배경
  backgroundColor: string                              // background-color

  // 보내기 버튼
  sendNormalBackgroundColor: string                    // -ios-send-normal-background-color
  sendNormalForegroundColor: string                    // -ios-send-normal-foreground-color
  sendHighlightedBackgroundColor: string               // -ios-send-highlighted-background-color
  sendHighlightedForegroundColor: string               // -ios-send-highlighted-foreground-color

  // 인풋바 좌측 메뉴 아이콘
  buttonNormalForegroundColor: string                  // -ios-button-normal-foreground-color
  buttonHighlightedForegroundColor: string             // -ios-button-highlighted-foreground-color

  // CUX 관련 버튼
  buttonTextColor: string                              // -ios-button-text-color : 인풋바 텍스트 컬러
  buttonNormalBackgroundColor: string                  // -ios-button-normal-background-color : 메뉴버튼 배경 컬러
  buttonNormalBackgroundAlpha: number                  // -ios-button-normal-background-alpha
}

/* MessageCellStyle-Send */
interface IMessageCellStyleSend {
  backgroundImage: string                              // -ios-background-image (17px 17px)
  selectedBackgroundImage: string                      // -ios-selected-background-image
  groupBackgroundImage: string                         // -ios-group-background-image
  groupSelectedBackgroundImage: string                 // -ios-group-selected-background-image
  titleEdgeInsets: string                              // -ios-title-edgeinsets (top, left, bottom, right)
  groupTitleEdgeInsets: string                         // -ios-group-title-edgeinsets
  textColor: string                                    // -ios-text-color
  selectedTextColor: string                            // -ios-selected-text-color
  unreadTextColor: string                              // -ios-unread-text-color
}

/* MessageCellStyle-Receive */
interface IMessageCellStyleReceive {
  backgroundImage: string                              // -ios-background-image (22px 17px)
  selectedBackgroundImage: string                      // -ios-selected-background-image
  groupBackgroundImage: string                         // -ios-group-background-image
  groupSelectedBackgroundImage: string                 // -ios-group-selected-background-image
  titleEdgeInsets: string                              // -ios-title-edgeinsets (top, left, bottom, right)
  groupTitleEdgeInsets: string                         // -ios-group-title-edgeinsets
  textColor: string                                    // -ios-text-color
  selectedTextColor: string                            // -ios-selected-text-color
  unreadTextColor: string                              // -ios-unread-text-color
}

export interface ChatRoomStyleState {
  background: IChatRoomBackgroundStyle
  inputBar: IInputBarStyleChat
  messageSend: IMessageCellStyleSend
  messageReceive: IMessageCellStyleReceive

  setBackground: (style: Partial<IChatRoomBackgroundStyle>) => void
  setInputBar: (style: Partial<IInputBarStyleChat>) => void
  setMessageSend: (style: Partial<IMessageCellStyleSend>) => void
  setMessageReceive: (style: Partial<IMessageCellStyleReceive>) => void

  resetAll: () => void
  resetBackground: () => void
  resetInputBar: () => void
  resetMessageSend: () => void
  resetMessageReceive: () => void
}

const DEFAULT_CHATROOM_BACKGROUND: IChatRoomBackgroundStyle = {
  backgroundColor: '#FFDEDE',
  backgroundImage: chatroomBgImage,
}

const DEFAULT_INPUT_BAR: IInputBarStyleChat = {
  backgroundColor: '#FFFFFF',
  sendNormalBackgroundColor: '#FF7F7F',
  sendNormalForegroundColor: '#FFFFFF',
  sendHighlightedBackgroundColor: '#F27979',
  sendHighlightedForegroundColor: '#FFDEDE',
  buttonNormalForegroundColor: '#E86464',
  buttonHighlightedForegroundColor: '#CB6F6F',
  buttonTextColor: '#191919',
  buttonNormalBackgroundColor: '#000000',
  buttonNormalBackgroundAlpha: 0.04,
}

const DEFAULT_MESSAGE_SEND: IMessageCellStyleSend = {
  backgroundImage: `${chatroomBubbleSend01} 17px 17px`,
  selectedBackgroundImage: `${chatroomBubbleSend01Selected} 17px 17px`,
  groupBackgroundImage: `${chatroomBubbleSend02} 17px 17px`,
  groupSelectedBackgroundImage: `${chatroomBubbleSend02Selected} 17px 17px`,
  titleEdgeInsets: '10px 11px 7px 17px',
  groupTitleEdgeInsets: '10px 11px 7px 17px',
  textColor: '#FFFFFF',
  selectedTextColor: '#FFFFFF',
  unreadTextColor: '#FF7F7F',
}

const DEFAULT_MESSAGE_RECEIVE: IMessageCellStyleReceive = {
  backgroundImage: `${chatroomBubbleReceive01} 22px 17px`,
  selectedBackgroundImage: `${chatroomBubbleReceive01Selected} 22px 17px`,
  groupBackgroundImage: `${chatroomBubbleReceive02} 22px 17px`,
  groupSelectedBackgroundImage: `${chatroomBubbleReceive02Selected} 22px 17px`,
  titleEdgeInsets: '10px 17px 7px 11px',
  groupTitleEdgeInsets: '10px 17px 7px 11px',
  textColor: '#4D4D4D',
  selectedTextColor: '#4D4D4D',
  unreadTextColor: '#FF7F7F',
}

export const useChatRoomStyleStore = create<ChatRoomStyleState>()(
  persist(
    (set) => ({
      background: { ...DEFAULT_CHATROOM_BACKGROUND },
      inputBar: { ...DEFAULT_INPUT_BAR },
      messageSend: { ...DEFAULT_MESSAGE_SEND },
      messageReceive: { ...DEFAULT_MESSAGE_RECEIVE },

      setBackground: (style) =>
        set((state) => ({
          background: { ...state.background, ...style },
        })),

      setInputBar: (style) =>
        set((state) => ({
          inputBar: { ...state.inputBar, ...style },
        })),

      setMessageSend: (style) =>
        set((state) => ({
          messageSend: { ...state.messageSend, ...style },
        })),

      setMessageReceive: (style) =>
        set((state) => ({
          messageReceive: { ...state.messageReceive, ...style },
        })),

      resetAll: () =>
        set({
          background: { ...DEFAULT_CHATROOM_BACKGROUND },
          inputBar: { ...DEFAULT_INPUT_BAR },
          messageSend: { ...DEFAULT_MESSAGE_SEND },
          messageReceive: { ...DEFAULT_MESSAGE_RECEIVE },
        }),

      resetBackground: () => set({ background: { ...DEFAULT_CHATROOM_BACKGROUND } }),
      resetInputBar: () => set({ inputBar: { ...DEFAULT_INPUT_BAR } }),
      resetMessageSend: () => set({ messageSend: { ...DEFAULT_MESSAGE_SEND } }),
      resetMessageReceive: () => set({ messageReceive: { ...DEFAULT_MESSAGE_RECEIVE } }),
    }),
    {
      name: 'chatroom-style',
    }
  )
)