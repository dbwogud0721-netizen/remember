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
        charcoal: {
          50: '#F7F7F7',
          100: '#EFEFEF',
          200: '#DEDEDE',
          300: '#BBBBBB',
          400: '#888888',
          500: '#555555',
          600: '#333333',
          700: '#222222',
          800: '#111111',
          900: '#080808',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Nanum Myeongjo"', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 1px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 20px rgba(0,0,0,0.10)',
        nav: '0 -1px 12px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
