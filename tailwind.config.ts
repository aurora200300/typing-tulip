import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: { extend: {
    fontFamily: { sans: ["Inter","ui-sans-serif","system-ui","Noto Sans Devanagari"], devanagari: ["Noto Sans Devanagari","Inter","sans-serif"] },
    boxShadow: { glow: "0 18px 44px rgba(99,69,236,.24)", soft: "0 18px 48px rgba(52,44,132,.13)" }
  }},
  plugins: []
};
export default config;
