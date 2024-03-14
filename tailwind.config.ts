import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "128": "32rem",
        "136": "36rem",
        "256": "64rem",
        "512": "128rem",
      },
      fontFamily: {
        inter: ["var(--font-inter"],
        montserrat: ["var(--font-montserrat"],
        sansitaSwashed: ["var(--font-sansita-swashed)"],
      },
      colors: {
        primary: '#5770FD',
        'primary-light': '#F3F7FF',
        secondary: '#FFD200',
        success: '#06D6A0',
        error: '#FC4855',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
