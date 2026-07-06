import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import passcodeBgImage from '@/assets/images/passcodeBgImage.png';
import passcodeImgCode01 from '@/assets/images/passcodeImgCode01.png'
import passcodeImgCode02 from '@/assets/images/passcodeImgCode02.png'
import passcodeImgCode03 from '@/assets/images/passcodeImgCode03.png'
import passcodeImgCode04 from '@/assets/images/passcodeImgCode04.png'
import passcodeImgCode01Selected from '@/assets/images/passcodeImgCode01Selected.png'
import passcodeImgCode02Selected from '@/assets/images/passcodeImgCode02Selected.png'
import passcodeImgCode03Selected from '@/assets/images/passcodeImgCode03Selected.png'
import passcodeImgCode04Selected from '@/assets/images/passcodeImgCode04Selected.png'
import passcodeKeypadPressed from '@/assets/images/passcodeKeypadPressed.png'
/* BackgroundStyle-Passcode */
interface IPasscodeBackgroundStyle {
  backgroundColor: string                          // background-color
  backgroundImage: string                          // -ios-background-image
}

/* LabelStyle-PasscodeTitle */
interface IPasscodeTitleLabelStyle {
  textColor: string                                // -ios-text-color
}

/* PasscodeStyle */
interface IPasscodeStyle {
  // 비활성 bullet 이미지
  bulletFirstImage: string                         // -ios-bullet-first-image
  bulletSecondImage: string                        // -ios-bullet-second-image
  bulletThirdImage: string                         // -ios-bullet-third-image
  bulletFourthImage: string                        // -ios-bullet-fourth-image
  // 활성 bullet 이미지
  bulletSelectedFirstImage: string                 // -ios-bullet-selected-first-image
  bulletSelectedSecondImage: string                // -ios-bullet-selected-second-image
  bulletSelectedThirdImage: string                 // -ios-bullet-selected-third-image
  bulletSelectedFourthImage: string                // -ios-bullet-selected-fourth-image
  // 키패드
  keypadBackgroundColor: string                    // -ios-keypad-background-color
  keypadTextNormalColor: string                    // -ios-keypad-text-normal-color
  keypadNumberHighlightedImage: string             // -ios-keypad-number-highlighted-image
}

export interface PasscodeStyleState {
  background: IPasscodeBackgroundStyle
  titleLabel: IPasscodeTitleLabelStyle
  passcode: IPasscodeStyle

  setBackground: (style: Partial<IPasscodeBackgroundStyle>) => void
  setTitleLabel: (style: Partial<IPasscodeTitleLabelStyle>) => void
  setPasscode: (style: Partial<IPasscodeStyle>) => void

  resetAll: () => void
  resetBackground: () => void
  resetTitleLabel: () => void
  resetPasscode: () => void
}

const DEFAULT_PASSCODE_BACKGROUND: IPasscodeBackgroundStyle = {
  backgroundColor: '#FCC5C5',
  backgroundImage: passcodeBgImage,
}

const DEFAULT_PASSCODE_TITLE_LABEL: IPasscodeTitleLabelStyle = {
  textColor: '#664242',
}

const DEFAULT_PASSCODE: IPasscodeStyle = {
  bulletFirstImage: passcodeImgCode01,
  bulletSecondImage: passcodeImgCode02,
  bulletThirdImage: passcodeImgCode03,
  bulletFourthImage: passcodeImgCode04,

  bulletSelectedFirstImage: passcodeImgCode01Selected,
  bulletSelectedSecondImage: passcodeImgCode02Selected,
  bulletSelectedThirdImage: passcodeImgCode03Selected,
  bulletSelectedFourthImage: passcodeImgCode04Selected,

  keypadBackgroundColor: '#FFF2F2',
  keypadTextNormalColor: '#664242',
  keypadNumberHighlightedImage: passcodeKeypadPressed,
}

export const usePasscodeStyleStore = create<PasscodeStyleState>()(
  persist(
    (set) => ({
      background: { ...DEFAULT_PASSCODE_BACKGROUND },
      titleLabel: { ...DEFAULT_PASSCODE_TITLE_LABEL },
      passcode: { ...DEFAULT_PASSCODE },

      setBackground: (style) =>
        set((state) => ({
          background: { ...state.background, ...style },
        })),

      setTitleLabel: (style) =>
        set((state) => ({
          titleLabel: { ...state.titleLabel, ...style },
        })),

      setPasscode: (style) =>
        set((state) => ({
          passcode: { ...state.passcode, ...style },
        })),

      resetAll: () =>
        set({
          background: { ...DEFAULT_PASSCODE_BACKGROUND },
          titleLabel: { ...DEFAULT_PASSCODE_TITLE_LABEL },
          passcode: { ...DEFAULT_PASSCODE },
        }),

      resetBackground: () => set({ background: { ...DEFAULT_PASSCODE_BACKGROUND } }),
      resetTitleLabel: () => set({ titleLabel: { ...DEFAULT_PASSCODE_TITLE_LABEL } }),
      resetPasscode: () => set({ passcode: { ...DEFAULT_PASSCODE } }),
    }),
    {
      name: 'passcode-style',
    }
  )
)