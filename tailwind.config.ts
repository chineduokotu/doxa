import type { Config } from "tailwindcss";

// Tailwind v4: Most configuration is done via @theme in globals.css
// This file is kept for any v4-compatible plugin configuration
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
