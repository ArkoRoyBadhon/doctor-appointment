import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "rgb(229, 231, 235)",
        primaryTxt: "#00053b",
        secondaryTxt: "#9b9db5",
        danger: "#da2346",
        borderColor: "#e4e4ec",
        borderDark: "#9c9cad",
        hoverPrimary: "#f7f7f7",
        green400: "#34D399",
        red500: "#EF4444",
        slate600: "#475569",
        primaryBg: "#00acb1",
        primaryBgHover: "#009198"
      },
    },
  },
  plugins: [],
};
export default config;
