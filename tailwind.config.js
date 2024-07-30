/** @type {import('tailwindcss').Config} */
export default {
 content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
 theme: {
  extend: {
   fontFamily: {
    almaria: ["Almarai-Regular", "sans-serif"], // Add your custom font here
    "almaria-bold": ["Almarai-Bold", "sans-serif"], // Add your custom font here
    "almaria-extrabold": ["Almarai-ExtraBold", "sans-serif"], // Add your custom font here
    "almaria-light": ["Almarai-Light", "sans-serif"], // Add your custom font here
    cairo: ["Cairo-Regular", "sans-serif"], // Add your custom font here
    "cairo-bold": ["Cairo-Bold", "sans-serif"], // Add your custom font here
    "cairo-extrabold": ["Cairo-ExtraBold", "sans-serif"], // Add your custom font here
    "cairo-light": ["Cairo-Light", "sans-serif"], // Add your custom font here
   },
   colors: {
    primary: "#F54547",
   },
  },
 },
 plugins: [],
};
