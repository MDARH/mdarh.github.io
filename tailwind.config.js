/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.vite.html', './index.html', './src/**/*.{js,vue}'],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  daisyui: {
    themes: ['night', 'forest', 'aqua']
  },
  plugins: [require('daisyui')]
}
