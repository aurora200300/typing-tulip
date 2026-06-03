import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui"],
        devanagari: ["Noto Sans Devanagari", "var(--font-sans)", "sans-serif"]
      },
      colors: {
        ink: "#151B45",
        brand: {
          50: "#F4F0FF",
          100: "#E9DFFF",
          500: "#6D3DEB",
          600: "#5727DA",
          700: "#3B16AA"
        }
      },
      boxShadow: {
        glow: "0 20px 60px rgba(93, 64, 214, 0.22)",
        soft: "0 18px 45px rgba(38, 30, 96, 0.12)"
      }
    }
  },
  plugins: []
};
export default config;
