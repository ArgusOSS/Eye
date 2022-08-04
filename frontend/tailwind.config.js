/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors') // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}