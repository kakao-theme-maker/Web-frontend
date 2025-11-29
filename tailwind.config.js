/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "phone-primary": "var(--width)",
      },
      height: {
        "phone-primary": "var(--height)",
      },
    },
  },
  plugins: [],
};
