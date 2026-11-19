import type { Config } from "tailwindcss";

export default {
  content: [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],


  theme: {
    extend: {
      colors: {
        // Matrix phosphor palette, scoped to the Matrix experience.
        matrix: {
          black: "rgb(var(--matrix-screen) / <alpha-value>)",
          "dark-gray": "rgb(var(--matrix-surface) / <alpha-value>)",
          "light-gray": "rgb(var(--matrix-text) / <alpha-value>)",
          accent: "rgb(var(--matrix-accent) / <alpha-value>)",
          highlight: "rgb(var(--matrix-highlight) / <alpha-value>)",
          dim: "rgb(var(--matrix-dim) / <alpha-value>)",
        },
        // Standard site palette (values live in globals.css, with a dark variant)
        mist: "rgb(var(--mist) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        pine: "rgb(var(--pine) / <alpha-value>)",
        lichen: "rgb(var(--lichen) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        signal: "rgb(var(--signal) / <alpha-value>)",
        "on-pine": "rgb(var(--on-pine) / <alpha-value>)"
      },
      fontFamily: {
        "mono-matrix": ["var(--font-vt323)", "monospace"],
        sans: ["var(--font-bricolage)", "system-ui", "sans-serif"]
      },
      animation: {
        "matrix-rain": "matrix-rain 20s linear infinite",
        glitch: "glitch 0.3s ease-in-out infinite"
      },
      keyframes: {
        "matrix-rain": {
          "0%": { transform: "translateY(-100vh)" },
          "100%": { transform: "translateY(100vh)" }
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" }
        }
      },
      backdropBlur: {
        matrix: "8px"
      },
      boxShadow: {
        phosphor: "0 0 12px rgb(var(--matrix-accent) / 0.14)",
      },
      perspective: {
        "1000": "1000px",
        "1500": "1500px"
      },
      maxWidth: {
        prose: "62ch"
      },
      screens: {
        xs: "475px"
      }
    }
  },
  plugins: [
  function ({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string | Record<string, string>>>) => void }) {
    const newUtilities = {
      ".text-phosphor-glow": {
        textShadow: "0 0 8px rgb(var(--matrix-accent) / 0.24)",
      },
      ".glitch-effect": {
        position: "relative",
        "&::before, &::after": {
          content: "attr(data-text)",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%"
        },
        "&::before": {
          animation: "glitch 0.3s ease-in-out infinite",
          color: "#FF0000",
          zIndex: "-1"
        },
        "&::after": {
          animation: "glitch 0.3s ease-in-out infinite reverse",
          color: "#00FFFF",
          zIndex: "-2"
        }
      },
      ".preserve-3d": {
        transformStyle: "preserve-3d"
      },
      ".perspective-1000": {
        perspective: "1000px"
      },
      ".backface-hidden": {
        backfaceVisibility: "hidden"
      }
    };
    addUtilities(newUtilities);
  }]

} satisfies Config;