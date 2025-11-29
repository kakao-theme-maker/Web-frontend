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
  HOME: {
    fill: false,
    svgOptions: {
      viewBox: "0 0 24 24",
    },
    icon: (
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    ),
  },
} as const;

export type IconList = keyof typeof ICONS;
export default ICONS;
