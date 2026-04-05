/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#131313",
          surface: "#2B2B2B",
          muted: "#86868B",
          blue: "#1561F0"
        }
      },
      boxShadow: {
        soft: "0 16px 40px rgba(19, 19, 19, 0.08)"
      }
    }
  },
  plugins: []
};
