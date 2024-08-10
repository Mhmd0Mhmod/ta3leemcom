/** @type {import('tailwindcss').Config} */
export default {
 content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
 theme: {
  container: {
   center: true,
   padding: "0",
   screens: {
    sm: "100%",
    md: "100%",
    lg: "100%",
    xl: "100%",
    "2xl": "1862px",
   },
  },
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
    secondary: "#0884A2",
    accent: {
     50: "#C2C2C2",
     100: "#607D8B",
     200: "#E8E8E8",
     300: "#F6F6F6",
     400: "#908C91",
     500: "#FAFBFC",
     600: "#ECECEC",
     700: "#525252",
    },
   },
   backgroundImage: {
    "sign-up&login": "url('/Icons/Bg.svg')",
   },
  },
 },
 plugins: [],
};
