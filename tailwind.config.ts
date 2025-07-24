import type { Config } from "tailwindcss";

export default {
  content: [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],


  theme: {
    extend: {
      colors: {
        // Matrix color palette
        matrix: {
          black: "#0A0A0A",
          "dark-gray": "#1A1A1A",
          "medium-gray": "#2A2A2A",
          "light-gray": "#F0F0F0",
          "primary-green": "#00FF00",
          "secondary-green": "#00CC00",
          "tertiary-green": "#009900",
          "electric-blue": "#00FFFF",
          "neon-cyan": "#00FFFF"
        },
        background: "var(--background)",
        foreground: "var(--foreground)"
      },
      fontFamily: {
        "mono-matrix": ["VT323", "Fira Code", "monospace"],
        pixel: ["Press Start 2P", "monospace"],
        clean: ["Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        "matrix-rain": "matrix-rain 20s linear infinite",
        glitch: "glitch 0.3s ease-in-out infinite"
      },
      keyframes: {
        "glow-pulse": {
          "0%": {
            textShadow: "0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 15px #00FF00",
            filter: "brightness(1)"
          },
          "100%": {
            textShadow: "0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00",
            filter: "brightness(1.2)"
          }
        },
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
        "neon-green": "0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 15px #00FF00",
        "neon-blue": "0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF",
        "neon-red": "0 0 5px #FF0000, 0 0 10px #FF0000, 0 0 15px #FF0000",
        "pixel-border": "inset 0 0 0 2px #00FF00"
      },
      perspective: {
        "1000": "1000px",
        "1500": "1500px"
      },
      screens: {
        xs: "475px"
      }
    }
  },
  plugins: [
  function ({ addUtilities }) {
    const newUtilities = {
      ".text-glow-green": {
        textShadow: "0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 15px #00FF00"
      },
      ".text-glow-blue": {
        textShadow: "0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF"
      },
      ".pixel-border": {
        border: "2px solid #00FF00",
        borderImage: "linear-gradient(45deg, #00FF00, #00CC00) 1"
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