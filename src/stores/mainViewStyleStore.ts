import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IHeaderStyle {
  textColor: string              // -ios-text-color
  tabTextColor: string           // -ios-tab-text-color
  tabHighlightedTextColor: string // -ios-tab-highlighted-text-color
}

interface IMainViewStylePrimary {
  backgroundColor: string                        // background-color
  backgroundImage: string                        // -ios-background-image
  // 텍스트 스타일
  textColor: string                              // Title : 리스트 목록
  highlightedTextColor: string                   // Title Pressed
  descriptionTextColor: string                   // Description : 상태메세지
  descriptionHighlightedTextColor: string        // Description Pressed
  paragraphTextColor: string                     // Paragraph : 라스트메세지
  paragraphHighlightedTextColor: string          // Paragraph Pressed
  // 셀 스타일
  normalBackgroundColor: string                  // Cell Background
  normalBackgroundAlpha: number
  selectedBackgroundColor: string                // Cell Background Pressed
  selectedBackgroundAlpha: number
}

interface IMainViewStyleSecondary {
  backgroundColor: string
}

interface ISectionTitleStyle {
  borderColor: string
  borderAlpha: number
  textColor: string              // -ios-text-color
  textAlpha: number              // -ios-text-alpha
}

export interface MainViewStyleState {
  headerStyle: IHeaderStyle
  primary: IMainViewStylePrimary
  secondary: IMainViewStyleSecondary
  sectionTitleStyle: ISectionTitleStyle

  setHeaderStyle: (style: Partial<IHeaderStyle>) => void
  setPrimary: (style: Partial<IMainViewStylePrimary>) => void
  setSecondary: (style: Partial<IMainViewStyleSecondary>) => void
  setSectionTitleStyle: (style: Partial<ISectionTitleStyle>) => void

  resetAll: () => void
  resetIHeaderStyle: () => void
  resetPrimary: () => void
  resetSecondary: () => void
  resetSectionTitleStyle: () => void
}

const DEFAULT_HEADER_STYLE: IHeaderStyle = {
  textColor: '#664242',
  tabTextColor: '#B39898',
  tabHighlightedTextColor: '#664242',
}

const DEFAULT_PRIMARY: IMainViewStylePrimary = {
  backgroundColor: '#FFDEDE',
  backgroundImage: 'mainBgImage.png',
  textColor: '#664242',
  highlightedTextColor: '#946C6C',
  descriptionTextColor: '#805959',
  descriptionHighlightedTextColor: '#946C6C',
  paragraphTextColor: '#805959',
  paragraphHighlightedTextColor: '#946C6C',
  normalBackgroundColor: '#F66C6C',
  normalBackgroundAlpha: 0.0,
  selectedBackgroundColor: '#664242',
  selectedBackgroundAlpha: 0.05,
}

const DEFAULT_SECONDARY: IMainViewStyleSecondary = {
  backgroundColor: '#FFDEDE',
}

const DEFAULT_SECTION_TITLE_STYLE: ISectionTitleStyle = {
  borderColor: '#F66C6C',
  borderAlpha: 0.09,
  textColor: '#F66C6C',
  textAlpha: 1.0,
}

export const useMainViewStyleStore = create<MainViewStyleState>()(
  persist(
    (set) => ({
      headerStyle: { ...DEFAULT_HEADER_STYLE },
      primary: { ...DEFAULT_PRIMARY },
      secondary: { ...DEFAULT_SECONDARY },
      sectionTitleStyle: { ...DEFAULT_SECTION_TITLE_STYLE },

      setHeaderStyle: (style) =>
        set((state) => ({
          headerStyle: { ...state.headerStyle, ...style },
        })),

      setPrimary: (style) =>
        set((state) => ({
          primary: { ...state.primary, ...style },
        })),

      setSecondary: (style) =>
        set((state) => ({
          secondary: { ...state.secondary, ...style },
        })),

      setSectionTitleStyle: (style) =>
        set((state) => ({
          sectionTitleStyle: { ...state.sectionTitleStyle, ...style },
        })),

      resetAll: () =>
        set({
          headerStyle: { ...DEFAULT_HEADER_STYLE },
          primary: { ...DEFAULT_PRIMARY },
          secondary: { ...DEFAULT_SECONDARY },
          sectionTitleStyle: { ...DEFAULT_SECTION_TITLE_STYLE },
        }),

      resetIHeaderStyle: () => set({ headerStyle: { ...DEFAULT_HEADER_STYLE } }),
      resetPrimary: () => set({ primary: { ...DEFAULT_PRIMARY } }),
      resetSecondary: () => set({ secondary: { ...DEFAULT_SECONDARY } }),
      resetSectionTitleStyle: () =>
        set({ sectionTitleStyle: { ...DEFAULT_SECTION_TITLE_STYLE } }),
    }),
    {
      name: 'main-view-style', // localStorage key
    }
  )
)