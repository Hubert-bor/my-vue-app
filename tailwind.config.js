/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  prefix: "tw-",
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,tsx,jsx}", // path to all template files
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--q-primary) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--q-secondary) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
