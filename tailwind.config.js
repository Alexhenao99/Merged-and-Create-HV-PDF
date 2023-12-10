/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      white: '#ffffff',
      dark: '#000000',
      gray: '#AAAAAA',
      light_blue: '#ebf7ff',
      dark_blue: '#0054ff',
      green: '#caff00',
      yellow: '#caff00'
    }
  },
  plugins: [],
}
