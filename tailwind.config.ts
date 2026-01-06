import type { Config } from 'tailwindcss'

export const white = '#fffbee'
export const black = '#242424'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [require('tailwindcss-animate')],
}

export default config
