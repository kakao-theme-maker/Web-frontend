import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
  backgroundColor: '#FFDEDE',
  backgroundImage: 'passcodeBgImage.png',
}

const DEFAULT_PASSCODE_TITLE_LABEL: IPasscodeTitleLabelStyle = {
  textColor: '#664242',
}

const DEFAULT_PASSCODE: IPasscodeStyle = {
  bulletFirstImage: 'passcodeImgCode01.png',
  bulletSecondImage: 'passcodeImgCode02.png',
  bulletThirdImage: 'passcodeImgCode03.png',
  bulletFourthImage: 'passcodeImgCode04.png',
  bulletSelectedFirstImage: 'passcodeImgCode01Selected.png',
  bulletSelectedSecondImage: 'passcodeImgCode02Selected.png',
  bulletSelectedThirdImage: 'passcodeImgCode03Selected.png',
  bulletSelectedFourthImage: 'passcodeImgCode04Selected.png',
  keypadBackgroundColor: '#FFF2F2',
  keypadTextNormalColor: '#664242',
  keypadNumberHighlightedImage: 'passcodeKeypadPressed.png',
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