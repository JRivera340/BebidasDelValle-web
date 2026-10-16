import type { Config } from 'tailwindcss'

const canal = (nombre: string) => `rgb(var(--${nombre}) / <alpha-value>)`

const config = {
  darkMode: ['class'],
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        fondo: canal('fondo'),
        superficie: canal('superficie'),
        texto: canal('texto'),
        suave: canal('suave'),
        producto: {
          DEFAULT: canal('producto'),
          fondo: canal('producto-fondo'),
        },
        brand: {
          red: {
            DEFAULT: canal('rojo'),
            hover: canal('rojo-hover'),
          },
          gold: {
            DEFAULT: canal('oro'),
            hover: canal('oro-hover'),
          },
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      fontSize: {
        titular: ['clamp(2.25rem, 1.2rem + 3.6vw, 4.25rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        seccion: ['clamp(1.875rem, 1.3rem + 2.4vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        contenedor: '1200px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        revelar: {
          from: { transform: 'translateY(110%)' },
          to: { transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        revelar: 'revelar 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      boxShadow: {
        card: '0 8px 24px rgb(0 0 0 / 0.35)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
