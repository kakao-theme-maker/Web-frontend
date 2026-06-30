import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import findBtnAddFriend from '@/assets/images/findBtnAddFriend.png'
import profileImg01 from '@/assets/images/profileImg01.png'

/* FeatureStyle-Primary : 버튼 텍스트 */
interface IFeatureStylePrimary {
  textColor: string                                // -ios-text-color
}

/* ButtonStyle-AddFriend */
interface IButtonStyleAddFriend {
  image: string                                    // -ios-image
}

/* DefaultProfileStyle */
interface IDefaultProfileStyle {
  profileImages: string                            // -ios-profile-images
}

export interface FeatureStyleState {
  featurePrimary: IFeatureStylePrimary
  buttonAddFriend: IButtonStyleAddFriend
  defaultProfile: IDefaultProfileStyle

  setFeaturePrimary: (style: Partial<IFeatureStylePrimary>) => void
  setButtonAddFriend: (style: Partial<IButtonStyleAddFriend>) => void
  setDefaultProfile: (style: Partial<IDefaultProfileStyle>) => void

  resetAll: () => void
  resetFeaturePrimary: () => void
  resetButtonAddFriend: () => void
  resetDefaultProfile: () => void
}

const DEFAULT_FEATURE_PRIMARY: IFeatureStylePrimary = {
  textColor: '#805959',
}

const DEFAULT_BUTTON_ADD_FRIEND: IButtonStyleAddFriend = {
  image: findBtnAddFriend,
}

const DEFAULT_DEFAULT_PROFILE: IDefaultProfileStyle = {
  profileImages: profileImg01,
}

export const useFeatureStyleStore = create<FeatureStyleState>()(
  persist(
    (set) => ({
      featurePrimary: { ...DEFAULT_FEATURE_PRIMARY },
      buttonAddFriend: { ...DEFAULT_BUTTON_ADD_FRIEND },
      defaultProfile: { ...DEFAULT_DEFAULT_PROFILE },

      setFeaturePrimary: (style) =>
        set((state) => ({
          featurePrimary: { ...state.featurePrimary, ...style },
        })),

      setButtonAddFriend: (style) =>
        set((state) => ({
          buttonAddFriend: { ...state.buttonAddFriend, ...style },
        })),

      setDefaultProfile: (style) =>
        set((state) => ({
          defaultProfile: { ...state.defaultProfile, ...style },
        })),

      resetAll: () =>
        set({
          featurePrimary: { ...DEFAULT_FEATURE_PRIMARY },
          buttonAddFriend: { ...DEFAULT_BUTTON_ADD_FRIEND },
          defaultProfile: { ...DEFAULT_DEFAULT_PROFILE },
        }),

      resetFeaturePrimary: () => set({ featurePrimary: { ...DEFAULT_FEATURE_PRIMARY } }),
      resetButtonAddFriend: () => set({ buttonAddFriend: { ...DEFAULT_BUTTON_ADD_FRIEND } }),
      resetDefaultProfile: () => set({ defaultProfile: { ...DEFAULT_DEFAULT_PROFILE } }),
    }),
    {
      name: 'feature-style',
    }
  )
)