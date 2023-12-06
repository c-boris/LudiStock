// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#f9fafb",
        primary: "#111827",
        secondary: "#4b5563",
        dark: "#111827",
        dprimary: "#f9fafb",
        dsecondary: "#9ca3af",
        accent: "#6366f1",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
