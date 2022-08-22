module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0F172A',
      },
      animation: {
        'spin-1.5s': 'spin 1.5s linear infinite',
        'spin-2s': 'spin 2s linear infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@vueform/slider/tailwind'),
  ],
}
