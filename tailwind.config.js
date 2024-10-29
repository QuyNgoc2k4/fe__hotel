/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}', // Nếu bạn có thư mục components
    './pages/**/*.{js,jsx,ts,tsx}',      // Nếu bạn có thư mục pages
  ],
  
  theme: {
    extend: {
      colors: {
        input: "hsl(var(--input))",
        primary: "hsl(var(--primary))",
        // Thêm các màu tuỳ chỉnh khác nếu cần
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
    },
  },
  plugins: [],
};
