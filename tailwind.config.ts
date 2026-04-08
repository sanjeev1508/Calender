import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        calendar: '0 24px 80px rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        'paper-texture': 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      keyframes: {
        'ken-burns': {
          '0%, 100%': { transform: 'scale(1.02) translateY(0px)' },
          '50%': { transform: 'scale(1.06) translateY(-10px)' },
        },
      },
      animation: {
        'ken-burns': 'ken-burns 24s ease-in-out infinite alternate both',
      },
    },
  },
  plugins: [],
}

export default config
