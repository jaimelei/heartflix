/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        heartflix: {
          bg: "var(--color-bg)",
          "bg-alt": "var(--color-bg-alt)",
          surface: "var(--color-surface)",
          "surface-hover": "var(--color-surface-hover)",
          "surface-glass": "var(--color-surface-glass)",

          primary: "var(--color-primary)",
          "primary-soft": "var(--color-primary-soft)",
          "primary-deep": "var(--color-primary-deep)",
          "primary-muted": "var(--color-primary-muted)",

          rose: "var(--color-accent-rose)",
          lavender: "var(--color-accent-lavender)",
          mint: "var(--color-accent-mint)",
          peach: "var(--color-accent-peach)",
          lemon: "var(--color-accent-lemon)",
          lilac: "var(--color-accent-lilac)",
          coral: "var(--color-accent-coral)",
          sky: "var(--color-accent-sky)",

          "text-primary": "var(--color-text-primary)",
          "text-secondary": "var(--color-text-secondary)",
          "text-tertiary": "var(--color-text-tertiary)",
          "text-heading": "var(--color-text-heading)",

          border: "var(--color-border)",
          "border-light": "var(--color-border-light)",
          "border-accent": "var(--color-border-accent)",
        },
      },

      fontFamily: {
        display: ['"Gasoek One"', "sans-serif"],
        body: ['"Fredoka"', "sans-serif"],
      },

      fontSize: {
        hero: "clamp(3rem, 6vw, 5rem)",
        "hero-lg": "clamp(4rem, 8vw, 7rem)",
      },

      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },

      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        glow: "var(--shadow-glow)",
        card: "var(--shadow-card)",
      },

      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },

        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        "slide-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },

        "bounce-gentle": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-4px)",
          },
        },

        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-8px)",
          },
        },

        shimmer: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },

        "pulse-slow": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },

        "spin-slow": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },

        "marquee-left": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(-50%)",
          },
        },

        "marquee-right": {
          from: {
            transform: "translateX(-50%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
      },

      animation: {
        "fade-in": "fade-in 500ms ease-out",
        "slide-up": "slide-up 600ms ease-out",
        "slide-down": "slide-down 600ms ease-out",
        "scale-in": "scale-in 400ms ease-out",
        "bounce-gentle": "bounce-gentle 600ms ease-in-out",
        float: "float 3000ms ease-in-out infinite",
        shimmer: "shimmer 1500ms ease-in-out infinite",
        "pulse-slow": "pulse-slow 3000ms ease-in-out infinite",
        "spin-slow": "spin-slow 8000ms linear infinite",
        "marquee-left": "marquee-left 25s linear infinite",
        "marquee-right": "marquee-right 25s linear infinite",
      },
    },
  },
  plugins: [],
};