/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class", // use class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: "#030014",
        secondary: "#151312",
        accent: "#AB8BFF",
        light: {
          100: "#D6C6FF",
          200: "#A8B5DB",
          300: "#9CA4AB",
        },
        dark: {
          100: "#221f3d",
          200: "#0f0231",
        },
        // Optional: add semantic colors to help usage
        background: {
          light: "#F9FAFB", // light mode background (like gray-50)
          dark: "#111827",  // dark mode background (like neutral-900)
        },
        text: {
          primary: "#374151",  // light mode text (gray-700)
          secondary: "#6B7280", // light mode secondary text (gray-500/600)
          darkPrimary: "#D1D5DB", // dark mode primary text (gray-300)
          darkSecondary: "#9CA3AF", // dark mode secondary text (gray-400)
        },
        card: {
          light: "#E5E7EB", // light mode card bg (gray-200)
          dark: "#374151",   // dark mode card bg (gray-700)
        },
      },
    },
  },
  plugins: [],
};
