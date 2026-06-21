import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "warm-glow": "0 0 80px rgba(255, 181, 73, 0.28)",
      },
    },
  },
  plugins: [],
} satisfies Config;
