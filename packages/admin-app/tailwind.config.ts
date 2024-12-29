import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import { UI } from "~/types";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: "rgb(75 85 99)",
        "neutral-faded": "rgb(107 114 128 / 0.8)",
        "neutral-very-faded": "rgb(209 213 219 / 0.8)",
        "neutral-secondary": colors.white,
        brand: colors.cyan[700],
        success: colors.green[500],
        warning: colors.orange[500],
        error: colors.red[500],
      } satisfies Record<UI.Color, string>,
    },
  },
  plugins: [],
} satisfies Config;
