/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "0",
      margin: "0",
      overflow: "hidden",
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "100%",
        "2xl": "100%",
      },
    },
    fontFamily: {
      Almarai: ["Almarai-Regular", "sans-serif"],
      "Almarai-bold": ["Almarai-Bold", "sans-serif"],
      "Almarai-extraBold": ["Almarai-ExtraBold", "sans-serif"],
      "Almarai-light": ["Almarai-Light", "sans-serif"],
      cairo: ["Cairo-Regular", "sans-serif"],
      "cairo-bold": ["Cairo-Bold", "sans-serif"],
      "cairo-extraBold": ["Cairo-ExtraBold", "sans-serif"],
      "cairo-light": ["Cairo-Light", "sans-serif"],
      "jost-hairline": ["Jost-100-Hairline", "sans-serif"],
      "jost-hairline-italic": ["Jost-100-HairlineItalic", "sans-serif"],
      "jost-thin": ["Jost-200-Thin", "sans-serif"],
      "jost-thin-italic": ["Jost-200-ThinItalic", "sans-serif"],
      "jost-light": ["Jost-300-Light", "sans-serif"],
      "jost-light-italic": ["Jost-300-LightItalic", "sans-serif"],
      "jost-book": ["Jost-400-Book", "sans-serif"],
      "jost-book-italic": ["Jost-400-BookItalic", "sans-serif"],
      "jost-medium": ["Jost-500-Medium", "sans-serif"],
      "jost-medium-italic": ["Jost-500-MediumItalic", "sans-serif"],
      "jost-semi": ["Jost-600-Semi", "sans-serif"],
      "jost-semi-italic": ["Jost-600-SemiItalic", "sans-serif"],
      "jost-bold": ["Jost-700-Bold", "sans-serif"],
      "jost-bold-italic": ["Jost-700-BoldItalic", "sans-serif"],
      "jost-heavy": ["Jost-800-Heavy", "sans-serif"],
      "jost-heavy-italic": ["Jost-800-HeavyItalic", "sans-serif"],
      "jost-black": ["Jost-900-Black", "sans-serif"],
      "jost-black-italic": ["Jost-900-BlackItalic", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#F54547",
        secondary: "#0884A2",
        danger: "#F54547",
        success: "#4CAF50",
        warning: "#FFC107",
        info: "#00BCD4",
        light: "#F5F5F5",
        dark: "#263238",
        normal: "#F5F5F5",
        transparent: "transparent",
        current: "currentColor",
        black: "#000",
        white: "#fff",
        gray: {
          25: "#FAFBFC",
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#9E9E9E",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
        accent: {
          50: "#C2C2C2",
          100: "#607D8B",
          200: "#E8E8E8",
          300: "#F6F6F6",
          400: "#908C91",
          500: "#FAFBFC",
          600: "#ECECEC",
          700: "#525252",
          800: "#F5F7F9",
          900: "#B4D3E0",
          1000: "#E6E8E9",
          1100: "#F7F7F7",
          1200: "#D9D9D9",
        },
      },
    },
  },
  plugins: [],
};
