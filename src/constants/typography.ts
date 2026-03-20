export const TYPOGRAPHY = {
  EXTRA_BOLD_17: 'text-[17px] font-extrabold',

  BOLD_24: 'text-[24px] font-bold',
  BOLD_20: 'text-[20px] font-bold',
  BOLD_18: 'text-[18px] font-bold',
  BOLD_16: 'text-[16px] font-bold',
  BOLD_15: 'text-[15px] font-bold',
  BOLD_12: 'text-[12px] font-bold',

  SEMIBOLD_20: 'text-[20px] font-semibold',
  SEMIBOLD_16: 'text-[16px] font-semibold',
  SEMIBOLD_15: 'text-[15px] font-semibold',
  SEMIBOLD_14: 'text-[14px] font-semibold',

  MEDIUM_16: 'text-[16px] font-medium',
  MEDIUM_15: 'text-[15px] font-medium',
  MEDIUM_14: 'text-[14px] font-medium',
  MEDIUM_12: 'text-[12px] font-medium',

  REGULAR_16: 'text-[16px] font-normal',
  REGULAR_15: 'text-[15px] font-normal',
  REGULAR_14: 'text-[14px] font-normal',
  REGULAR_12: 'text-[12px] font-normal',
  REGULAR_10: 'text-[10px] font-normal',

  LIGHT_17: 'text-[17px] font-light',
  LIGHT_15: 'text-[15px] font-light',
  LIGHT_14: 'text-[14px] font-light',
  LIGHT_12: 'text-[12px] font-light',
} as const

export type TypographyVariant = keyof typeof TYPOGRAPHY
