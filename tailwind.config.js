/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkGrey: "#2B2C37",
        veryDarkGrey: "#20212C",
        lightGrey: "#F4F7FD",
        darkLine: "#3E3F4E",
        lightLine: "#E4EBFA",
        test: "white !important",
      },
      gridTemplateColumns: {
        "20%": "20% auto",
        "0%": "0% auto",
      },
      transitionProperty: {
        grid: "grid-template-columns,grid-column-start,grid-column-end, grid-template-rows, grid-column, grid-row, grid-area",
      },
    },
  },
  plugins: [],
};
