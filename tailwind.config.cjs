/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "atm-gradient":
          "radial-gradient(circle at top, rgba(56,189,248,0.35), transparent 55%), radial-gradient(circle at bottom, rgba(129,140,248,0.35), transparent 55%)",
      },
    },
  },
  plugins: [],
};
