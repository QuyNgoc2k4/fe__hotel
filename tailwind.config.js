/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}', // If you have a components folder
    './pages/**/*.{js,jsx,ts,tsx}',      // If you have a pages folder
  ],
  
  theme: {
    extend: {
      colors: {
        input: "hsl(var(--input))",
        primary: "hsl(var(--primary))",
        // Add other custom colors if needed
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
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-to-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "fade-in-0": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out-0": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.4s ease-out",
        "slide-out-to-right": "slide-out-to-right 0.4s ease-in",
        "fade-in-0": "fade-in-0 0.1s ease-out",
        "fade-out-0": "fade-out-0 0.1s ease-in",
      },
    },
  },
  plugins: [],
};
