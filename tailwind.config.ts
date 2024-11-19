import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customBlack: "#111111",
      },
      fontFamily: {
        sans: ['Geist', 'sans-serif'], // Set Geist as the default sans font
      },
    },
  },
  plugins: [],
} satisfies Config;
