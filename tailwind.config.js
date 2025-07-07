/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'predatory-red': '#dc2626',
        'ethical-green': '#16a34a',
        'ghost-yellow': '#fbbf24',
        'warning-orange': '#ea580c',
      },
      animation: {
        'urgency-pulse': 'urgency-pulse 2s ease-in-out infinite',
        'blink': 'blink 1s linear infinite',
      },
      keyframes: {
        'urgency-pulse': {
          '0%, 100%': { 
            transform: 'scale(1)',
            backgroundColor: 'rgb(239 68 68)',
          },
          '50%': { 
            transform: 'scale(1.05)',
            backgroundColor: 'rgb(220 38 38)',
          },
        },
        'blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}
