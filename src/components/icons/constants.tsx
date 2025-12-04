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
  WARNING: {
    fill: false,
    svgOptions: { viewBox: "0 0 123 96" },
    icon: (
      <>
        <ellipse
          cx="26.3716"
          cy="26.1516"
          rx="26.3716"
          ry="26.1516"
          transform="matrix(0.97824 -0.207474 0.20835 0.978054 25.9907 40.4445)"
          fill="url(#paint0_linear_255_144)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M105.262 46.2812C105.844 49.013 106.17 51.7413 106.256 54.4424L83.8064 59.2038C84.1551 56.4659 84.0568 53.6318 83.4515 50.7907C80.4803 36.843 66.4179 28.0079 52.0423 31.0568C37.6667 34.1057 28.4215 47.8841 31.3927 61.8318C31.998 64.6729 33.0634 67.3019 34.498 69.6616L12.2773 74.3744C11.2551 71.8717 10.441 69.2469 9.85905 66.5151C4.41405 40.9547 21.3567 15.7044 47.7014 10.1169C74.0462 4.52947 99.8169 20.7208 105.262 46.2812ZM34.498 69.6616L83.8064 59.2038C82.4433 69.9065 74.2492 79.1378 62.8019 81.5657C51.3546 83.9935 40.106 78.8858 34.498 69.6616Z"
          fill="url(#paint1_linear_255_144)"
        />
        <rect
          width="4.21983"
          height="8.44506"
          rx="2.10992"
          transform="matrix(0.97824 -0.207474 0.20835 0.978054 46.897 51.3521)"
          fill="url(#paint2_linear_255_144)"
        />
        <rect
          width="4.21983"
          height="8.44506"
          rx="2.10992"
          transform="matrix(0.97824 -0.207474 0.20835 0.978054 61.1157 48.3361)"
          fill="url(#paint3_linear_255_144)"
        />
        <rect
          width="5.97077"
          height="18.4629"
          transform="matrix(0.972631 -0.232355 0.233324 0.972399 110.473 20.255)"
          fill="#0352FF"
        />
        <ellipse
          cx="2.98539"
          cy="2.95407"
          rx="2.98539"
          ry="2.95407"
          transform="matrix(0.972631 -0.232355 0.233324 0.972399 115.814 42.5171)"
          fill="#0352FF"
        />
        <defs>
          <linearGradient
            id="paint0_linear_255_144"
            x1="26.3716"
            y1="14.4006"
            x2="26.3716"
            y2="37.9025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="#BFD9FF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_255_144"
            x1="47.7014"
            y1="10.1169"
            x2="62.8527"
            y2="81.5549"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#6F00FF" />
            <stop offset="0.64" stop-color="#0352FF" />
            <stop offset="1" stop-color="#BF00FF" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_255_144"
            x1="2.10992"
            y1="0"
            x2="2.10992"
            y2="8.44506"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#8A01FF" />
            <stop offset="1" stop-color="#3A3BFF" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_255_144"
            x1="2.10992"
            y1="0"
            x2="2.10992"
            y2="8.44506"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#8A01FF" />
            <stop offset="1" stop-color="#3A3BFF" />
          </linearGradient>
        </defs>
      </>
    ),
  },
  MAIN_ICON: {
    fill: false,
    svgOptions: {
      viewBox: "0 0 27 20",
    },
    icon: (
      <>
        <ellipse
          cx="13.4677"
          cy="12.8971"
          rx="7.36659"
          ry="7.07165"
          fill="url(#paint0_linear_249_233)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M27 12.9595C27 13.7245 26.931 14.4739 26.7985 15.2025H20.4449C20.6973 14.4888 20.8341 13.7239 20.8341 12.9283C20.8341 9.02278 17.536 5.8567 13.4675 5.8567C9.39909 5.8567 6.10096 9.02278 6.10096 12.9283C6.10096 13.7239 6.23781 14.4888 6.49016 15.2025H0.201465C0.0690401 14.4739 0 13.7245 0 12.9595C0 5.80217 6.04416 0 13.5 0C20.9558 0 27 5.80217 27 12.9595ZM6.49016 15.2025H20.4449C19.4585 17.9924 16.7073 20 13.4675 20C10.2278 20 7.47659 17.9924 6.49016 15.2025Z"
          fill="url(#paint1_linear_249_233)"
        />
        <rect
          x="10.9038"
          y="10.9658"
          width="1.16827"
          height="2.3053"
          rx="0.584135"
          fill="url(#paint2_linear_249_233)"
        />
        <rect
          x="14.9277"
          y="10.9658"
          width="1.16827"
          height="2.3053"
          rx="0.584135"
          fill="url(#paint3_linear_249_233)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_249_233"
            x1="13.4677"
            y1="9.71948"
            x2="13.4677"
            y2="16.0746"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="#BFD9FF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_249_233"
            x1="13.5"
            y1="0"
            x2="13.5"
            y2="20"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#6F00FF" />
            <stop offset="0.64" stop-color="#0352FF" />
            <stop offset="1" stop-color="#BF00FF" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_249_233"
            x1="11.4879"
            y1="10.9658"
            x2="11.4879"
            y2="13.271"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#8A01FF" />
            <stop offset="1" stop-color="#3A3BFF" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_249_233"
            x1="15.5119"
            y1="10.9658"
            x2="15.5119"
            y2="13.271"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#8A01FF" />
            <stop offset="1" stop-color="#3A3BFF" />
          </linearGradient>
        </defs>
      </>
    ),
  },
  SEARCH: {
    fill: false,
    svgOptions: {
      viewBox: "0 0 19 19",
    },
    icon: (
      <>
        <path
          d="M8.70833 15.0417C12.2061 15.0417 15.0417 12.2061 15.0417 8.70833C15.0417 5.21053 12.2061 2.375 8.70833 2.375C5.21053 2.375 2.375 5.21053 2.375 8.70833C2.375 12.2061 5.21053 15.0417 8.70833 15.0417Z"
          stroke="#8E8E8E"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.625 16.625L13.1813 13.1813"
          stroke="#8E8E8E"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
} as const;

export type IconList = keyof typeof ICONS;
export default ICONS;
