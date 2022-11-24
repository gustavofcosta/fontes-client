/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Colors Default
        black: "#222",
        white: "#FFFF",
        bgGray: "#f3f3f3",
        backGroundColor: "#F1F1F2",
        textColor: "#1e293b",

        // Primary colors
        primary_200: "#ccd2df",
        primary_300: "#99a5bf",
        primary_400: "#6679a0",
        primary_100: "#334c80",
        primary_500: "#001f60",
        primary_600: "#00194d",
        primary_700: "#00133a",
        primary_800: "#000c26",
        primary_900: "#000613",

        // Secondary colors
        secondary_100: "#fdd6d9",
        secondary_200: "#fbadb2",
        secondary_300: "#f9858c",
        secondary_400: "#f75c65",
        secondary_500: "#f5333f",
        secondary_600: "#c42932",
        secondary_700: "#931f26",
        secondary_800: "#621419",
        secondary_900: "#310a0d",

        // Alert colors
        colorRedLight: "#f8d7da",
        colorRedDark: "#842029",
        colorGreenLight: "#d1e7dd",
        colorGreenDark: "#0f5132",
      },
    },
  },
  plugins: [],
};
