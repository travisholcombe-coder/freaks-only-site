/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0d0d0d",
        foreground: "#ffffff",
        accent: "#D40000",
        secondary: "#FF4500",
      },
    },
  },
  plugins: [],
}
