/** @type {import('tailwindcss').Config} */
export default {
 darkMode: ["class"],
 content: [
  "./pages/**/*.{js,jsx}",
  "./components/**/*.{js,jsx}",
  "./app/**/*.{js,jsx}",
  "./src/**/*.{js,jsx}",
 ],
 prefix: "",
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
    "primary-l": "#F54547",
    "secondary-l": "#0884A2",
    "accent-l": {
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
    note: {
     100: "#09d8db",
     200: "#004fa8",
     300: "#db090c",
    },
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    primary: {
     DEFAULT: "hsl(var(--primary))",
     foreground: "hsl(var(--primary-foreground))",
    },
    secondary: {
     DEFAULT: "hsl(var(--secondary))",
     foreground: "hsl(var(--secondary-foreground))",
    },
    destructive: {
     DEFAULT: "hsl(var(--destructive))",
     foreground: "hsl(var(--destructive-foreground))",
    },
    muted: {
     DEFAULT: "hsl(var(--muted))",
     foreground: "hsl(var(--muted-foreground))",
    },
    accent: {
     DEFAULT: "hsl(var(--accent))",
     foreground: "hsl(var(--accent-foreground))",
    },
    popover: {
     DEFAULT: "hsl(var(--popover))",
     foreground: "hsl(var(--popover-foreground))",
    },
    card: {
     DEFAULT: "hsl(var(--card))",
     foreground: "hsl(var(--card-foreground))",
    },
   },
   borderRadius: {
    lg: "var(--radius)",
    md: "calc(var(--radius) - 2px)",
    sm: "calc(var(--radius) - 4px)",
   },
   keyframes: {
    "accordion-down": {
     from: { height: "0" },
     to: { height: "var(--radix-accordion-content-height)" },
    },
    "accordion-up": {
     from: { height: "var(--radix-accordion-content-height)" },
     to: { height: "0" },
    },
   },
   animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
   },
   backgroundImage: {
    "sign-up&login": "url('/Icons/Bg.svg')",
   },

  },
 },
 plugins: [require("tailwindcss-animate")],
};
