/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "gradient-home": "0 20px 50px 10px ",
      },

      colors: {
        "primary-500": "#dd7116",
        "primary-300": "#f49d4e",
        "primary-800": "#ab3c0b",
        "secondary-500": "#101010",
        error: "#ff4e2b",
        warning: "#ffd230",
        success: "#4ae04c",
        info: "#EE7116",
        "text-primary": "#ffffffff",
        "text-secondary": "#656565",
        background: "#101010",
      },
    },
  },
  plugins: [],
};
