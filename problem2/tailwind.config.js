/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ["Open Sans"],
      },
      boxShadow: {
        around: "0 0 12px 4px rgb(0 0 0 / 0.1)",
        "around-lg": "0 0 12px 4px",
        "around-max": "0 0 120px 0",
      },
      colors: {
        "accent-pink": "#FF008E",
        "accent-purple": "#6D53DC",
        "accent-blue": "#06ACFD",
        "accent-blue-low-opacity": "#06ACFDA9",
        "background-default": "#0E0E2A",
        success: "#04b34f",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
