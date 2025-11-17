const ICONS = {
  // 예시
  CLOSE_X: {
    fill: false,
    svgOptions: {
      viewBox: "0 0 24 24",
    },
    icon: (
      <path
        d="M5 5C10.4673 10.4673 13.5327 13.5327 19 19M19 5L5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
} as const;

export type IconList = keyof typeof ICONS;
export default ICONS;
