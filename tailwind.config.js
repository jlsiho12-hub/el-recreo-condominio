/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FAF7F2',
          100: '#F2ECE1',
          200: '#E5DAC7',
          300: '#D4C2A5',
        },
        bronze: {
          300: '#D6B07A',
          400: '#BA8B4A',
          500: '#9B6B2F',
          600: '#7A541C',
          700: '#5E3F13',
          800: '#422C0D',
        },
        palm: {
          700: '#254434',
          800: '#183024',
          900: '#0F2018',
          950: '#08130E',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 20px 50px rgba(8, 19, 14, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        luxury: '0 25px 60px -15px rgba(15, 32, 24, 0.16)',
        bronze: '0 14px 36px -8px rgba(122, 84, 28, 0.4)',
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
