/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0EA5E9',
        secondary: '#06B6D4',
        teal: {
          600: '#0f766e',
          300: '#99f6e4',
        }
      },
      animation: {
        'cloud-move': 'cloudMoveUp linear infinite',
        'fadeIn': 'fadeIn 0.3s ease',
        'slideDown': 'slideDown 0.3s ease',
        'fadeInUp': 'fadeInUp 1s ease forwards',
        'checkPulse': 'checkPulse 0.3s ease',
        'slideUp': 'slideUp 0.6s ease forwards',
        'pulse': 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        cloudMoveUp: {
          'from': { transform: 'translate(0, 0)' },
          'to': { transform: 'translate(140vw, -120px)' }
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        slideDown: {
          'from': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        checkPulse: {
          '0%': {
            transform: 'scale(0.5)'
          },
          '100%': {
            transform: 'scale(1)'
          }
        },
        slideUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        pulse: {
          '0%, 100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(1.05)'
          }
        }
      },
      backdropBlur: {
        '10': '10px',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

