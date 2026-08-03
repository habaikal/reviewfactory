import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-kr)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-kr)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        void: {
          950: '#040509',
          900: '#070912',
          850: '#0a0d1a',
          800: '#0d1120',
          700: '#12172a',
          600: '#1a2038',
          500: '#242c4a',
        },
        cyan: {
          50: '#ecfffe',
          400: '#3ee8f5',
          500: '#12d6e8',
          600: '#0bb8cc',
        },
        violet: {
          400: '#a276ff',
          500: '#8b4fff',
          600: '#7229f0',
        },
        magenta: {
          400: '#ff5fd1',
          500: '#f430c0',
          600: '#d31aa3',
        },
        amber: {
          400: '#ffc656',
          500: '#ffab1f',
        },
      },
      backgroundImage: {
        'grid-lines':
          'linear-gradient(to right, rgba(148,163,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,255,0.06) 1px, transparent 1px)',
        'nebula-1':
          'radial-gradient(circle at 20% 20%, rgba(139,79,255,0.35), transparent 45%), radial-gradient(circle at 80% 30%, rgba(18,214,232,0.28), transparent 45%), radial-gradient(circle at 50% 85%, rgba(244,48,192,0.22), transparent 50%)',
        'aurora-text':
          'linear-gradient(90deg, #3ee8f5 0%, #a276ff 45%, #ff5fd1 100%)',
        'panel-sheen':
          'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0) 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(18,214,232,0.35), 0 0 60px rgba(18,214,232,0.12)',
        'glow-violet': '0 0 20px rgba(139,79,255,0.35), 0 0 60px rgba(139,79,255,0.12)',
        'glow-magenta': '0 0 20px rgba(244,48,192,0.35), 0 0 60px rgba(244,48,192,0.12)',
        glass: '0 8px 32px rgba(2,4,15,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        scan: 'scan 3s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};

export default config;
