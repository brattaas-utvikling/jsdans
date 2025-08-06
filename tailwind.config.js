/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./main.tsx", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["Bebas Neue", "Arial Black", "sans-serif"],
        montserrat: ["Montserrat", "system-ui", "sans-serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"], // Default sans font
      },
      fontSize: {
        // Custom sizes for Bebas Neue (tends to need larger sizes)
        "bebas-sm": ["1.5rem", { lineHeight: "1.2", letterSpacing: "0.025em" }],
        "bebas-base": ["2rem", { lineHeight: "1.2", letterSpacing: "0.025em" }],
        "bebas-lg": ["2.5rem", { lineHeight: "1.1", letterSpacing: "0.025em" }],
        "bebas-xl": ["3rem", { lineHeight: "1.1", letterSpacing: "0.025em" }],
        "bebas-2xl": [
          "3.5rem",
          { lineHeight: "1.1", letterSpacing: "0.025em" },
        ],
        "bebas-3xl": ["4rem", { lineHeight: "1.1", letterSpacing: "0.025em" }],
        "bebas-4xl": ["5rem", { lineHeight: "1", letterSpacing: "0.025em" }],
        "bebas-5xl": ["6rem", { lineHeight: "1", letterSpacing: "0.025em" }],
        "bebas-6xl": ["7rem", { lineHeight: "1", letterSpacing: "0.025em" }],
      },
      letterSpacing: {
        bebas: "0.025em",
        "montserrat-tight": "-0.025em",
        "montserrat-normal": "0",
        "montserrat-wide": "0.025em",
      },
      // Urban Studios Modern Energetic Palette - Clean version
      colors: {
        // Brand colors with unique names (not conflicting with tailwind)
        brand: {
          50: "#FFF4E6",
          100: "#FFE4B3",
          200: "#FFD280",
          300: "#FFC04D",
          400: "#FFAE1A",
          500: "#FF8C00", // Main brand orange
          600: "#E67300",
          700: "#CC5A00",
          800: "#B34200",
          900: "#992900",
        },
        magenta: {
          50: "#FFF0F5",
          100: "#FFD1E5",
          200: "#FFB3D6",
          300: "#FF94C6",
          400: "#FF75B7",
          500: "#FF56A7", // Main brand pink
          600: "#E6458F",
          700: "#CC3477",
          800: "#B3235F",
          900: "#991247",
        },
        coral: {
          50: "#FFF2F0",
          100: "#FFDDD6",
          200: "#FFC8BC",
          300: "#FFB3A2",
          400: "#FF9E88",
          500: "#FF896E", // Coral bridge color
          600: "#E67A5E",
          700: "#CC6B4E",
          800: "#B35C3E",
          900: "#994D2E",
        },

        // Keep studio namespace for specific use cases
        studio: {
          orange: {
            50: "#FFF4E6",
            100: "#FFE4B3",
            200: "#FFD280",
            300: "#FFC04D",
            400: "#FFAE1A",
            500: "#FF8C00",
            600: "#E67300",
            700: "#CC5A00",
            800: "#B34200",
            900: "#992900",
          },
          pink: {
            50: "#FFF0F5",
            100: "#FFD1E5",
            200: "#FFB3D6",
            300: "#FF94C6",
            400: "#FF75B7",
            500: "#FF56A7",
            600: "#E6458F",
            700: "#CC3477",
            800: "#B3235F",
            900: "#991247",
          },
        },

        // Semantic colors for different sections
        surface: {
          light: "#FFFFFF",
          muted: "#FFF9F5", // Warm orange-tinted white
          dark: "#0F0A08", // Warm dark
          "dark-muted": "#1A1612", // Warm dark muted
        },

        // Keep existing shadcn colors for components
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },

      // Custom gradients with brand naming
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #FF8C00 0%, #FF56A7 100%)",
        "brand-gradient-95":
          "linear-gradient(135deg, rgba(255, 140, 0, 0.95) 0%, rgba(255, 86, 167, 0.95) 100%)",
        "brand-gradient-reverse":
          "linear-gradient(135deg, #FF56A7 0%, #FF8C00 100%)",
        "hero-gradient":
          "linear-gradient(135deg, #FF8C00 0%, #FF896E 25%, #FF56A7 75%, #D946EF 100%)",
        "energy-gradient": "linear-gradient(135deg, #FF8C00 0%, #D946EF 100%)",
        "sunset-gradient":
          "linear-gradient(135deg, #FF8C00 0%, #FF896E 50%, #FF56A7 100%)",
        "section-gradient-light":
          "linear-gradient(180deg, #FFF9F5 0%, #FFFFFF 100%)",
        "section-gradient-dark":
          "linear-gradient(180deg, #1A1612 0%, #0F0A08 100%)",
      },

      // Custom shadows with brand naming
      boxShadow: {
        "brand-sm": "0 1px 2px 0 rgba(255, 140, 0, 0.08)",
        brand:
          "0 4px 6px -1px rgba(255, 140, 0, 0.12), 0 2px 4px -1px rgba(255, 86, 167, 0.08)",
        "brand-lg":
          "0 10px 15px -3px rgba(255, 140, 0, 0.12), 0 4px 6px -2px rgba(255, 86, 167, 0.08)",
        "brand-xl":
          "0 20px 25px -5px rgba(255, 140, 0, 0.12), 0 10px 10px -5px rgba(255, 86, 167, 0.06)",
        "brand-glow": "0 0 24px rgba(255, 140, 0, 0.4)",
        "pink-glow": "0 0 24px rgba(255, 86, 167, 0.4)",
        "energy-glow":
          "0 0 32px rgba(255, 140, 0, 0.3), 0 0 16px rgba(255, 86, 167, 0.2)",
        // Keep studio shadows for backward compatibility
        "studio-sm": "0 1px 2px 0 rgba(255, 140, 0, 0.08)",
        studio:
          "0 4px 6px -1px rgba(255, 140, 0, 0.12), 0 2px 4px -1px rgba(255, 86, 167, 0.08)",
        "studio-lg":
          "0 10px 15px -3px rgba(255, 140, 0, 0.12), 0 4px 6px -2px rgba(255, 86, 167, 0.08)",
        "studio-xl":
          "0 20px 25px -5px rgba(255, 140, 0, 0.12), 0 10px 10px -5px rgba(255, 86, 167, 0.06)",
        "orange-glow": "0 0 24px rgba(255, 140, 0, 0.4)",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
