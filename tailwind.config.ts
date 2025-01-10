import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-dark": "#0d0d0d",
        "black-light": "#1a1a1a",
        "white-ivory": "#fdf6e3",
        "white-basic": "#f8f8f8",
        "gray-ash": "#b0b0b0",
        "gold-soft": "#d4af37",
        "gold-dark": "#92781f",
        "green-olive": "#9cb380",
        "green-dark": "#7c985a",
      },
      fontFamily: {
        primary: ["var(--primary-font)", "serif"],
        secondary: ["var(--secondary-font)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
