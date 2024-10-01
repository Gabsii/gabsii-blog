import type { Config } from 'tailwindcss'

export const white = '#fffbee'
export const black = '#242424'

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
  	extend: {
  		spacing: {
				ch: '1ch',
  			1200: '1200px',
  		},
  		fontFamily: {
  			piazzolla: 'var(--font-piazzolla)',
  			suisse: 'var(--font-suisse-intl)'
  		},
  		colors: {
  			primary: 'var(--color-primary)',
  			secondary: 'var(--color-secondary)',
  			grey: '#8C8C8C',
  			red: '#DA291C'
  		},
  		keyframes: {
  			rotate: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			},
  			growltr: {
  				from: {
  					width: '0'
  				},
  				to: {
  					width: '100%'
  				}
  			}
  		},
  		animation: {
  			growltr: 'growltr 300ms linear 1',
  			'rotate-slow': 'rotate 16s linear infinite',
  			'rotate-fast': 'rotate 8s linear infinite'
  		},
  		backgroundImage: {
  			checkmark: 'url(/checkmark.svg)',
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
