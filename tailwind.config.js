/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#651F2B',
          light: '#8B3A47',
          dark: '#4A1520',
          50: '#F9E8EB',
        },
        ivory: {
          DEFAULT: '#F8F1E5',
          light: '#FFFDF8',
          dark: '#E8DFD0',
        },
        gold: {
          DEFAULT: '#B99A59',
          light: '#D4B876',
          dark: '#967A3F',
          50: '#F7F0E0',
        },
        forest: {
          DEFAULT: '#233D32',
          light: '#2F5443',
          dark: '#1A2D25',
        },
        dark: {
          DEFAULT: '#2C1810',
          light: '#4A3028',
        },
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(185, 154, 89, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(185, 154, 89, 0.6)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
};
