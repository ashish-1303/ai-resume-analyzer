/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#172026",
        mint: "#2FBF9B",
        coral: "#F26D5B",
        amber: "#F5B84B"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(23, 32, 38, 0.12)"
      }
    }
  },
  plugins: []
};
