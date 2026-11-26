/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Paleta Oficial El Recreo Condominio:
           Golden Olive: #8D7946
           Warm Bronze:  #7B5832
           Light Beige:  #C6BD8F
           Pure White:   #FFFFFF */
        olive: {
          400: '#A38F5B',
          500: '#8D7946',
          600: '#746337',
        },
        beige: {
          100: '#F6F3EB',
          200: '#E8E2CE',
          300: '#C6BD8F',
          400: '#B0A574',
        },
        sand: {
          50: '#FFFFFF',
          100: '#F8F6F0',
          200: '#EAE5D6',
          300: '#C6BD8F',
        },
        bronze: {
          300: '#C6BD8F',
          400: '#8D7946',
          500: '#8D7946',
          600: '#7B5832',
          700: '#634525',
          800: '#49321A',
        },
        /* Warm architectural charcoal-bronze para alto contraste en fondos oscuros */
        palm: {
          700: '#4E4434',
          800: '#352D22',
          900: '#241E17',
          950: '#18140F',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 20px 50px rgba(24, 20, 15, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        luxury: '0 22px 54px -16px rgba(123, 88, 50, 0.14)',
        bronze: '0 14px 34px -8px rgba(123, 88, 50, 0.42)',
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
