import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        mid: '#bd8e00',
        mil: '#2d7e23',
        kremlin: '#b51d00',
        svoddBlack: {
          100: '#212529',
          200: '#1c1c1e',
          400: '#19181c',
        },
        svoddWhite: {
          100: '#e1e0e0',
          200: '#bfc3c3',
          300: '#E0D9D9',
          400: '#f9f8f6',
          600: '#f3f1ed',
        },
        pageLight: {
          bg: '#e9ecef',
          border: '#dee2e6',
        },
        svoddGray: {
          300: '#495057',
          400:'#504f4f',
        },
        svoddRed: {
          100: '#ad3434',
          300: '#af1c1c',
          400: '#a30000',
          500: '#720a0a',
          700: '#560000',
          800: '#a10000', //--bs-pagination-active-bg
          900: '#9d0000', //--bs-pagination-active-border-color
        },
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;