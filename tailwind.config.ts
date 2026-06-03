import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F3',
        warm: {
          50: '#FDF8F4',
          100: '#F5EDE8',
          200: '#E8C9BC',
          300: '#D9A898',
          400: '#C4856A',
          500: '#B07B5B',
          600: '#9A6A4A',
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans KR"',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 2px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 24px rgba(0,0,0,0.10)',
        nav: '0 -2px 20px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
