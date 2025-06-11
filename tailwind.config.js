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
      // Urban Studios Custom Color Palette
      colors: {
        // Primary Brand Colors
        'studio': {
          blue: {
            50: '#E6F2FF',
            100: '#CCE5FF',
            200: '#99CCFF',
            300: '#66B2FF',
            400: '#3399FF',
            500: '#0066CC', // Primary blue
            600: '#0052A3',
            700: '#003D7A',
            800: '#002952',
            900: '#001429',
          },
          pink: {
            50: '#FFE6F0',
            100: '#FFCCE0',
            200: '#FF99C2',
            300: '#FF66A3',
            400: '#FF3385',
            500: '#FF1766', // Primary pink
            600: '#CC1252',
            700: '#990E3D',
            800: '#660929',
            900: '#330514',
          },
          indigo: {
            50: '#EEF2FF',
            100: '#E0E7FF',
            200: '#C7D2FE',
            300: '#A5B4FC',
            400: '#818CF8',
            500: '#4F46E5', // Accent indigo
            600: '#4338CA',
            700: '#3730A3',
            800: '#312E81',
            900: '#1E1B4B',
          },
          purple: {
            50: '#F3E8FF',
            100: '#E9D5FF',
            200: '#D8B4FE',
            300: '#C084FC',
            400: '#A855F7',
            500: '#8B5CF6', // Accent purple
            600: '#7C3AED',
            700: '#6D28D9',
            800: '#5B21B6',
            900: '#4C1D95',
          }
        },
        
        // Semantic colors for different sections
        'surface': {
          light: '#FFFFFF',
          muted: '#F8FAFC',
          dark: '#0F172A',
          'dark-muted': '#1E293B',
        },
        
        // Gradient stops
        'gradient': {
          'blue-start': '#0066CC',
          'blue-end': '#4F46E5',
          'pink-start': '#FF1766',
          'pink-end': '#8B5CF6',
        },
        
        // Keep existing shadcn colors but integrate with our palette
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
  	},
      
      // Custom gradients
      backgroundImage: {
        'studio-gradient': 'linear-gradient(135deg, #0066CC 0%, #4F46E5 50%, #FF1766 100%)',
        'studio-gradient-reverse': 'linear-gradient(135deg, #FF1766 0%, #8B5CF6 50%, #0066CC 100%)',
        'hero-gradient': 'linear-gradient(135deg, #0066CC 0%, #4F46E5 30%, #8B5CF6 70%, #FF1766 100%)',
        'section-gradient-light': 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
        'section-gradient-dark': 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
      },
      
      // Custom shadows with brand colors
      boxShadow: {
        'studio-sm': '0 1px 2px 0 rgba(0, 102, 204, 0.05)',
        'studio': '0 4px 6px -1px rgba(0, 102, 204, 0.1), 0 2px 4px -1px rgba(255, 23, 102, 0.06)',
        'studio-lg': '0 10px 15px -3px rgba(0, 102, 204, 0.1), 0 4px 6px -2px rgba(255, 23, 102, 0.05)',
        'studio-xl': '0 20px 25px -5px rgba(0, 102, 204, 0.1), 0 10px 10px -5px rgba(255, 23, 102, 0.04)',
        'pink-glow': '0 0 20px rgba(255, 23, 102, 0.3)',
        'blue-glow': '0 0 20px rgba(0, 102, 204, 0.3)',
      },
      
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}