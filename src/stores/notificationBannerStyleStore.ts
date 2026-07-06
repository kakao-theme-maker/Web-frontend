import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/*
 Message Notification Bar Style
 */
interface IMessageNotificationBarStyle {
  backgroundColor: string                          // BackgroundStyle-MessageNotificationBar : background-color
  nameTextColor: string                            // LabelStyle-MessageNotificationBarName : -ios-text-color
  messageTextColor: string                         // LabelStyle-MessageNotificationBarMessage : -ios-text-color
}

/*
 BottomBanner Style
 */
interface IBottomBannerStyle {
  backgroundColor: string                          // BottomBannerStyle : background-color
  lightBackgroundColor: string                     // BottomBannerStyle-Light : background-color
}

export interface NotificationBannerStyleState {
  messageNotificationBar: IMessageNotificationBarStyle
  bottomBanner: IBottomBannerStyle

  setMessageNotificationBar: (style: Partial<IMessageNotificationBarStyle>) => void
  setBottomBanner: (style: Partial<IBottomBannerStyle>) => void

  resetAll: () => void
  resetMessageNotificationBar: () => void
  resetBottomBanner: () => void
}

const DEFAULT_MESSAGE_NOTIFICATION_BAR: IMessageNotificationBarStyle = {
  backgroundColor: '#FCC5C5',
  nameTextColor: '#604242',
  messageTextColor: '#805959',
}

const DEFAULT_BOTTOM_BANNER: IBottomBannerStyle = {
  backgroundColor: '#664142',
  lightBackgroundColor: '#664242',
}

export const useNotificationBannerStyleStore = create<NotificationBannerStyleState>()(
  persist(
    (set) => ({
      messageNotificationBar: { ...DEFAULT_MESSAGE_NOTIFICATION_BAR },
      bottomBanner: { ...DEFAULT_BOTTOM_BANNER },

      setMessageNotificationBar: (style) =>
        set((state) => ({
          messageNotificationBar: { ...state.messageNotificationBar, ...style },
        })),
      setBottomBanner: (style) =>
        set((state) => ({
          bottomBanner: { ...state.bottomBanner, ...style },
        })),

      resetAll: () =>
        set({
          messageNotificationBar: { ...DEFAULT_MESSAGE_NOTIFICATION_BAR },
          bottomBanner: { ...DEFAULT_BOTTOM_BANNER },
        }),
      resetMessageNotificationBar: () =>
        set({ messageNotificationBar: { ...DEFAULT_MESSAGE_NOTIFICATION_BAR } }),
      resetBottomBanner: () => set({ bottomBanner: { ...DEFAULT_BOTTOM_BANNER } }),
    }),
    {
      name: 'notification-banner-style',
    }
  )
)