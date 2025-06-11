/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./main.tsx",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
			fontFamily: {
        'bebas': ['Bebas Neue', 'Arial Black', 'sans-serif'],
        'montserrat': ['Montserrat', 'system-ui', 'sans-serif'],
        'sans': ['Montserrat', 'system-ui', 'sans-serif'], // Default sans font
      },
      fontSize: {
        // Custom sizes for Bebas Neue (tends to need larger sizes)
        'bebas-sm': ['1.5rem', { lineHeight: '1.2', letterSpacing: '0.025em' }],
        'bebas-base': ['2rem', { lineHeight: '1.2', letterSpacing: '0.025em' }],
        'bebas-lg': ['2.5rem', { lineHeight: '1.1', letterSpacing: '0.025em' }],
        'bebas-xl': ['3rem', { lineHeight: '1.1', letterSpacing: '0.025em' }],
        'bebas-2xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '0.025em' }],
        'bebas-3xl': ['4rem', { lineHeight: '1.1', letterSpacing: '0.025em' }],
        'bebas-4xl': ['5rem', { lineHeight: '1', letterSpacing: '0.025em' }],
        'bebas-5xl': ['6rem', { lineHeight: '1', letterSpacing: '0.025em' }],
        'bebas-6xl': ['7rem', { lineHeight: '1', letterSpacing: '0.025em' }],
      },
      letterSpacing: {
        'bebas': '0.025em',
        'montserrat-tight': '-0.025em',
        'montserrat-normal': '0',
        'montserrat-wide': '0.025em',
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}