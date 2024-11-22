/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "header-pattern": "url('/pics/main-pattern.png')",
        "category-pattern": "url('/pics/main-pattern.png')",
      },
      colors: {
        "my-acct": "#f97316",
        "my-prim": "#1e293b",
        "my-text": "#ffffff",
        "my-bg": "#f1f5f9",
        "my-bg-main": "#ffffff",
        "my-bg-card": "#ffffff",
        "my-hover": "#f1f5f9",
        "my-btn-hover": "#fa9247",
        "my-prim-hover": "#2e405c",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
