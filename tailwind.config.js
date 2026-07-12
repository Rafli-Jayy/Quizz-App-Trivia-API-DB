// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'custom': '966px', // breakpoint custom
      },
    },
  },
  plugins: [],
}
